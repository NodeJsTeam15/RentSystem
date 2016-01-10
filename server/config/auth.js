var passport = require('passport');


module.exports = {
    login: function(req, res, next) {
        var auth = passport.authenticate('local', function(err, user) {
            if (err) return next(err);
            if (!user) {
                res.send({success: false}); // TODO:
            }
            if(user.username === 'pesho' && user.roles.length == 0){
               user.roles.push('admin');
               user.save(function (err, updatedUser, numberAffected) {
                    if (err) {
                        res.status(400).send('Error updating user: ' + err);
                        return;
                    }

                    // res.status(200).send('User updated successfully!');
               });
            }

            req.logIn(user, function(err) {
                if (err) return next(err);
                res.redirect('/');
            })
        });

        auth(req, res, next);
    },
    logout: function(req, res, next) {
        req.logout();
        res.redirect('/');
    },
    isAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        }
        else {
            next();
        }
    },
    isInRole: function (role) {
        return function (req, res, next) {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) >= 0) {
                next();
            }
            else {
                res.status(401);
                res.send("Not authorized for this content");
            }
        };
    },
    isAdminOrCurrentUser: function(req, res, next){
        var currentUser,
            queryString;

        if(req.isAuthenticated()) {
            currentUser = req.user._id.toString();
            queryString = req.params.id.toString();
        }

        if ((req.isAuthenticated() && currentUser.localeCompare(queryString) === 0) || (req.user != undefined && req.user.roles.indexOf('admin') >= 0)) {
            next();
        }
        else {
            res.send({success: false}); // TODO:
            // res.redirect('/login');
        }
    }
};