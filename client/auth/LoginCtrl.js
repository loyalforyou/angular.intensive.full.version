angular
  .module('Tracker')
  .factory('UserService', function ($resource) {

    var Auth = $resource('/api/auth/:action', {}, {
      login: {method: 'POST', params: {action: 'login'}},
      logout: {method: 'POST', params: {action: 'logout'}},
      signUp: {method: 'POST', params: {action: 'signup'}}
    });

    var self = {
      user: null,

      login: function (user) {
        return new Auth(user).$login().then(function (user) {
          self.user = user;
          return user;
        });
      },
      logout: function () {
        return new Auth().$logout().then(function () {
          self.user = null;
        });
      },
      signUp: function (user) {
        return new Auth(user).$signUp().then(function (user) {
          self.user = user;
          return user;
        });
      }
    };

    return self
  })
  .
  controller('LoginCtrl', function ($scope, $state, UserService) {

    $scope.user = {
      email: '',
      password: ''
    };

    $scope.login = function () {
      UserService.login($scope.user).then(function () {
        $state.go('app.projects')
      }, function (resp) {
        $scope.errors = resp.data;
      })
    }

  });