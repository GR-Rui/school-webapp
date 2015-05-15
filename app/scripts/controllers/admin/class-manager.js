'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:ClassManagerCtrl
 * @description
 * # ClassManagerCtrl
 * Controller of the webApp
 */
Site.controller('ClassManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'ClassManagerSrv', function ($scope, $state, $location, $stateParams, $q, ClassManagerSrv) {
  console.log('ClassManagerCtrl');

  var cid = $stateParams.cid;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('class-list') > 0) {
    getAllClasses();
  }

  //
  if (cid) {
    ClassManagerSrv.getClassById(cid)
      .then(function (res) {
        if (res.ack == 'success') {
          var object = res.data[0];
//          object.createDate = moment().format('LLLL');
          $scope.class = object;
        }
      });
  }

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
  };

  // create
  $scope.create = function () {
    var object = $scope.form;
//    object.operId = userId;
    ClassManagerSrv.insertClass(object)
      .then(function (res) {
        if (res.ack == 'success') {
          var cid = res.data.id;
          $state.go('super-admin.class-detail', {id: userId, cid: cid});
        }
      });
  };

  // update
  $scope.update = function (cid) {
    var object = _.pick($scope.class, ['name', 'description']);
    ClassManagerSrv.updateClass(cid, object)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.class-detail', {id: userId, cid: cid});
        }
      });
  };

  // Delete
  $scope.delete = function (cid) {
    ClassManagerSrv.deleteClass(cid)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.class-list', {id: userId});
        }
      });
  };

  function getAllClasses() {
    ClassManagerSrv.getAllClasses()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.classes = res.data;
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
  $scope.classes = [
    {'id': 1, "name": "111", "school_id": "1", "school_code": "111", "grade": "111", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"},
    {'id': 2, "name": "111", "school_id": "1", "school_code": "111", "grade": "111", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"},
    {'id': 3, "name": "111", "school_id": "1", "school_code": "111", "grade": "111", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"}
  ];
  $scope.class = {'id': 1, "name": "111", "school_id": "1", "school_code": "111", "grade": "111", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"};

}]);

