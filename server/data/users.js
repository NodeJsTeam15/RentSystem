var User = require('mongoose').model('User');

module.exports = {
    create: function(user, callback) {
        User.create(user, callback);
    },
    updateUser: function (query, user, callback) {
        User.update(query, user, callback);
    }
};