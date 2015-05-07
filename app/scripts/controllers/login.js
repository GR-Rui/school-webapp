'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webappApp
 */
Site.controller('LoginCtrl',['$scope', 'AuthSrv', '$state', '$location', function ($scope, AuthSrv, $state, $location) {

  $scope.login = function () {
    AuthSrv.login($scope.form.user, $scope.form.pass)
      .then(function (session) {
        var user = session.data;

        var redirectUrl = undefined;
        if (redirectUrl) {
          $location.path(redirectUrl);
        } else {
          $state.go('admin.home',{id: user.userId});
        }
      })
      .catch(function () {
        $scope.loginFailed = true;
      })
      .finally(function () {
        $scope.loggingIn = false;
      });
  };
}]);
