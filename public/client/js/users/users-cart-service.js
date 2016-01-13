(function () {
    'use strict';

    function cartService(data) {

        function addToCart(productId) {
            return data.post('/cart/add', productId);
        }

        function removeFromCart(productId) {
            return data.post('/cart/remove', productId);
        }

        return {
            addToCart: addToCart,
            removeFromCart:removeFromCart
        }
    }

    angular.module('myApp.services')
        .factory('cartService', ['data', cartService])
}());