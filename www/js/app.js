// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'mobileServices', 'azure-mobile-service.module' ])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .directive('myMaxlength', function() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                var maxlength = Number(attrs.myMaxlength);
                function fromUser(text) {
                    if (text.length > maxlength) {
                        var transformedInput = text.substring(0, maxlength);
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                        return transformedInput;
                    }
                    return text;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })

    .config(['$httpProvider', function ($httpProvider) { // configuring the httpProvider
        $httpProvider.defaults.headers.common['X-ZUMO-APPLICATION'] = 'RkahlgSDnwpkXUfLBfySnWDcRDZICp27'; // add the application key
        $httpProvider.defaults.headers.common['Content-Type'] = 'Application/json';
    }])

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.search', {
                url: "/search",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/search.html"
                    }
                }
            })

            .state('app.browse', {
                url: "/browse",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/browse.html"
                    }
                }
            })
            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/playlists.html",
                        controller: 'BtMaintenanceCtrl'
                    }
                }
            })

            .state('app.servicealerts', {
                url: "/servicealerts",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/servicealerts.html",
                        controller: 'AlertsCtrl'
                    }
                }
            })

            .state('app.feedback', {
                url: "/feedback",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/feedback.html",
                        controller: 'FeedbackCtrl'
                    }
                }
            })

            .state('app.single', {
                url: "/playlists/:playlistId",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/playlist.html",
                        controller: 'PlaylistCtrl'
                    }
                }
            })

            .state('app.singlealert', {
                url: "/servicealerts/:taskId",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/servicealert.html",
                        controller: 'AlertCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/playlists');
    });

