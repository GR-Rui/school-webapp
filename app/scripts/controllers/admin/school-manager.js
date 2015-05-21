'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:SchoolManagerCtrl
 * @description
 * # SchoolManagerCtrl
 * Controller of the webApp
 */
Site.controller('SchoolManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'SchoolManagerSrv', '$route', function ($scope, $state, $location, $stateParams, $q, SchoolManagerSrv, $route) {
  console.log('SchoolManagerCtrl');

  var sid = $stateParams.sid;
  var path = $location.path();
  var userId = $scope.userData.id;

  //
  if (sid) {
    SchoolManagerSrv.getSchoolById(sid)
      .then(function (res) {
        var temp = JSON.parse(res);
        var school = JSON.parse(temp);
        $scope.teacher = school[0];
      });
  }

  // create
  $scope.create = function () {
    var object = $scope.form;
//    object.operId = userId;
    SchoolManagerSrv.insertSchool(object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.school-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // update
  $scope.update = function (sid) {
//    var object = _.pick($scope.school, ['name', 'description']);
    var object = $scope.school;
    SchoolManagerSrv.updateSchool(sid, object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.school-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // Delete
  $scope.delete = function (sid) {
    SchoolManagerSrv.deleteSchool(sid)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.school-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  function getAllSchools() {
    SchoolManagerSrv.getAllSchools($scope.pageSize, $scope.pageIndex)
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.schools = JSON.parse(temp);
      });
  }

  /*
   ** pagination
   */
  var params = $location.search();
  if (!_.isEmpty(params)) {
    $scope.pageIndex = params.pageIndex;
  } else {
    $scope.pageIndex = 1;
  }

  SchoolManagerSrv.getSchoolCount()
    .then(function (res) {
      $scope.count = res;
      $scope.pageNum = Math.ceil($scope.count/$scope.pageSize);
    });

  $scope.prePage = function () {
    var index = $scope.pageIndex;
    if (index <= 1) {
      return;
    } else {
      $location.path('/admin/' + userId + '/school-list');
      $location.search('pageIndex', index - 1);
      $route.reload();
    }
  };

  $scope.nextPage = function () {
    var index = $scope.pageIndex;
    if (index >= $scope.pageNum) {
      return;
    } else {
      $location.path('/admin/' + userId + '/school-list');
      $location.search('pageIndex', index + 1);
      $route.reload();
    }
  };

  if (path.indexOf('school-list') > 0) {
    getAllSchools();
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

