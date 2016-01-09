(function () {
    'use strict';

    function books(data){
        var BOOKS_URL = 'books';

        function getBooks() {
            return data.get(BOOKS_URL);
        }

        function filterBooks(filters) {
            return data.get(BOOKS_URL, filters);
        }

        function createBook(book) {
            return data.post(BOOKS_URL+'/add', book);
        }

        return {
            getBooks : getBooks,
            filterBooks : filterBooks,
            createBook : createBook
        }
    }

    angular.module('myApp.services')
       .factory('books', ['data', books]);
}())