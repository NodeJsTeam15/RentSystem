(function () {
    'use strict';

    function booksService(data) {
        var BOOKS_URL = 'admin';

        function createBook(book) {
            return data.post(BOOKS_URL + '/books/add', book);
        }

        return {
            createBook: createBook
        }
    }

    angular.module('myApp.services')
        .factory('booksService', ['data', booksService])
}());