(function () {
    'use strict';

    //function config($routeProvider) {
    //
    //    var PARTIALS_PREFIX = 'views/partials/';
    //    var CONTROLLER_AS_VIEW_MODEL = 'vm';
    //
    //    var routeResolvers = {
    //        authenticationRequired: {
    //            authenticate: ['$q', 'auth', function ($q, auth) {
    //                if (auth.isAuthenticated()) {
    //                    return true;
    //                }
    //
    //                return $q.reject('not authorized');
    //            }]
    //        }
    //    }


    // function run($http, $cookies, $rootScope, $location, auth) {
    //     $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
    //         if (rejection === 'not authorized') {
    //             $location.path('/');
    //         }
    //     });
    // };

    angular.module('myApp.services', []);
    angular.module('myApp.controllers', ['myApp.services']);
    angular.module('myApp', ['ngRoute', 'ngCookies', 'myApp.controllers'])
        // config(['$routeProvider', config])
        // .run(['$http', '$cookies', '$rootScope', '$location', 'auth', run]).
        .constant('baseServiceUrl', 'http://localhost:3000/');
    // http://localhost:42252/
}());