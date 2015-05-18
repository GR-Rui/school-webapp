'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:StudentManagerCtrl
 * @description
 * # TeacherManagerCtrl
 * Controller of the webApp
 */
Site.controller('StudentManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'StudentManagerSrv', function ($scope, $state, $location, $stateParams, $q, StudentManagerSrv) {
  console.log('StudentManagerCtrl');

  var sid = $stateParams.sid;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('student-list') > 0) {
    getAllStudents();
  }

  //
  if (sid) {
    StudentManagerSrv.getStudentById(sid)
      .then(function (res) {
        if (res.ack == 'success') {
          var object = res.data;
//          object.createDate = moment().format('LLLL');
          $scope.student = object;
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
  $scope.create = function () {
    var object = $scope.form;
//    object.operId = userId;
    StudentManagerSrv.insertStudent(object)
      .then(function (res) {
        if (res.ack == 'success') {
          var sid = res.data.id;
          $state.go('super-admin.student-detail', {id: userId, sid: sid});
        }
      });
  };

  // update
  $scope.update = function (sid) {
    var object = _.pick($scope.student, ['name', 'description']);
    StudentManagerSrv.updateStudent(sid, object)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.student-detail', {id: userId, sid: sid});
        }
      });
  };

  // Delete
  $scope.delete = function (sid) {
    StudentManagerSrv.deleteStudent(sid)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.student-list', {id: userId});
        }
      });
  };

  function getAllStudents() {
    StudentManagerSrv.getAllStudents()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.students = res.data;
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
  $scope.students = [
    {id: 1, "real_name":"11","roll_no":"111","signin_password":"111","security_key":"111","signup_ip":"111","school_id":"1111","email":"111","mobile":"111","remark":"1111"},
    {id: 2, "real_name":"11","roll_no":"111","signin_password":"111","security_key":"111","signup_ip":"111","school_id":"1111","email":"111","mobile":"111","remark":"1111"},
    {id: 3, "real_name":"11","roll_no":"111","signin_password":"111","security_key":"111","signup_ip":"111","school_id":"1111","email":"111","mobile":"111","remark":"1111"}
  ];
  $scope.student = {id: 3, "real_name":"11","roll_no":"111","signin_password":"111","security_key":"111","signup_ip":"111","school_id":"1111","email":"111","mobile":"111","remark":"1111"};

}]);

