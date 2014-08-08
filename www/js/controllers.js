angular.module('starter.controllers', [])

    .run(function($rootScope, Task) {
        $rootScope.tasks = Task.query();
    })

    .controller('AppCtrl', function($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('PlaylistsCtrl', function($scope) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
    })

    .controller('PlaylistCtrl', function($scope, $stateParams) {
    })

    .controller('AlertsCtrl', function($scope, $rootScope, $ionicModal, Task) {
        $scope.tasks = Task.query(); // load all tasks
        $rootScope.tasks = $scope.tasks; // pipe the tasks into rootScope
        $scope.newTask = new Task(); // create an empty new task
        $scope.predicate = 'createdAt'; //Set the order by field

        // Modal popup for the crud, uses same scope
        $ionicModal.fromTemplateUrl('templates/crud.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Close modal
        $scope.closeForm = function() {
            $scope.modal.hide();
        };

        // Open modal
        $scope.openForm = function() {
            $scope.modal.show();
        };
        // saving a new task
        $scope.createTask = function () {
            // call the service
            $scope.newTask.$save(function () {
                // when saved, reload the list and recreate a new task
                $scope.tasks = Task.query();
                $scope.newTask = new Task();
                //TODO: Close modal popup
            });
            $scope.closeForm();
        };

        // removing a task
        $scope.deleteTask = function (task) {
            // call the service
            task.$delete(function () {
                // when deleted, reload the list
                $scope.tasks = Task.query();
            });
        };

        // saving an existing task
        $scope.updateTask = function (task) {
            // call the service
            task.$update();
        }

    })

    .controller('AlertCtrl', function($scope, $stateParams, $rootScope, Task){
        $rootScope.tasks.forEach(function (task) {
            if (task.id != $stateParams.taskId) {
            } else {
                $scope.task = task;
            }
        })
    })

    .controller('AlertstCtrl', function($scope, $stateParams, Task) {
    })

// Sessions controler gets list of sessions for a day
    .controller('BtMaintenanceCtrl', function ($scope, $stateParams, Sessions, Favs) {


            Sessions.schedule().then(function (maintenance) {
                $scope.maintenance = maintenance;
            })

            $scope.timestamp = localStorage["timestamp"];
    })

    .controller('FeedbackCtrl', function($scope, $stateParams, $ionicModal, Azureservice) {

        /*var feedback;
        $scope.feedback =  {
            description: "",
            typeid: ""
        };*/

        Azureservice.query('Feedback', {})
            .then(function(feedback){
                //Assign the results to a $scope variable
                $scope.feedback = feedback;

            }, function(err){
                console.error('There was an error quering Azure ' + err);
            })



        // Modal popup for the crud, uses same scope
        $ionicModal.fromTemplateUrl('templates/feedbackpopup.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Close modal
        $scope.closeForm = function() {
            $scope.modal.hide();
        };

        // Open modal
        $scope.openForm = function() {
            $scope.modal.show();
        };

        $scope.submit = function () {

            Azureservice.insert('Feedback', {
                description: $scope.feedback.description,
                typeid: $scope.feedback.typeid,
                userid: "12345"
            })
                .then(function(){
                    console.log('Insert successful');
                }, function(err){
                    console.error('Azure Error: ' + err);
                })
            $scope.closeForm();
            console.log($scope.feedback.description);
            console.log("Description above");
        }


    });
