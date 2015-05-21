'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:TeacherManagerCtrl
 * @description
 * # TeacherManagerCtrl
 * Controller of the webApp
 */
Site.controller('TeacherManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'TeacherManagerSrv', '$route', function ($scope, $state, $location, $stateParams, $q, TeacherManagerSrv, $route) {
  console.log('TeacherManagerCtrl');

  var tid = $stateParams.tid;
  var path = $location.path();
  var userId = $scope.userData.id;

  //
  if (tid) {
    TeacherManagerSrv.getTeacherById(tid)
      .then(function (res) {
        var temp = JSON.parse(res);
        var teacher = JSON.parse(temp);
        $scope.teacher = teacher[0];
      });
  }

  // create
  $scope.form = {};
  $scope.form.school_id = 1;//TODO
  $scope.create = function () {
    var object = $scope.form;
//    object.operId = userId;
    TeacherManagerSrv.insertTeacher(object)
      .then(function (res) {
        if (res == 'true') {
          //var tid = res.data.id;
          $state.go('admin.teacher-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // update
  $scope.update = function (tid) {
    var object = $scope.teacher;
    TeacherManagerSrv.updateTeacher(tid, object)
      .then(function (res) {
        if (res == 'true') {
          $state.go('admin.teacher-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // Delete
  $scope.delete = function (tid) {
    TeacherManagerSrv.deleteTeacher(tid)
      .then(function (res) {
        if (res == 'true') {
//          var b = res.data;
          $state.go('admin.teacher-list', {id: userId});
        } else {
          alert('删除失败！');
        }
      });
  };

  function getAllTeachers() {
    TeacherManagerSrv.getAllTeachers($scope.pageSize, $scope.pageIndex)
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.teachers = JSON.parse(temp);
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

  TeacherManagerSrv.getTeacherCount()
    .then(function (res) {
      $scope.count = res;
      $scope.pageNum = Math.ceil($scope.count / $scope.pageSize);
    });

  $scope.prePage = function () {
    getPageParams();
    var index = $scope.pageIndex;
    if (index <= 1) {
      return;
    } else {
      $location.path('/admin/' + userId + '/teacher-list');
      $location.search('pageIndex', index - 1);
      getAllTeachers();
      $route.reload();
    }
  };

  $scope.nextPage = function () {
    getPageParams();
    var index = $scope.pageIndex;
    if (index >= $scope.pageNum) {
      return;
    } else {
      $location.path('/admin/' + userId + '/teacher-list');
      $location.search('pageIndex', index + 1);
      getAllTeachers();
      $route.reload();
    }
  };

  if (path.indexOf('teacher-list') > 0) {
    getPageParams();
    getAllTeachers();
  }

  //////// upload file
  var uploadObj = $("#fileUpload").uploadFile({
    url: "upload.php",
    allowedTypes: "xls",
    multiple: true,
    autoSubmit: false,
    fileName: "file",
    maxFileSize: 1024 * 1024 * 20,
    maxFileCount: 1,
    showProgress: true,
    showFileCounter: true,
    showStatusAfterSuccess: true,
    uploadButtonClass: "ajax-file-upload-blue",
    onSubmit: function (files) {
      $("#eventsmessage").html($("#eventsmessage").html() + "<br/>Submitting:" + JSON.stringify(files));
    },
    onSuccess: function (files, data, xhr) {

    },
    onError: function (files, status, errMsg) {
      $("#eventsmessage").html($("#eventsmessage").html() + "<br/>Error for: " + JSON.stringify(files));
    }
  });

  $("#startUpload").on('click', function () {
    uploadObj.startUpload();
  });

  ///////////// test data
  /*$scope.teachers = [
    {id: 1, "real_name": "122", "roll_no": "222", "signin_password": "222", "security_key": "222", "signup_ip": "2222", "school_id": "2", "discipline": "2222", "position": "22222", "email": "2222", "mobile": "22222", "remark": "2222222"},
    {id: 2, "real_name": "222", "roll_no": "222", "signin_password": "222", "security_key": "222", "signup_ip": "2222", "school_id": "2", "discipline": "2222", "position": "22222", "email": "2222", "mobile": "22222", "remark": "2222222"},
    {id: 3, "real_name": "322", "roll_no": "222", "signin_password": "222", "security_key": "222", "signup_ip": "2222", "school_id": "2", "discipline": "2222", "position": "22222", "email": "2222", "mobile": "22222", "remark": "2222222"}
  ];
  $scope.teacher = {id: 3, "real_name": "322", "roll_no": "222", "signin_password": "222", "security_key": "222", "signup_ip": "2222", "school_id": 2, "discipline": "2222", "position": "22222", "email": "2222", "mobile": "22222", "remark": "2222222"};
  */
}]);

