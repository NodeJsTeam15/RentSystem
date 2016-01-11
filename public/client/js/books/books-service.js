(function () {
    'use strict';

    function booksService(data) {

        function createBook(book) {
            console.log(book);
            return data.post('/books/add', book);
        }

        return {
            createBook: createBook
        }
    }

    angular.module('myApp.services')
        .factory('booksService', ['data', booksService])
}());