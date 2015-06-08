'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webappApp
 */
Site.controller('LoginCtrl', ['$scope', 'AuthSrv', '$state', '$location', function ($scope, AuthSrv, $state, $location) {

  $scope.loginDisabled = true;
  $scope.userMsg = undefined;
  $scope.passMsg = undefined;
  $scope.codeMsg = undefined;

  $scope.nameValidation = function () {
    if (!$scope.form || $scope.form.user == '') {
      $scope.userMsg = '用户名不能为空！';
    } else {
      $scope.userMsg = '';
    }
    activeSubmitBtn();
  };

  $scope.passValidation = function () {
    if (!$scope.form || $scope.form.pass == '') {
      $scope.passMsg = '密码不能为空！';
    } else {
      $scope.passMsg = '';
    }
    activeSubmitBtn();
  };

  $scope.codeValidation = function () {
    if (!$scope.form || ($scope.form.code.toLocaleUpperCase() != $scope.code && $scope.form.code.length >= 5)) {
      $scope.codeMsg = '验证码输入不正确！';
    } else {
      $scope.codeMsg = '';
    }
    if ($scope.form && $scope.form.code.length >= 5) {
      activeSubmitBtn();
    }
  };

  var activeSubmitBtn = function () {
    if ($scope.userMsg == '' && $scope.passMsg == '' && $scope.codeMsg == '') {
      $scope.loginDisabled = false;
    } else {
      $scope.loginDisabled = true;//TODO true
    }
  };

  $scope.login = function () {
    /*AuthSrv.login($scope.form.user, $scope.form.pass)
     .then(function (session) {
     var users = session.data;
     var user = {name: $scope.form.user, pass: $scope.form.pass};

     var redirectUrl = undefined;
     if (redirectUrl) {
     $location.path(redirectUrl);
     } else {
     var res = _.find(users, function (item) {
     return item.name == user.name;
     });
     if (res && res.length > 0) {
     $state.go('admin.home', {id: res.id});
     }
     }
     })*/
    var users = [
      {id: 1, name: 'admin', pass: 'yjtadmin'},
      {id: 2, name: 'system', pass: 'yjtsystem'}
    ];
    var user = {name: $scope.form.user, pass: $scope.form.pass};
    var res = _.find(users, function (item) {
      return item.name == user.name;
    });
    if (res && res.id) {
      $state.go('admin.home', {id: res.id});
    }else{
      alert
    }
  };

  $scope.createCode = function () {
    $scope.code = "";
    var codeLength = 6;//验证码的长度
    var checkCode = document.getElementById("checkCode");
    var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//所有候选组成验证码的字符，当然也可以用中文的
    for (var i = 0; i < codeLength; i++) {
      var charIndex = Math.floor(Math.random() * 36);
      $scope.code += selectChar[charIndex];
    }
    if (checkCode) {
      checkCode.className = "code";
      checkCode.value = $scope.code;
      checkCode.blur();
    }
  };

  $scope.forgotPassword = function () {
    //TODO
  };

  // init
  $scope.createCode();


}]);
