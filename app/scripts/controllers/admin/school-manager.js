'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:SchoolManagerCtrl
 * @description
 * # SchoolManagerCtrl
 * Controller of the webApp
 */
Site.controller('SchoolManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'SchoolManagerSrv', function ($scope, $state, $location, $stateParams, $q, SchoolManagerSrv) {
  console.log('SchoolManagerCtrl');

  var sid = $stateParams.sid;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('school-list') > 0) {
    getAllSchools();
  }

  //
  if (sid) {
    SchoolManagerSrv.getSchoolById(sid)
      .then(function (res) {
        if (res.ack == 'success') {
          var object = res.data;
//          object.createDate = moment().format('LLLL');
          $scope.school = object;
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
    SchoolManagerSrv.insertSchool(object)
      .then(function (res) {
        if (res.ack == 'success') {
          var sid = res.data.id;
          $state.go('super-admin.school-detail', {id: userId, sid: sid});
        }
      });
  };

  // update
  $scope.update = function (sid) {
    var object = _.pick($scope.school, ['name', 'description']);
    SchoolManagerSrv.updateSchool(sid, object)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.school-detail', {id: userId, sid: sid});
        }
      });
  };

  // Delete
  $scope.delete = function (sid) {
    SchoolManagerSrv.deleteSchool(sid)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.school-list', {id: userId});
        }
      });
  };

  function getAllSchools() {
    SchoolManagerSrv.getAllSchools()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.schools = res.data;
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
  $scope.schools = [
    {id: 1, "name":"333","edu_no":"333","code":"333","level":"333","principal":"333","province_id":"333","city_id":"3333","district_id":"33333","official_email":"3333","official_tel":"3333","address":"3333","postal_code":"3333","contact":"3333","contact_mobile":"333","contact_tel":"333","remark":"3333"},
    {id: 2, "name":"333","edu_no":"333","code":"333","level":"333","principal":"333","province_id":"333","city_id":"3333","district_id":"33333","official_email":"3333","official_tel":"3333","address":"3333","postal_code":"3333","contact":"3333","contact_mobile":"333","contact_tel":"333","remark":"3333"},
    {id: 3, "name":"333","edu_no":"333","code":"333","level":"333","principal":"333","province_id":"333","city_id":"3333","district_id":"33333","official_email":"3333","official_tel":"3333","address":"3333","postal_code":"3333","contact":"3333","contact_mobile":"333","contact_tel":"333","remark":"3333"}
  ];
  $scope.school = {id: 3, "name":"333","edu_no":"333","code":"333","level":"333","principal":"333","province_id":"333","city_id":"3333","district_id":"33333","official_email":"3333","official_tel":"3333","address":"3333","postal_code":"3333","contact":"3333","contact_mobile":"333","contact_tel":"333","remark":"3333"};

}]);

