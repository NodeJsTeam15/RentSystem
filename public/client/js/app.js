(function () {
    'use strict';

    function config($routeProvider) {

        var PARTIALS_PREFIX = 'views/partials/';
        var CONTROLLER_AS_VIEW_MODEL = 'vm';

        var routeResolvers = {
            authenticationRequired: {
                authenticate: ['$q', 'auth', function ($q, auth) {
                    if (auth.isAuthenticated()) {
                        return true;
                    }

                    return $q.reject('not authorized');
                }]
            }
        }

        //$routeProvider
        //    .when('/', {
        //        templateUrl: PARTIALS_PREFIX + 'home/home.html',
        //        controller: 'HomeController',
        //        controllerAs: CONTROLLER_AS_VIEW_MODEL
        //    })
        //    .when('/unauthorized', {
        //        template: '<h1 class="text-center">YOU ARE NOT AUTHORIZED</h1>'
        //    })
        //    .when('/register', {
        //        templateUrl: PARTIALS_PREFIX + 'identity/register.html',
        //        controller: 'SignUpCtrl'
        //    })
        //    .when('/projects', {
        //        templateUrl: PARTIALS_PREFIX + 'projects/all-projects.html',
        //        controller: 'ProjectsController',
        //        controllerAs: CONTROLLER_AS_VIEW_MODEL
        //    })
        //    .when('/projects/add', {
        //        templateUrl: PARTIALS_PREFIX + 'projects/add-project.html',
        //        controller: 'AddProjectController',
        //        controllerAs: CONTROLLER_AS_VIEW_MODEL,
        //        resolve: routeResolvers.authenticationRequired
        //    })
        //    .when('/projects/:id', {
        //        templateUrl: PARTIALS_PREFIX + 'projects/project-details.html',
        //        controller: 'ProjectDetailsController',
        //        controllerAs: CONTROLLER_AS_VIEW_MODEL
        //    })
        //     .when('/projects/:id/addcommits', {
        //         templateUrl: PARTIALS_PREFIX + 'commits/add-commit.html',
        //         controller: 'AddCommitController',
        //         controllerAs: CONTROLLER_AS_VIEW_MODEL,
        //         resolve: routeResolvers.authenticationRequired
        //     })
        //    .otherwise({ redirectTo: '/' });
        }

    // function run($http, $cookies, $rootScope, $location, auth) {
    //     $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
    //         if (rejection === 'not authorized') {
    //             $location.path('/');
    //         }
    //     });
    // };

    angular.module('myApp.services', []);
    angular.module('myApp.controllers', ['myApp.services']);
    angular.module('myApp', ['ngRoute', 'ngCookies', 'myApp.controllers']).
        // config(['$routeProvider', config])
        // .run(['$http', '$cookies', '$rootScope', '$location', 'auth', run]).
        constant('baseServiceUrl', 'http://localhost:3000/');
    // http://localhost:42252/
}());