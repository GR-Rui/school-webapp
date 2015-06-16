'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:TeacherClassManagerCtrl
 * @description
 * # TeacherClassManagerCtrl
 * Controller of the webApp
 */
Site.controller('TeacherClassManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'TeacherClassManagerSrv', 'TeacherManagerSrv', 'ClassManagerSrv', '$route', function ($scope, $state, $location, $stateParams, $q, TeacherClassManagerSrv, TeacherManagerSrv, ClassManagerSrv, $route) {
  console.log('TeacherClassManagerCtrl');

  var cid = $stateParams.tcid;
  var path = $location.path();
  var userId = $scope.userData.id;

  //
  if (cid) {
    TeacherClassManagerSrv.getTeacherClassById(cid)
      .then(function (res) {
        var temp = JSON.parse(res);
        var obj = JSON.parse(temp);
        $scope.teacherClass = obj[0];

        if ($scope.teacherClass && path.indexOf('teacher-class-edit') > 0) {
          var schoolId = $scope.teacherClass.school_id;
          TeacherManagerSrv.getTeachersBySchoolId(schoolId)
            .then(function (res) {
              var temp = JSON.parse(res);
              $scope.teachersBySchool = JSON.parse(temp);
            });
          ClassManagerSrv.getClassesBySchoolId(schoolId)
            .then(function (res) {
              var temp = JSON.parse(res);
              $scope.classesBySchool = JSON.parse(temp);
            });
        }

      });
  }

  // create
  $scope.form = {};
  $scope.form.school_id = 1;//TODO
//  $scope.form.teacher_id = 1;
//  $scope.form.class_id = 1;
  $scope.form.status = 'OPENED';
  $scope.create = function () {
    if ( !isValid() ) return;
    var object = $scope.form;
//    object.operId = userId;
    TeacherClassManagerSrv.insertTeacherClass(object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.teacher-class-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };


  // update
  $scope.update = function (cid) {
//    var object = _.pick($scope.class, ['name', 'description']);
    if ( !isValid() ) return;
    var object = $scope.teacherClass;
    TeacherClassManagerSrv.updateTeacherClass(cid, object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.teacher-class-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // Delete
  $scope.delete = function (cid) {
    TeacherClassManagerSrv.deleteTeacherClass(cid)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.teacher-class-list', {id: userId});
        } else {
          alert('删除失败！');
        }
      });
  };

  function getAllTeacherClasses() {
    TeacherClassManagerSrv.getAllTeacherClasses($scope.pageSize, $scope.pageIndex)
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.teacherClasses = JSON.parse(temp);
      });
  }

  function getTeachersBySchoolId(schoolId) {
    TeacherManagerSrv.getTeachersBySchoolId(schoolId)
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.teachersBySchool = JSON.parse(temp);
        if ($scope.teachersBySchool && path.indexOf('teacher-class-add') > 0) {
          $scope.form.teacher_id = $scope.teachersBySchool[0].id;
        }
        if ($scope.teachersBySchool && path.indexOf('teacher-class-edit') > 0) {
          $scope.teacherClass.teacher_id = $scope.teachersBySchool[0].id;
        }
      });
  }

  function getClassesBySchoolId(schoolId) {
    ClassManagerSrv.getClassesBySchoolId(schoolId)
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.classesBySchool = JSON.parse(temp);
        if ($scope.classesBySchool && path.indexOf('teacher-class-add') > 0) {
          $scope.form.class_id = $scope.classesBySchool[0].id;
        }
        if ($scope.classesBySchool && path.indexOf('teacher-class-edit') > 0) {
          $scope.teacherClass.class_id = $scope.classesBySchool[0].id;
        }
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

  TeacherClassManagerSrv.getTeacherClassCount()
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
      $location.path('/admin/' + userId + '/teacher-class-list');
      $location.search('pageIndex', index - 1);
      $scope.pageIndex = index - 1;
      getAllTeacherClasses();
      $route.reload();
    }
  };

  $scope.nextPage = function () {
//    getPageParams();
    var index = $scope.pageIndex;
    if (index >= $scope.pageNum) {
      return;
    } else {
      $location.path('/admin/' + userId + '/teacher-class-list');
      $location.search('pageIndex', index + 1);
      $scope.pageIndex = index + 1;
      getAllTeacherClasses();
      $route.reload();
    }
  };

  $scope.lastPage = function () {
    $scope.pageIndex = $scope.pageNum;
    $location.path('/admin/' + userId + '/teacher-class-list');
    $location.search('pageIndex', $scope.pageIndex);
    getAllTeacherClasses();
    $route.reload();
  };

  $scope.firstPage = function () {
    $scope.pageIndex = 1;
    $location.path('/admin/' + userId + '/teacher-class-list');
    $location.search('pageIndex', $scope.pageIndex);
    getAllTeacherClasses();
    $route.reload();
  };

  if (path.indexOf('teacher-class-list') > 0) {
    getPageParams();
    getAllTeacherClasses();
  }

  if (path.indexOf('teacher-class-add') > 0) {
    getTeachersBySchoolId($scope.form.school_id);
    getClassesBySchoolId($scope.form.school_id);
  }

  $scope.changeSchool = function () {
    var obj;
    if($scope.teacherClass) {
      obj = $scope.teacherClass;
    }else {
      obj = $scope.form;
    }
    getTeachersBySchoolId(obj.school_id);
    getClassesBySchoolId(obj.school_id);
  };

  function isValid() {
    var obj;
    var isPassed = true;
    if($scope.teacherClass) {
      obj = $scope.teacherClass;
    }else{
      obj = $scope.form;
    }
    if(typeof obj.teacher_id == 'undefined' || obj.teacher_id.length == 0) {
      $('#teacher_id').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.class_id == 'undefined' || obj.class_id.length == 0) {
      $('#class_id').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    return isPassed;
  }
  $('#school_id').on('change', function(){
    $(this).siblings('span.error-msg').html('');
  });

  ///////////// test data
  /*$scope.teacherClasses = [
    {id: 1, "teacher_id":1,"class_id":1,"status":0, "added_time":"xxx", "remark":"dsds"},
    {id: 2, "teacher_id":1,"class_id":1,"status":0, "added_time":"xxx", "remark":"dsds"},
    {id: 3, "teacher_id":1,"class_id":1,"status":0, "added_time":"xxx", "remark":"dsds"}
  ];
  $scope.teacherClass = {id: 3, "teacher_id":1,"class_id":1,"status":0, "added_time":"xxx", "remark":"dsds"};
*/
}]);

