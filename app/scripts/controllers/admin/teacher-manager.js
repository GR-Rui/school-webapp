'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:TeacherManagerCtrl
 * @description
 * # TeacherManagerCtrl
 * Controller of the webApp
 */
Site.controller('TeacherManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'TeacherManagerSrv', function ($scope, $state, $location, $stateParams, $q, TeacherManagerSrv) {
  console.log('TeacherManagerCtrl');

  var tid = $stateParams.tid;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('teacher-list') > 0) {
    getAllTeachers();
  }

  //
  if (tid) {
    TeacherManagerSrv.getTeacherById(tid)
      .then(function (res) {
        if (res.status == 200) {
          var object = res.data;
//          object.createDate = moment().format('LLLL');
          $scope.teacher = object;
        }
      });
  }

  /*
   $scope.checkAll = function () {
   $scope.selectedAll = !$scope.selectedAll;
   angular.forEach($scope.classes, function (item) {
   item.selected = $scope.selectedAll;
   });
   };

   $scope.deleteItems = function () {
   var promiseArray = [];
   var classes = _.filter($scope.classes, {'selected': true});
   _.forEach(classes, function (item) {
   promiseArray.push(ClassManagerSrv.deleteClass(item.id));
   });
   $q.all(promiseArray)
   .then(function (responseArray) {
   if (responseArray.length == classes.length) {
   $scope.classes = _.xor($scope.classes, classes);
   }
   })
   };*/

  // create
  $scope.form = {};
  $scope.form.school_id = 1;
  $scope.create = function () {
    var object = $scope.form;
//    object.operId = userId;
    TeacherManagerSrv.insertTeacher(object)
      .then(function (res) {
        if (res.status == 200) {
          //var tid = res.data.id;
          $state.go('super-admin.teacher-list', {id: userId});
        }
      });
  };

  // update
  $scope.update = function (tid) {
    var object = $scope.teacher;
    TeacherManagerSrv.updateTeacher(tid, object)
      .then(function (res) {
        if (res.data) {
          $state.go('super-admin.teacher-list', {id: userId});
        }
      });
  };

  // Delete
  $scope.delete = function (tid) {
    TeacherManagerSrv.deleteTeacher(tid)
      .then(function (res) {
        if (res.status == 200) {
//          var b = res.data;
          $state.go('super-admin.teacher-list', {id: userId});
        }
      });
  };

  function getAllTeachers() {
    TeacherManagerSrv.getAllTeachers()
      .then(function (res) {
        if (res.status == 200) {
          $scope.teachers = res.data;
          // default sort column
          $scope.getters = {
            name: function (value) {
              //this will sort by the length of the first name string
              return value.name.length;
            }
          };
        }//if
      });
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
  $scope.teachers = [
    {id:1, "real_name":"122","roll_no":"222","signin_password":"222","security_key":"222","signup_ip":"2222","school_id":"2","discipline":"2222","position":"22222","email":"2222","mobile":"22222","remark":"2222222"},
    {id:2, "real_name":"222","roll_no":"222","signin_password":"222","security_key":"222","signup_ip":"2222","school_id":"2","discipline":"2222","position":"22222","email":"2222","mobile":"22222","remark":"2222222"},
    {id:3, "real_name":"322","roll_no":"222","signin_password":"222","security_key":"222","signup_ip":"2222","school_id":"2","discipline":"2222","position":"22222","email":"2222","mobile":"22222","remark":"2222222"}
  ];
  $scope.teacher = {id:3, "real_name":"122","roll_no":"222","signin_password":"222","security_key":"222","signup_ip":"2222","school_id":"2","discipline":"2222","position":"22222","email":"2222","mobile":"22222","remark":"2222222"};

}]);

