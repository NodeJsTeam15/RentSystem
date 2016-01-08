var encryption = require('../utilities/encryption');
var users = require('../data/users');

var CONTROLLER_NAME = 'books';

module.exports = {
    getBook: function(req, res, next) {
        res.render(CONTROLLER_NAME + '/addbook')
    },
    postBook: function(req, res, next) {
        res.render(CONTROLLER_NAME + '/addbook')
    }
}
