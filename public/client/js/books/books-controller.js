(function () {
    'use strict';

    function BooksController(books, identity) {
        var vm = this;
        vm.identity = identity;

        books.getBooks()
            .then(function (publicBooks) {
                vm.projects = publicBooks;
            });
    }

    angular.module('myApp.controllers')
        .controller('BooksController', ['books', 'identity', BooksController])
}())