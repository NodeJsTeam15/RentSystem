var Book = require('mongoose').model('Book');

module.exports = {
    create: function(book, callback) {
        Book.create(book, callback);
    }
};