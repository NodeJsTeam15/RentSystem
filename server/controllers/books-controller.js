var encryption = require('../utilities/encryption');
var books = require('../data/books');

var CONTROLLER_NAME = 'books';

module.exports = {
    getBook: function(req, res, next) {
        res.render(CONTROLLER_NAME + '/addbook', {currentUser: req.user})
    },
    postBook: function(req, res, next) {
         var newBookData = req.body;
         newBookData.user = req.user;

         books.create(newBookData, function(err, user) {
             if (err) {
                 console.log('Failed to create new book: ' + err);
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
}
