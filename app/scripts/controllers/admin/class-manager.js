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
  $scope.form.grade = 'GRADE_ONE';
  $scope.form.status = 'OPENED';
  $scope.create = function () {
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
    var object = $scope.class;
      ClassManagerSrv.updateClass(cid, object)
      .then(function (res) {
        if (res=='true') {
          $state.go('super-admin.class-list', {id: userId});
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
          $state.go('super-admin.class-list', {id: userId});
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
    getPageParams();
    var index = $scope.pageIndex;
    if (index <= 1) {
      return;
    } else {
      $location.path('/admin/' + userId + '/class-list');
      $location.search('pageIndex', index - 1);
      getAllClasses();
      $route.reload();
    }
  };

  $scope.nextPage = function () {
    getPageParams();
    var index = $scope.pageIndex;
    if (index >= $scope.pageNum) {
      return;
    } else {
      $location.path('/admin/' + userId + '/class-list');
      $location.search('pageIndex', index + 1);
      getAllClasses();
      $route.reload();
    }
  };

  if (path.indexOf('class-list') > 0) {
    getPageParams();
    getAllClasses();
  }

  ///////////// test data
  /*$scope.classes = [
    {'id': 1, "name": "111", "school_id": "1", "school_code": "111", "grade": "GRADE_ONE","status":"OPENED", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"},
    {'id': 2, "name": "111", "school_id": "1", "school_code": "111", "grade": "GRADE_ONE","status":"OPENED", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"},
    {'id': 3, "name": "111", "school_id": "1", "school_code": "111", "grade": "GRADE_ONE","status":"OPENED", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"}
  ];
  $scope.class = {'id': 1, "name": "111", "school_id": "1", "school_code": "111", "grade": "GRADE_ONE","status":"OPENED", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"};
*/
}]);

