// mobile-service.js
'use strict';

angular.module('mobileServices', ['ngResource']) // new service mobileServices depending on ngResource
    .factory('Task', function ($resource) { // declaring a MyTable resource
        return $resource('https://andyainsworth.azure-mobile.net/tables/task/:id?__systemProperties=*', { id: '@id' }, // binding to the table url
            {
                'update': { method: 'PUT' } // adding an update function
    }
        );
    })

    .factory('Sessions', function ($http, $q) {

        return {

            // The job of the factory is to get us the schedule
            schedule: function () {

                var isOffline = 'onLine' in navigator && !navigator.onLine,
                    cached = localStorage["sessions"],
                    timestamp = localStorage["timestamp"],
                    duration = 60 * 60 * 1000,
                    deferred = $q.defer();

                if (isOffline) {

                    //Offline and no cached data - return empty object
                    if (!cached) {
                        console.log('OFFline, no cache...');
                        deferred.reject();

                        //Offline but with cached data - return it
                    } else {
                        console.log('OFFline, cached data...');
                        deferred.resolve(angular.fromJson(cached));
                    }

                } else {

                    //Online, with cached data or expired cache
                    if (cached && timestamp && timestamp > new Date().getTime() - duration) {
                        console.log('ONline, cached data...');
                        deferred.resolve(angular.fromJson(cached));

                        // Online, with no or expired data
                    } else {
                        console.log('<<<<< ONLINE, from RSS >>>>>');
                        var data = $http
                            .jsonp('https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://status.zen.co.uk/rss/broadband-maintenance-rss.ashx&callback=JSON_CALLBACK')
                            .then(function (response) {
                                localStorage["sessions"] = angular.toJson(response.data);
                                localStorage["timestamp"] = new Date().getTime();
                                deferred.resolve(response.data);

                                // Mock a server delay
                                /*setTimeout(function() {
                                 return deferred.resolve(response.data);
                                 }, 3000);*/
                            });
                    }
                }
                return deferred.promise;
            }
        }

    })
    .factory('Favs', function () {

        // This factory gets and sets the favourites
        return {

            get: function () {
                // Create an artificial 'day' to display favourites
                return {
                    id: 0,
                    name: 'My favourites',
                    sessions: angular.fromJson(localStorage["favs"]) || []
                };
            },

            // Save favourites in local storate
            save: function (favs) {
                localStorage["favs"] = angular.toJson(favs);
                return true;
            }

        }

    });
