'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webappApp
 */
Site.controller('LoginCtrl', ['$scope', 'AuthSrv', '$state', '$location', function ($scope, AuthSrv, $state, $location) {

  $scope.login = function () {
    AuthSrv.login($scope.form.user, $scope.form.pass)
      .then(function (session) {
        var user = session.data;

        var redirectUrl = undefined;
        if (redirectUrl) {
          $location.path(redirectUrl);
        } else {
          $state.go('admin.home', {id: user.userId});
        }
      })
  };

  $scope.createCode = function () {
    var code = "";
    var codeLength = 6;//验证码的长度
    var checkCode = document.getElementById("checkCode");
    var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//所有候选组成验证码的字符，当然也可以用中文的
    for (var i = 0; i < codeLength; i++) {
      var charIndex = Math.floor(Math.random() * 36);
      code += selectChar[charIndex];
    }
    if (checkCode) {
      checkCode.className = "code";
      checkCode.value = code;
      checkCode.blur();
    }
  };

  $scope.createCode();


}]);
