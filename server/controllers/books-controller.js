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

         books.create(newBookData, function(err, user) {
             if (err) {
                 console.log('Failed to create a new book: ' + err);
                 return;
             }

             // req.logIn(user, function(err) {
             //     if (err) {
             //         res.status(400);
             //         return res.send({reason: err.toString()}); // TODO
             //     }
             //     else {
             //         res.redirect('/');
             //     }
             // })
         });

         res.redirect('/');
    },
    getBooks: function (req, res, next) {
        var customQuery = req.query.userId ? {user: req.query.userId} : {};

        if (req.query.category) {
            customQuery['category'] = req.query.category;
        }

        var page = req.query.page ? req.query.page : 1;
        var limit = req.query.pageSize ? req.query.pageSize : 10;


        var sortByProperty = req.query.sortBy ? req.query.sortBy: 'price';

        var sortDir = req.query.type === 'asc' ? 1 : -1;
        //Book.paginate(customQuery, {page: page, limit: limit, sort: sortBy}, function (err, result) {
        //    if (err) {
        //        console.log('Books could not be loaded: ' + err);
        //    }
        //
        //    res.render('books/books', {currentUser: req.user, books: result.docs});
        //});

        var sortObject = {};
        var stype = sortByProperty;
        var sdir = sortDir;
        sortObject[stype] = sdir;
        Book
            .find({}).sort(sortObject).skip(+limit * (page - 1)).limit(+limit)
            .exec(function (err, books) {
                if (err) {
                    console.log('Get all books failed: ' + err);
                    return;
                }

                res.render('books/books', {books: books, currentUser: req.user});
            });

        // Book.find({}, function(err, books) {
        //     res.render('books/books', {currentUser: req.user, books: books});
        // });
    },
    getLatestBooks: function (req, res, next) {
        //Book.paginate({}, {page: 1, limit: 10}, function (err, result) {
        //    if (err) {
        //        console.log('Books could not be loaded: ' + err);
        //    }
        //
        //    res.render('index', {currentUser: req.user, books: result.docs.reverse()});
        //})
        Book.find({}, function(err, books) {
            // console.log(books);
            res.render('index', {currentUser: req.user, books: books});
        });
    },
    getById: function (req, res, next) {
        Book
            .findOne({_id: req.params.id})
            .exec(function (err, book) {
                if (err) {
                    res.status(400).send('Book could not be found: ' + err);
                    console.log('Book could not be found: ' + err);
                    return;
                }

                res.render(CONTROLLER_NAME + '/details', {book: book, currentUser: req.user});
            });
    }
};
