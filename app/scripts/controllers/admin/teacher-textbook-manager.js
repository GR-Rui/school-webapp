'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:TeacherTextbookManagerCtrl
 * @description
 * # TeacherTextbookManagerCtrl
 * Controller of the webApp
 */
Site.controller('TeacherTextbookManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'TeacherTextbookManagerSrv', '$route', function ($scope, $state, $location, $stateParams, $q, TeacherTextbookManagerSrv, $route) {
  console.log('TeacherTextbookManagerCtrl');

  var cid = $stateParams.ttid;
  var path = $location.path();
  var userId = $scope.userData.id;

  //
  if (cid) {
    TeacherTextbookManagerSrv.getTeacherTextbookById(cid)
      .then(function (res) {
        var temp = JSON.parse(res);
        var obj = JSON.parse(temp);
        $scope.teacherTextbook = obj[0];
      });
  }

  // create
  $scope.form = {};
  $scope.form.teacher_id = 1;
  $scope.form.textbook_id = 1;
  $scope.form.status = 0;
  $scope.create = function () {
    var object = $scope.form;
//    object.operId = userId;
    TeacherTextbookManagerSrv.insertTeacherTextbook(object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.teacher-textbook-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // update
  $scope.update = function (cid) {
//    var object = _.pick($scope.textbook, ['name', 'description']);
    var object = $scope.teacherTextbook;
    TeacherTextbookManagerSrv.updateTeacherTextbook(cid, object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.teacher-textbook-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // Delete
  $scope.delete = function (cid) {
    TeacherTextbookManagerSrv.deleteTeacherTextbook(cid)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.teacher-textbook-list', {id: userId});
        } else {
          alert('删除失败！');
        }
      });
  };

  function getAllTeacherTextbooks() {
    TeacherTextbookManagerSrv.getAllTeacherTextbooks($scope.pageSize, $scope.pageIndex)
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.teacherTextbooks = JSON.parse(temp);
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

  TeacherTextbookManagerSrv.getTeacherTextbookCount()
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
      $location.path('/admin/' + userId + '/teacher-textbook-list');
      $location.search('pageIndex', index - 1);
      getAllTeacherTextbooks();
      $route.reload();
    }
  };

  $scope.nextPage = function () {
    getPageParams();
    var index = $scope.pageIndex;
    if (index >= $scope.pageNum) {
      return;
    } else {
      $location.path('/admin/' + userId + '/teacher-textbook-list');
      $location.search('pageIndex', index + 1);
      getAllTeacherTextbooks();
      $route.reload();
    }
  };

  if (path.indexOf('teacher-textbook-list') > 0) {
    getPageParams();
    getAllTeacherTextbooks();
  }

  ///////////// test data
  /*$scope.teacherTextbooks = [
    {id: 1, "teacher_id":1,"textbook_id":1,"status":0, "added_time":"xxx", "remark":"dsds"},
    {id: 2, "teacher_id":1,"textbook_id":1,"status":0, "added_time":"xxx", "remark":"dsds"},
    {id: 3, "teacher_id":1,"textbook_id":1,"status":0, "added_time":"xxx", "remark":"dsds"}
  ];
  $scope.teacherTextbook = {id: 3, "teacher_id":1,"textbook_id":1,"status":0, "added_time":"xxx", "remark":"dsds"};
*/
}]);

