var encryption = require('../utilities/encryption'),
    users = require('../data/users'),
    books = require('../data/books'),
    User = require('mongoose').model('User');

var CONTROLLER_NAME = 'users';

module.exports = {
    getRegister: function (req, res, next) {
        res.render(CONTROLLER_NAME + '/register')
    },
    postRegister: function (req, res, next) {
        var newUserData = req.body;

        if (!newUserData.password) {
            req.session.error = 'Password is required';
            res.redirect('/register');
            return;
        }

        if (newUserData.password.indexOf(' ') > -1) {
            req.session.error = 'Password cannot contain empty space.';
            res.redirect('/register');
            return;
        }

        if (newUserData.password != newUserData.confirmPassword) {
            req.session.error = 'Passwords do not match!';
            res.redirect('/register');
        }
        else {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            users.create(newUserData, function (err, user) {
                if (err) {
                    req.session.error = 'Failed to register the user. ' + err.errors.username.message;
                    console.dir('Failed to register new user: ' + err);
                    res.redirect('/register');
                    return;
                }

                req.logIn(user, function (err) {
                    if (err) {
                        res.status(400);
                        return res.send({reason: err.toString()}); // TODO
                    }
                    else {
                        res.redirect('/');
                    }
                })
            });
        }
    },
    getLogin: function (req, res, next) {
        res.render(CONTROLLER_NAME + '/login');
    },
    getAllUsers: function (req, res, next) {

        // var page = Math.max(req.query.page, 1);
        // var orderType = req.query.orderType === 'desc' ? '-' : '';
        // var username = req.query.username || '';
        // var firstName = req.query.firstName || '';
        // var lastName = req.query.lastName || '';


        User.find({})
            // .where({ username: new RegExp(username, "i") })
            // .where({ firstName: new RegExp(firstName, "i") })
            // .where({ lastName: new RegExp(lastName, "i") })
            // .skip(DEFAULT_PAGE_SIZE * (page - 1))
            // .limit(DEFAULT_PAGE_SIZE)
            // .sort(orderType + 'rank')
            .select('_id username firstName lastName roles')//city phone roles items
            .exec(function (error, result) {
                if (error) {
                    res.status(400);
                    res.send(error);
                } else {
                    console.log(result);

                    res.render(CONTROLLER_NAME + '/all-users', {users: result, currentUser: req.user});
                }
            });
    },
    getById: function (req, res, next) {
        User
            .findOne({_id: req.params.id})
            .select('_id username firstName lastName roles')
            .exec(function (err, result) {
                if (err) {
                    res.status(400).send('User could not be found: ' + err);
                    console.log('User could not be found: ' + err);
                    return;
                }

                if(result.roles.indexOf('admin') > -1){
                    result.isAdmin = 'yes';
                }else
                {
                    result.isAdmin = 'no'
                }

                // res.status(200);
                // res.send(result);
                res.render(CONTROLLER_NAME + '/detailed-user', {viewedUser: result, currentUser: req.user});
            });
    },
    getCart: function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        } else {
            User.findById({_id: req.user._id})
                .populate('cart')
                .exec(function (err, user) {
                    if (err) {
                        console.log('Users could not be loaded: ' + err);
                    }
                    var cart = user.cart,
                        sum = 0,
                        i;
                    for (i = 0; i < cart.length; i += 1) {
                        sum += cart[i].price;
                    }
                    cart['total'] = sum;
                    res.render('cart/cart', {currentUser: req.user, cart: cart});
                });
        }
    },
    getAddCartConfirmation: function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        } else {
            var book = req.query.itemId ? {id: req.query.itemId} : {};
            books.getBookById(book.id, function (err, book) {
                if (err) {
                    console.log('Book could not be loaded: ' + err);
                }
                var books = [book];
                res.render('cart/addToCart', {currentUser: req.user, books: books});
            });
        }
    },
    addItemToCart: function (req, res, next) {
        var newProductData = req.body;
        console.log("in addItemToCart");
        console.log(newProductData);
        newProductData.user = req.user._id;
        users.updateUser({_id: req.user._id}, {$push: {"cart": newProductData.itemId}}, function (err, user) {
            if (err) {
                console.log("ERROR", err);
                req.session.error = 'Unable to add to cart';
            }
            console.log('Updated!!!', user);
            res.redirect('/cart');
        });
    },
    removeItemFromCart: function (req, res, next) {
        var newBookData = req.body;
        newBookData.user = req.user._id;
        users.updateUser({_id: req.user._id}, {$pop: {"cart": newBookData.itemId}}, function (err, user) {
            if (err) {
                console.log("ERROR", err);
                req.session.error = 'Unable to remove book';
            }
            console.log('Updated!!!', user);
            res.redirect('/cart');
        });
    },
    getRemoveFromCartConfirmation: function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        } else {
            var book = req.query.itemId ? { id: req.query.itemId } : {};
            books.getBookById(book.id, function (err, book) {
                if (err) {
                    console.log('Book could not be loaded: ' + err);
                }
                res.render('cart/bookDetails', { currentUser: req.user, book: book, inCart: true });
            });
        }
    },
    getCheckout: function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        } else {
            console.log(req.user.products);
            User.findById({_id: req.user._id})
                .populate('products')
                .exec(function (err, user) {
                    if (err) {
                        console.log('Users could not be loaded: ' + err);
                    }

                    res.render('cart/cart', {currentUser: req.user, cart: user.products});
                });
        }
    },
    getEditUser: function (req, res, next) {
        User
            .findOne({_id: req.params.id})
            .select('_id username firstName lastName roles')
            .exec(function (err, result) {
                if (err) {
                    res.status(400).send('User could not be found: ' + err);
                    console.log('User could not be found: ' + err);
                    return;
                }

                if(result.roles.indexOf('admin') > -1){
                    result.isAdmin = 'yes';
                }

                res.render(CONTROLLER_NAME + '/detailed-user-for-edit', {viewedUser: result, currentUser: req.user});
            });
    },
    postEditUser: function(req, res, next) {

        var updatedUserData = {}
             updatedUserData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                isAdmin: req.body.isAdmin
            };

        var value = updatedUserData.isAdmin == "send" ? "admin" : "";


        if(value==="admin"){
            users.updateUser({_id: req.params.id},  {firstName: updatedUserData.firstName, lastName: updatedUserData.lastName, $push: {roles: value}}, function (err, user) {
                if (err) {
                    console.log("ERROR", err);
                    req.session.error = 'Unable to remove book';
                }

                res.redirect('/users/' + req.params.id)
            });
        } else {
            users.updateUser({_id: req.params.id},  {firstName: updatedUserData.firstName, lastName: updatedUserData.lastName, $pop: {roles: "admin"}}, function (err, user) {
                if (err) {
                    console.log("ERROR", err);
                    req.session.error = 'Unable to remove book';
                }

                res.redirect('/users/' + req.params.id)
            });
        }





            // User.findById(req.params.id, function(err, user) {
            //     if (!user)
            //         return next(new Error('Could not load Document'));
            //     else {
            //
            //
            //
            //         console.log('here' + updatedUserData.isAdmin);
            //         console.log('here' + updatedUserData.firstName);
            //
            //         if(updatedUserData.isAdmin == "true"){
            //             user.roles.push('admin');
            //         }
            //         if(updatedUserData.isAdmin=="false") {
            //             user.roles = [];
            //         }
            //
            //
            //
            //
            //
            //         user.firstName = updatedUserData.firstName;
            //         user.lastName = updatedUserData.lastName;
            //
            //         console.log(user);
            //
            //         user.save(function(err) {
            //             res.redirect('/users/' + req.params.id)
            //         });
            //     }
            // });
        }

};