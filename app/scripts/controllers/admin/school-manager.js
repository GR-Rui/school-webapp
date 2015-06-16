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
        $scope.school = school[0];
      });
  }

  // create
  $scope.form = {};
  $scope.form.level = 'PRIMARY_SCHOOL';
  $scope.form.status = 'OPENED';
  $scope.create = function () {
    if ( !isValid() ) return;
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
    if ( !isValid() ) return;
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
  function getPageParams() {
    var params = $location.search();
    if (!_.isEmpty(params)) {
      $scope.pageIndex = parseInt(params.pageIndex, 10);
    } else {
      $scope.pageIndex = 1;
    }
  }

  SchoolManagerSrv.getSchoolCount()
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
      $location.path('/admin/' + userId + '/school-list');
      $location.search('pageIndex', index - 1);
      $scope.pageIndex = index - 1;
      getAllSchools();
      $route.reload();
    }
  };

  $scope.nextPage = function () {
//    getPageParams();
    var index = $scope.pageIndex;
    if (index >= $scope.pageNum) {
      return;
    } else {
      $location.path('/admin/' + userId + '/school-list');
      $location.search('pageIndex', index + 1);
      $scope.pageIndex = index + 1;
      getAllSchools();
      $route.reload();
    }
  };

  $scope.lastPage = function () {
    $scope.pageIndex = $scope.pageNum;
    $location.path('/admin/' + userId + '/school-list');
    $location.search('pageIndex', $scope.pageIndex);
    getAllSchools();
    $route.reload();
  };

  $scope.firstPage = function () {
    $scope.pageIndex = 1;
    $location.path('/admin/' + userId + '/school-list');
    $location.search('pageIndex', $scope.pageIndex);
    getAllSchools();
    $route.reload();
  };

  if (path.indexOf('school-list') > 0) {
    getPageParams();
    getAllSchools();
  }

  function isValid() {
    var obj;
    var isPassed = true;
    if($scope.school) {
      obj = $scope.school;
    }else{
      obj = $scope.form;
    }
    if(typeof obj.name == 'undefined' || obj.name.length == 0) {
      $('#name').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.edu_no == 'undefined' || obj.edu_no.length == 0) {
      $('#edu_no').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.code == 'undefined' || obj.code.length == 0) {
      $('#code').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.principal == 'undefined' || obj.principal.length == 0) {
      $('#principal').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.province_id == 'undefined' || obj.province_id.length == 0) {
      $('#province_id').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.city_id == 'undefined' || obj.city_id.length == 0) {
      $('#city_id').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.district_id == 'undefined' || obj.district_id.length == 0) {
      $('#district_id').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.official_email == 'undefined' || obj.official_email.length == 0) {
      $('#official_email').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.official_tel == 'undefined' || obj.official_tel.length == 0) {
      $('#official_tel').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.address == 'undefined' || obj.address.length == 0) {
      $('#address').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(obj.name.length > 0 && !/^[\u0391-\uFFE5]+$/.test(obj.name)) {
      $('#name').siblings('span.error-msg').html('名字只能包含汉字');
      isPassed = false;
      return isPassed;
    }
    if(obj.edu_no.length > 0 && !/^[A-Za-z0-9]+$/.test(obj.edu_no)) {
      $('#edu_no').siblings('span.error-msg').html('编号只能包含字母和数值');
      isPassed = false;
      return isPassed;
    }
    if(obj.code.length > 0 && !/^[A-Za-z0-9]+$/.test(obj.code)) {
      $('#code').siblings('span.error-msg').html('代码只能包含字母和数值');
      isPassed = false;
      return isPassed;
    }
    if(obj.province_id.length > 0 && !/^[0-9]+$/.test(obj.province_id)) {
      $('#province_id').siblings('span.error-msg').html('省份ID只能包含数值');
      isPassed = false;
      return isPassed;
    }
    if(obj.city_id.length > 0 && !/^[0-9]+$/.test(obj.city_id)) {
      $('#city_id').siblings('span.error-msg').html('城市ID只能包含数值');
      isPassed = false;
      return isPassed;
    }
    if(obj.district_id.length > 0 && !/^[0-9]+$/.test(obj.district_id)) {
      $('#district_id').siblings('span.error-msg').html('区县ID只能包含数值');
      isPassed = false;
      return isPassed;
    }
    if(obj.official_email.length > 0 && !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(obj.official_email)) {
      $('#official_email').siblings('span.error-msg').html('email格式不合法');
      isPassed = false;
      return isPassed;
    }
    if(obj.official_tel.length > 0 && !/\d{3}-\d{8}|\d{4}-\d{7}/.test(obj.official_tel)) {
      $('#official_tel').siblings('span.error-msg').html('固定电话格式不合法');
      isPassed = false;
      return isPassed;
    }
    if(obj.postal_code.length > 0 && !/^[\d]{6}$/.test(obj.postal_code)) {
      $('#postal_code').siblings('span.error-msg').html('邮编格式不合法');
      isPassed = false;
      return isPassed;
    }
    if(obj.contact_mobile && obj.contact_mobile.length > 0 && !/^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(obj.contact_mobile)) {
      $('#contact_mobile').siblings('span.error-msg').html('移动电话格式不合法');
      isPassed = false;
      return isPassed;
    }
    if(obj.contact_tel && obj.contact_tel.length > 0 && !/\d{3}-\d{8}|\d{4}-\d{7}/.test(obj.contact_tel)) {
      $('#contact_tel').siblings('span.error-msg').html('固定电话格式不合法');
      isPassed = false;
      return isPassed;
    }
    return isPassed;
  }
  $('form input').on('input', function(){
    $(this).siblings('span.error-msg').html('');
  });

  ///////////// test data
  /*$scope.schools = [
    {id: 1, "name":"333","edu_no":"333","code":"333","level":"PRIMARY_SCHOOL","status":"OPENED","principal":"333","province_id":"333","city_id":"3333","district_id":"33333","official_email":"3333","official_tel":"3333","address":"3333","postal_code":"3333","contact":"3333","contact_mobile":"333","contact_tel":"333","remark":"3333"},
    {id: 2, "name":"333","edu_no":"333","code":"333","level":"PRIMARY_SCHOOL","status":"OPENED","principal":"333","province_id":"333","city_id":"3333","district_id":"33333","official_email":"3333","official_tel":"3333","address":"3333","postal_code":"3333","contact":"3333","contact_mobile":"333","contact_tel":"333","remark":"3333"},
    {id: 3, "name":"333","edu_no":"333","code":"333","level":"PRIMARY_SCHOOL","status":"OPENED","principal":"333","province_id":"333","city_id":"3333","district_id":"33333","official_email":"3333","official_tel":"3333","address":"3333","postal_code":"3333","contact":"3333","contact_mobile":"333","contact_tel":"333","remark":"3333"}
  ];
  $scope.school = {id: 3, "name":"333","edu_no":"333","code":"333","level":"PRIMARY_SCHOOL","status":"OPENED","principal":"333","province_id":"333","city_id":"3333","district_id":"33333","official_email":"3333","official_tel":"3333","address":"3333","postal_code":"3333","contact":"3333","contact_mobile":"333","contact_tel":"333","remark":"3333"};
*/
}]);

