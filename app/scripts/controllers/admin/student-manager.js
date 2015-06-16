'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:StudentManagerCtrl
 * @description
 * # TeacherManagerCtrl
 * Controller of the webApp
 */
Site.controller('StudentManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'StudentManagerSrv','$route' , function ($scope, $state, $location, $stateParams, $q, StudentManagerSrv, $route) {
  console.log('StudentManagerCtrl');

  var sid = $stateParams.sid;
  var path = $location.path();
  var userId = $scope.userData.id;

  //
  if (sid) {
    StudentManagerSrv.getStudentById(sid)
      .then(function (res) {
        var temp = JSON.parse(res);
        var student = JSON.parse(temp);
        $scope.student = student[0];
      });
  }

  // create
  $scope.form = {};
  $scope.form.school_id = 1;
  $scope.form.status = 'OPENED';
  $scope.create = function () {
    if ( !isValid() ) return;
    var object = $scope.form;
//    object.operId = userId;
    StudentManagerSrv.insertStudent(object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.student-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // update
  $scope.update = function (sid) {
    if ( !isValid() ) return;
//    var object = _.pick($scope.student, ['name', 'description']);
    var object = $scope.student;
    StudentManagerSrv.updateStudent(sid, object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.student-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // Delete
  $scope.delete = function (sid) {
    StudentManagerSrv.deleteStudent(sid)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.student-list', {id: userId});
        } else {
          alert('删除失败！');
        }
      });
  };

  function getAllStudents() {
    StudentManagerSrv.getAllStudents($scope.pageSize, $scope.pageIndex)
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.students = JSON.parse(temp);
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

  StudentManagerSrv.getStudentCount()
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
      $location.path('/admin/' + userId + '/student-list');
      $location.search('pageIndex', index - 1);
      $scope.pageIndex = index - 1;
      getAllStudents();
      $route.reload();
    }
  };

  $scope.nextPage = function () {
//    getPageParams();
    var index = $scope.pageIndex;
    if (index >= $scope.pageNum) {
      return;
    } else {
      $location.path('/admin/' + userId + '/student-list');
      $location.search('pageIndex', index + 1);
      $scope.pageIndex = index + 1;
      getAllStudents();
      $route.reload();
    }
  };

  $scope.lastPage = function () {
    $scope.pageIndex = $scope.pageNum;
    $location.path('/admin/' + userId + '/student-list');
    $location.search('pageIndex', $scope.pageIndex);
    getAllStudents();
    $route.reload();
  };

  $scope.firstPage = function () {
    $scope.pageIndex = 1;
    $location.path('/admin/' + userId + '/student-list');
    $location.search('pageIndex', $scope.pageIndex);
    getAllStudents();
    $route.reload();
  };

  if (path.indexOf('student-list') > 0) {
    getPageParams();
    getAllStudents();
  }

  //
  function isValid() {
    var obj;
    var isPassed = true;
    if($scope.student) {
      obj = $scope.student;
    }else{
      obj = $scope.form;
    }
    if(typeof obj.real_name == 'undefined' || obj.real_name.length == 0) {
      $('#real_name').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.roll_no == 'undefined' || obj.roll_no.length == 0) {
      $('#roll_no').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.signup_ip == 'undefined' || obj.signup_ip.length == 0) {
      $('#signup_ip').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.email == 'undefined' || obj.email.length == 0) {
      $('#email').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.mobile == 'undefined' || obj.mobile.length == 0) {
      $('#mobile').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(obj.real_name.length > 0 && !/^[\u0391-\uFFE5]+$/.test(obj.real_name)) {
      $('#real_name').siblings('span.error-msg').html('姓名只能包含汉字');
      isPassed = false;
      return isPassed;
    }
    if(obj.roll_no.length > 0 && !/^[A-Za-z0-9]+$/.test(obj.roll_no)) {
      $('#roll_no').siblings('span.error-msg').html('编号只能包含字母和数值');
      isPassed = false;
      return isPassed;
    }
    if(obj.signup_ip.length > 0 && !/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/.test(obj.signup_ip)) {
      $('#signup_ip').siblings('span.error-msg').html('IP格式不合法');
      isPassed = false;
      return isPassed;
    }
    if(obj.email.length > 0 && !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(obj.email)) {
      $('#email').siblings('span.error-msg').html('email格式不合法');
      isPassed = false;
      return isPassed;
    }
    if(obj.mobile.length > 0 && !/^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(obj.mobile)) {
      $('#mobile').siblings('span.error-msg').html('手机号码格式不合法');
      isPassed = false;
      return isPassed;
    }
    return isPassed;
  }
  $('form input').on('input', function(){
    $(this).siblings('span.error-msg').html('');
  });

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
  /*$scope.students = [
    {id: 1, "real_name":"11","status":"OPENED","roll_no":"111","signin_password":"111","security_key":"111","signup_ip":"111","school_id":"1111","email":"111","mobile":"111","remark":"1111"},
    {id: 2, "real_name":"11","status":"OPENED","roll_no":"111","signin_password":"111","security_key":"111","signup_ip":"111","school_id":"1111","email":"111","mobile":"111","remark":"1111"},
    {id: 3, "real_name":"11","status":"OPENED","roll_no":"111","signin_password":"111","security_key":"111","signup_ip":"111","school_id":"1111","email":"111","mobile":"111","remark":"1111"}
  ];
  $scope.student = {id: 3, "real_name":"11","status":"OPENED","roll_no":"111","signin_password":"111","security_key":"111","signup_ip":"111","school_id":"1111","email":"111","mobile":"111","remark":"1111"};
*/
}]);

