'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:TextbookManagerCtrl
 * @description
 * # TextbookManagerCtrl
 * Controller of the webApp
 */
Site.controller('TextbookManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'TextbookManagerSrv', '$route', function ($scope, $state, $location, $stateParams, $q, TextbookManagerSrv, $route) {
  console.log('TextbookManagerCtrl');

  var tid = $stateParams.tid;
  var path = $location.path();
  var userId = $scope.userData.id;

  //
  if (tid) {
    TextbookManagerSrv.getTextbookById(tid)
      .then(function (res) {
        var temp = JSON.parse(res);
        var obj = JSON.parse(temp);
        $scope.textbook = obj[0];
      });
  }

  // create
  $scope.form = {};
  $scope.form.level = 'PRIMARY_SCHOOL';
  $scope.form.version = 'SUJIAO_VERSION';
  $scope.form.grade = 'GRADE_1';
  $scope.form.discipline = 'ENGLISH';
  $scope.form.status = 'OPENED';
  $scope.create = function () {
    if ( !isValid() ) return;
    var object = $scope.form;
//    object.operId = userId;
    TextbookManagerSrv.insertTextbook(object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.textbook-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // update
  $scope.update = function (tid) {
//    var object = _.pick($scope.textbook, ['name', 'description']);
    if ( !isValid() ) return;
    var object = $scope.textbook;
      TextbookManagerSrv.updateTextbook(tid, object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.textbook-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // Delete
  $scope.delete = function (tid) {
    TextbookManagerSrv.deleteTextbook(tid)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.textbook-list', {id: userId});
        } else {
          alert('删除失败！');
        }
      });
  };

  function getAllTextbooks() {
    TextbookManagerSrv.getAllTextbooks($scope.pageSize, $scope.pageIndex)
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.textbooks = JSON.parse(temp);
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

  TextbookManagerSrv.getTextbookCount()
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
      $location.path('/admin/' + userId + '/textbook-list');
      $location.search('pageIndex', index - 1);
      $scope.pageIndex = index - 1;
      getAllTextbooks();
      $route.reload();
    }
  };

  $scope.nextPage = function () {
//    getPageParams();
    var index = $scope.pageIndex;
    if (index >= $scope.pageNum) {
      return;
    } else {
      $location.path('/admin/' + userId + '/textbook-list');
      $location.search('pageIndex', index + 1);
      $scope.pageIndex = index + 1;
      getAllTextbooks();
      $route.reload();
    }
  };

  $scope.lastPage = function () {
    $scope.pageIndex = $scope.pageNum;
    $location.path('/admin/' + userId + '/textbook-list');
    $location.search('pageIndex', $scope.pageIndex);
    getAllTextbooks();
    $route.reload();
  };

  $scope.firstPage = function () {
    $scope.pageIndex = 1;
    $location.path('/admin/' + userId + '/textbook-list');
    $location.search('pageIndex', $scope.pageIndex);
    getAllTextbooks();
    $route.reload();
  };

  if (path.indexOf('textbook-list') > 0) {
    getPageParams();
    getAllTextbooks();
  }

  function isValid() {
    var obj;
    var isPassed = true;
    if($scope.textbook) {
      obj = $scope.textbook;
    }else{
      obj = $scope.form;
    }
    if(typeof obj.name == 'undefined' || obj.name.length == 0) {
      $('#name').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.term == 'undefined' || obj.term.length == 0) {
      $('#term').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    return isPassed;
  }
  $('form input').on('input', function(){
    $(this).siblings('span.error-msg').html('');
  });

  ///////////// test data
  /*$scope.textbooks = [
    {id:1, "name":"111","press":"111","publishing_date":"111","publishing_edtion":"111","printing_batch":"111","isbn":"1111","level":"PRIMARY_SCHOOL","version":"SUJIAO_VERSION","grade":"GRADE_ONE","discipline":"CHINESE","status":"OPENED","term":"111","remark":"1111"},
    {id:2, "name":"111","press":"111","publishing_date":"111","publishing_edtion":"111","printing_batch":"111","isbn":"1111","level":"PRIMARY_SCHOOL","version":"SUJIAO_VERSION","grade":"GRADE_ONE","discipline":"CHINESE","status":"OPENED","term":"111","remark":"1111"},
    {id:3, "name":"111","press":"111","publishing_date":"111","publishing_edtion":"111","printing_batch":"111","isbn":"1111","level":"PRIMARY_SCHOOL","version":"SUJIAO_VERSION","grade":"GRADE_ONE","discipline":"CHINESE","status":"OPENED","term":"111","remark":"1111"}
  ];
  $scope.textbook = {id:3, "name":"111","press":"111","publishing_date":"111","publishing_edtion":"111","printing_batch":"111","isbn":"1111","level":"PRIMARY_SCHOOL","version":"SUJIAO_VERSION","grade":"GRADE_ONE","discipline":"CHINESE","status":"OPENED","term":"111","remark":"1111"};
*/
}]);

