'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:ClassManagerCtrl
 * @description
 * # ClassManagerCtrl
 * Controller of the webApp
 */
Site.controller('ClassManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'ClassManagerSrv', '$route', function ($scope, $state, $location, $stateParams, $q, ClassManagerSrv, $route) {
  console.log('ClassManagerCtrl');

  var cid = $stateParams.cid;
  var path = $location.path();
  var userId = $scope.userData.id;

  //
  if (cid) {
    ClassManagerSrv.getClassById(cid)
      .then(function (res) {
        var temp = JSON.parse(res);
        var obj = JSON.parse(temp);
        $scope.class = obj[0];
      });
  }

  // create
  $scope.form = {};
  $scope.form.school_id = 1;
  $scope.form.grade = 'GRADE_1';
  $scope.form.status = 'OPENED';
  $scope.create = function () {
    if ( !isValid() ) return;
    var object = $scope.form;
//    object.operId = userId;
    ClassManagerSrv.insertClass(object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.class-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // update
  $scope.update = function (cid) {
//    var object = _.pick($scope.class, ['name', 'description']);
    if ( !isValid() ) return;
    var object = $scope.class;
      ClassManagerSrv.updateClass(cid, object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.class-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // Delete
  $scope.delete = function (cid) {
    ClassManagerSrv.deleteClass(cid)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.class-list', {id: userId});
        } else {
          alert('删除失败！');
        }
      });
  };

  function getAllClasses() {
    ClassManagerSrv.getAllClasses($scope.pageSize, $scope.pageIndex)
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.classes = JSON.parse(temp);
      });
  }

  /*
   ** pagination
   */
  function getPageParams() {
    var params = $location.search();
    if (!_.isEmpty(params)) {
      $scope.pageIndex = parseInt(params.pageIndex, 10);
    } else {
      $scope.pageIndex = 1;
    }
  }

  ClassManagerSrv.getClassCount()
    .then(function (res) {
      $scope.count = res;
      $scope.pageNum = Math.ceil($scope.count/$scope.pageSize);
    });

  $scope.prePage = function () {
//    getPageParams();
    var index = $scope.pageIndex;
    if (index <= 1) {
      return;
    } else {
      $location.path('/admin/' + userId + '/class-list');
      $location.search('pageIndex', index - 1);
      $scope.pageIndex = index - 1;
      getAllClasses();
      $route.reload();
    }
  };

  $scope.nextPage = function () {
//    getPageParams();
    var index = $scope.pageIndex;
    if (index >= $scope.pageNum) {
      return;
    } else {
      $location.path('/admin/' + userId + '/class-list');
      $location.search('pageIndex', index + 1);
      $scope.pageIndex = index + 1;
      getAllClasses();
      $route.reload();
    }
  };

  $scope.lastPage = function () {
    $scope.pageIndex = $scope.pageNum;
    $location.path('/admin/' + userId + '/class-list');
    $location.search('pageIndex', $scope.pageIndex);
    getAllClasses();
    $route.reload();
  };

  $scope.firstPage = function () {
    $scope.pageIndex = 1;
    $location.path('/admin/' + userId + '/class-list');
    $location.search('pageIndex', $scope.pageIndex);
    getAllClasses();
    $route.reload();
  };

  if (path.indexOf('class-list') > 0) {
    getPageParams();
    getAllClasses();
  }

  function isValid() {
    var obj;
    var isPassed = true;
    if($scope.teacher) {
      obj = $scope.teacher;
    }else{
      obj = $scope.form;
    }
    if(typeof obj.name == 'undefined' || obj.name.length == 0) {
      $('#name').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.school_code == 'undefined' || obj.school_code.length == 0) {
      $('#school_code').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.enter_year == 'undefined' || obj.enter_year.length == 0) {
      $('#enter_year').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.charge_teacher == 'undefined' || obj.charge_teacher.length == 0) {
      $('#charge_teacher').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(obj.school_code.length > 0 && !/^[A-Za-z0-9]+$/.test(obj.school_code)) {
      $('#school_code').siblings('span.error-msg').html('编号只能包含字母和数值');
      isPassed = false;
      return isPassed;
    }
    if(obj.enter_year.length > 0 && !/^[0-9]+$/.test(obj.enter_year)) {
      $('#enter_year').siblings('span.error-msg').html('请输入正确的年份，如2014');
      isPassed = false;
      return isPassed;
    }
//    if(obj.charge_teacher.length > 0 && !/^[\u0391-\uFFE5]+$/.test(obj.charge_teacher)) {
//      $('#charge_teacher').siblings('span.error-msg').html('姓名只能包含汉字');
//      isPassed = false;
//      return isPassed;
//    }
    if(obj.contact_mobile && obj.contact_mobile.length > 0 && !/^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(obj.contact_mobile)) {
      $('#contact_mobile').siblings('span.error-msg').html('手机号码格式不合法');
      isPassed = false;
      return isPassed;
    }
    return isPassed;
  }
  $('form input').on('input', function(){
    $(this).siblings('span.error-msg').html('');
  });

  ///////////// test data
  /*$scope.classes = [
    {'id': 1, "name": "111", "school_id": "1", "school_code": "111", "grade": "GRADE_1","status":"OPENED", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"},
    {'id': 2, "name": "111", "school_id": "1", "school_code": "111", "grade": "GRADE_ONE","status":"OPENED", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"},
    {'id': 3, "name": "111", "school_id": "1", "school_code": "111", "grade": "GRADE_ONE","status":"OPENED", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"}
  ];
  $scope.class = {'id': 1, "name": "111", "school_id": "1", "school_code": "111", "grade": "GRADE_ONE","status":"OPENED", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"};
*/
}]);

