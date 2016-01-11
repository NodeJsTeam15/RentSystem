(function () {
    'use strict';

    function BooksCreateController($location, productsService) {
        var vm = this;

        vm.createBook = function (newBook) {
            booksService.createProduct(newBook)
                .then(function (result) {
                    window.location.href = '/';
                })
        }
    }

    angular.module('myApp.controllers')
        .controller('BooksCreateController', ['$location', 'booksService', BooksCreateController]);
}());