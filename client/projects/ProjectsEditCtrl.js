angular
  .module('Tracker')
  .controller('ProjectsEditCtrl', function ($scope, $state, Project) {

    if ($state.params.projectId) {
      $scope.project = Project.get({projectId: $state.params.projectId});
    } else {
      $scope.project = new Project;
    }

    $scope.save = function () {

      var promise = $scope.project._id ? $scope.project.$update() : $scope.project.$save();

      promise.then(function () {
        $state.go('app.projects.list');
      }, function (resp) {
        $scope.errors = resp.data;
      });

    }

  });