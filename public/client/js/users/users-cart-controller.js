(function () {
    'use strict';

    function CartController(cartService) {
        var vm = this;
        var currentPath = window.location.search;
        var itemId = currentPath.substring(currentPath.lastIndexOf('=') + 1);
        console.log(itemId);

        vm.addToCart = function () {
            var vm = this;
            var itemToAdd = {
                itemId: itemId
            };
            console.log(itemToAdd);
            cartService.addToCart(itemToAdd)
                .then(function (result) {
                    console.log('added to cart!');
                    window.location.href='/cart';
                }, function (err) {
                    console.log(err);
                })
        };
        vm.removeFromCart = function () {
            var vm = this;
            var itemToRemove = {
                itemId: itemId
            };
            console.log(itemToRemove);
            cartService.removeFromCart(itemToRemove)
                .then(function (result) {
                    console.log('removed from cart!');
                    window.location.href='/cart';
                }, function (err) {
                    console.log(err);
                })
        };
    }

    angular.module('myApp.controllers')
        .controller('CartController', ['cartService', CartController]);
}());