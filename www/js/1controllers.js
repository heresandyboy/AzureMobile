// controller.js

function MyCtrl($scope, Task) {
    $scope.tasks = Task.query(); // load all tasks
    $scope.newTask = new Task(); // create an empty new task

    // saving a new task
    $scope.createTask = function () {
        // call the service
        $scope.newTask.$save(function () {
            // when saved, reload the list and recreate a new task
            $scope.tasks = Task.query();
            $scope.newTask = new Task();
        });
    }

    // removing a task
    $scope.deleteTask = function (task) {
        // call the service
        task.$delete(function () {
            // when deleted, reload the list
            $scope.tasks = Task.query();
        });
    }

    // saving an existing task
    $scope.updateTask = function (task) {
        // call the service
        task.$update();
    }
}