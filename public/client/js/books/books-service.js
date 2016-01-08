(function () {
    'use strict';

    function books(data){
        var PROJECTS_URL = 'api/projects';

        function getBooks() {
            return data.get(PROJECTS_URL);
        }

        return {
            getProjects: getProjects
        }
    }

    angular.module('myApp.services')
       .factory('books', ['data', books]);

}())