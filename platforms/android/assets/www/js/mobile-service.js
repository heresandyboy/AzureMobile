// mobile-service.js
'use strict';

angular.module('mobileServices', ['ngResource']). // new service mobileServices depending on ngResource
    factory('Task', function ($resource) { // declaring a MyTable resource
        return $resource('https://andyainsworth.azure-mobile.net/tables/task/:id?__systemProperties=*', { id: '@id' }, // binding to the table url
            {
                'update': { method: 'PUT' } // adding an update function
    }
        );
    });