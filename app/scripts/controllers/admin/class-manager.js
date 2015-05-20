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
        var temp = JSON.parse(res);
        $scope.class = JSON.parse(temp);
      });
  }

  // create
  $scope.form = {};
  $scope.form.school_id = 1;
  $scope.create = function () {
    var object = $scope.form;
//    object.operId = userId;
    ClassManagerSrv.insertClass(object)
      .then(function (res) {
        if (res) {
          $state.go('super-admin.class-list', {id: userId});
        }
      });
  };

  // update
  $scope.update = function (cid) {
//    var object = _.pick($scope.class, ['name', 'description']);
    var object = $scope.class;
      ClassManagerSrv.updateClass(cid, object)
      .then(function (res) {
        if (res) {
          $state.go('super-admin.class-list', {id: userId});
        }
      });
  };

  // Delete
  $scope.delete = function (cid) {
    ClassManagerSrv.deleteClass(cid)
      .then(function (res) {
        if (res) {
          $state.go('super-admin.class-list', {id: userId});
        }
      });
  };

  function getAllClasses() {
    ClassManagerSrv.getAllClasses()
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.classes = JSON.parse(temp);
      });
  }

  ///////////// test data
  /*$scope.classes = [
    {'id': 1, "name": "111", "school_id": "1", "school_code": "111", "grade": "111", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"},
    {'id': 2, "name": "111", "school_id": "1", "school_code": "111", "grade": "111", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"},
    {'id': 3, "name": "111", "school_id": "1", "school_code": "111", "grade": "111", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"}
  ];
  $scope.class = {'id': 1, "name": "111", "school_id": "1", "school_code": "111", "grade": "111", "enter_year": "111", "charge_teacher": "111", "contact_mobile": "111", "remark": "1111"};
*/
}]);

