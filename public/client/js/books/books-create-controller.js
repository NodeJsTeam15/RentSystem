(function () {
    'use strict';

    function BooksCreateController(booksService) {
        var vm = this;

        vm.createBook = function (newBook) {
            console.log(newBook);
            console.log(123123123);
            booksService.createBook(newBook)
                .then(function (result) {
                    window.location.href = '/';
                })
        }
    }

    angular.module('myApp.controllers')
        .controller('BooksCreateController', ['booksService', BooksCreateController]);
}());