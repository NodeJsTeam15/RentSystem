(function () {
    'use strict';

    //function config($routeProvider) {

        //var PARTIALS_PREFIX = 'views/partials/';
        //var CONTROLLER_AS_VIEW_MODEL = 'vm';
        //
        //var routeResolvers = {
        //    authenticationRequired: {
        //        authenticate: ['$q', 'auth', function ($q, auth) {
        //            if (auth.isAuthenticated()) {
        //                return true;
        //            }
        //
        //            return $q.reject('not authorized');
        //        }]
        //    }
        //}

    angular.module('myApp.services', []);
    angular.module('myApp.controllers', []);
    angular.module('myApp', ['ngRoute', 'ngCookies', 'myApp.services', 'myApp.controllers'])
        .constant('baseServiceUrl', 'http://localhost:3000/');
}());