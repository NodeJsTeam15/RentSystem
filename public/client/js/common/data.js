(function () {
    'use strict';
    
    function data($http, $q, baseServiceUrl) {

        function get(url, queryParams) {
            var defered = $q.defer();


            $http.get(baseServiceUrl + '/' + url, { params: queryParams })
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    error = getErrorMessage(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function post(url, postData) {
            var defered = $q.defer();

            $http.post(baseServiceUrl + '/' + url, postData)
                .then(function (response) {
                    console.log(response);
                    defered.resolve(response.data);
                }, function (error) {
                    error = getErrorMessage(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function put (){
            throw new Error('Not implemented');
        }

        function getErrorMessage(response) {
            var error = response.data.modelState;
            if (error && error[Object.keys(error)[0]][0]) {
                error = error[Object.keys(error)[0]][0];
            }
            else {
                error = response.data.message;
            }

            return error;    
        }

        return {
            get: get,
            post: post,
            put: put
        }
    }

    angular.module('myApp.services')
        .factory('data', ['$http', '$q', 'baseServiceUrl', data])
}());