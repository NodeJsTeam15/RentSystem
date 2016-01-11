var books = require('../data/books'),
    Book = require('mongoose').model('Book'),
    User = require('mongoose').model('User'),
    mongoosePaginate = require('mongoose-paginate');

var CONTROLLER_NAME = 'books';

module.exports = {
    getAdd: function(req, res, next) {
        res.render(CONTROLLER_NAME + '/addbook', {currentUser: req.user})
    },
    createBook: function(req, res, next) {
         var newBookData = req.body;
         newBookData.user = req.user;
         console.log(newBookData);
         books.create(newBookData, function(err, user) {
             if (err) {
                 console.log('Failed to create a new book: ' + err);
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
    },
    getBooks: function (req, res, next) {
        var customQuery = req.query.userId ? {user: req.query.userId} : {};

        if (req.query.category) {
            customQuery['category'] = req.query.category;
        }

        var page = req.query.page ? req.query.page : 1;
        var limit = req.query.pageSize ? req.query.pageSize : 10;
        var sortBy = {};
        var type = req.query.type;

        if (req.query.sortBy) {
            sortBy[req.query.sortBy] = type;
        }

        console.log("123123");
        console.log(customQuery);
        //Book.paginate(customQuery, {page: page, limit: limit, sort: sortBy}, function (err, result) {
        //    if (err) {
        //        console.log('Books could not be loaded: ' + err);
        //    }
        //
        //    res.render('books/books', {currentUser: req.user, books: result.docs});
        //})

        Book.find({}, function(err, books) {
            res.render('books/books', {currentUser: req.user, books: books});
        });
    },
    getLatestBooks: function (req, res, next) {
        Book.paginate({}, {page: 1, limit: 10}, function (err, result) {
            if (err) {
                console.log('Books could not be loaded: ' + err);
            }

            res.render('index', {currentUser: req.user, collection: result.docs.reverse()});
        })
    }
}
