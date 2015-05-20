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
        var temp = JSON.parse(res);
        $scope.school = JSON.parse(temp);
      });
  }

  // create
  $scope.create = function () {
    var object = $scope.form;
//    object.operId = userId;
    SchoolManagerSrv.insertSchool(object)
      .then(function (res) {
        if (res) {
          $state.go('super-admin.school-list', {id: userId});
        }
      });
  };

  // update
  $scope.update = function (sid) {
//    var object = _.pick($scope.school, ['name', 'description']);
    var object = $scope.school;
    SchoolManagerSrv.updateSchool(sid, object)
      .then(function (res) {
        if (res) {
          $state.go('super-admin.school-list', {id: userId});
        }
      });
  };

  // Delete
  $scope.delete = function (sid) {
    SchoolManagerSrv.deleteSchool(sid)
      .then(function (res) {
        if (res) {
          $state.go('super-admin.school-list', {id: userId});
        }
      });
  };

  function getAllSchools() {
    SchoolManagerSrv.getAllSchools()
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.schools = JSON.parse(temp);
      });
  }

  ///////////// test data
  /*$scope.schools = [
    {id: 1, "name":"333","edu_no":"333","code":"333","level":"333","principal":"333","province_id":"333","city_id":"3333","district_id":"33333","official_email":"3333","official_tel":"3333","address":"3333","postal_code":"3333","contact":"3333","contact_mobile":"333","contact_tel":"333","remark":"3333"},
    {id: 2, "name":"333","edu_no":"333","code":"333","level":"333","principal":"333","province_id":"333","city_id":"3333","district_id":"33333","official_email":"3333","official_tel":"3333","address":"3333","postal_code":"3333","contact":"3333","contact_mobile":"333","contact_tel":"333","remark":"3333"},
    {id: 3, "name":"333","edu_no":"333","code":"333","level":"333","principal":"333","province_id":"333","city_id":"3333","district_id":"33333","official_email":"3333","official_tel":"3333","address":"3333","postal_code":"3333","contact":"3333","contact_mobile":"333","contact_tel":"333","remark":"3333"}
  ];
  $scope.school = {id: 3, "name":"333","edu_no":"333","code":"333","level":"333","principal":"333","province_id":"333","city_id":"3333","district_id":"33333","official_email":"3333","official_tel":"3333","address":"3333","postal_code":"3333","contact":"3333","contact_mobile":"333","contact_tel":"333","remark":"3333"};
*/
}]);

