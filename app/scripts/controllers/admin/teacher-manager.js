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
        if (res.ack == 'success') {
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
  $scope.create = function () {
    var object = $scope.form;
//    object.operId = userId;
    TeacherManagerSrv.insertTeacher(object)
      .then(function (res) {
        if (res.ack == 'success') {
          var tid = res.data.id;
          $state.go('super-admin.teacher-detail', {id: userId, tid: tid});
        }
      });
  };

  // update
  $scope.update = function (tid) {
    var object = _.pick($scope.teacher, ['name', 'description']);
    TeacherManagerSrv.updateTeacher(tid, object)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.teacher-detail', {id: userId, tid: tid});
        }
      });
  };

  // Delete
  $scope.delete = function (tid) {
    TeacherManagerSrv.deleteTeacher(tid)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.teacher-list', {id: userId});
        }
      });
  };

  function getAllTeachers() {
    TeacherManagerSrv.getAllTeachers()
      .then(function (res) {
        if (res.ack == 'success') {
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

  ///////////// test data
  $scope.teachers = [
    {'id': 1, "name": "111", "school_id": "1", "school_code": "111", "grade": "111", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"},
    {'id': 2, "name": "111", "school_id": "1", "school_code": "111", "grade": "111", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"},
    {'id': 3, "name": "111", "school_id": "1", "school_code": "111", "grade": "111", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"}
  ];
  $scope.teacher = {'id': 1, "name": "111", "school_id": "1", "school_code": "111", "grade": "111", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"};

}]);

