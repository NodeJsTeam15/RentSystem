(function () {
    'use strict';

    function BooksController(books) {
        var vm = this;

        vm.createBook = function (newBook) {
            books.createBook(newBook)
                .then(function (result) {
                    window.location.href = '/';
                })
        }
    }

    angular.module('myApp.controllers')
        .controller('BooksController', ['books', BooksController])
}())