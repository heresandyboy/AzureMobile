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

    .directive('maxlength', function() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                var maxlength = Number(attrs.andyMaxlength);
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

    // HTTP Provider config for Azure Mobile Service when accessed via ngResource
    // See mobile-service.js
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
            .state('app.maintenance', {
                url: "/maintenance",
                views: {
                    'menuContent' :{
                        templateUrl: "../templates/maintenance.html",
                        controller: 'MaintenanceCtrl'
                    }
                }
            })

            .state('app.azure-crud-sample', {
                url: "/azure-crud-sample",
                views: {
                    'menuContent' :{
                        templateUrl: "../templates/azure-crud-sample.html",
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
                url: "/maintenance/:maintenanceId",
                views: {
                    'menuContent' :{
                        templateUrl: "../templates/maintenanceitem.html",
                        controller: 'FeedbackCtrl'
                    }
                }
            })

            .state('app.singlealert', {
                url: "/azure-crud-sample/:taskId",
                views: {
                    'menuContent' :{
                        templateUrl: "../templates/azure-crud-sample-item.html",
                        controller: 'AlertCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/maintenance');
    });

