var encryption = require('../utilities/encryption'),
    users = require('../data/users'),
    User = require('mongoose').model('User');

var CONTROLLER_NAME = 'users';

module.exports = {
    getRegister: function(req, res, next) {
        res.render(CONTROLLER_NAME + '/register')
    },
    postRegister: function(req, res, next) {
        var newUserData = req.body;

        if (newUserData.password != newUserData.confirmPassword) {
            req.session.error = 'Passwords do not match!';
            res.redirect('/register');
        }
        else {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            users.create(newUserData, function(err, user) {
                if (err) {
                    console.log('Failed to register new user: ' + err);
                    return;
                }

                req.logIn(user, function(err) {
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
    getLogin: function(req, res, next) {
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

                     res.render(CONTROLLER_NAME +  '/all-users', {users: result, currentUser: req.user});
                }
            });
    }
};