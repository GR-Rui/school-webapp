'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:TextbookSectionManagerCtrl
 * @description
 * # TextbookSectionManagerCtrl
 * Controller of the webApp
 */
Site.controller('TextbookSectionManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'TextbookSectionManagerSrv', '$route', function ($scope, $state, $location, $stateParams, $q, TextbookSectionManagerSrv, $route) {
  console.log('TextbookSectionManagerCtrl');

  var tsid = $stateParams.tsid;
  var path = $location.path();
  var userId = $scope.userData.id;

  //
  if (tsid) {
    TextbookSectionManagerSrv.getTextbookSectionById(tsid)
      .then(function (res) {
        var temp = JSON.parse(res);
        var textbookSection = JSON.parse(temp);
        $scope.textbookSection = textbookSection[0];
      });
  }

  // create
  $scope.form = {};
  $scope.form.textbook_id = 1;
  $scope.form.pre_section_id = 1;
  $scope.create = function () {
    if ( !isValid() ) return;
    var object = $scope.form;
//    object.operId = userId;
    TextbookSectionManagerSrv.insertTextbookSection(object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.textbook-section-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // update
  $scope.update = function (tsid) {
//    var object = _.pick($scope.textbook, ['name', 'description']);
    if ( !isValid() ) return;
    var object = $scope.textbook;
      TextbookSectionManagerSrv.updateTextbookSection(tsid, object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.textbook-section-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // Delete
  $scope.delete = function (tsid) {
    TextbookSectionManagerSrv.deleteTextbookSection(tsid)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.textbook-section-list', {id: userId});
        } else {
          alert('删除失败！');
        }
      });
  };

  function getAllTextbookSections() {
    TextbookSectionManagerSrv.getAllTextbookSections($scope.pageSize, $scope.pageIndex)
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.textbookSections = JSON.parse(temp);
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

  TextbookSectionManagerSrv.getTextbookSectionCount()
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
      $location.path('/admin/' + userId + '/textbook-section-list');
      $location.search('pageIndex', index - 1);
      $scope.pageIndex = index - 1;
      getAllTextbookSections();
      $route.reload();
    }
  };

  $scope.nextPage = function () {
//    getPageParams();
    var index = $scope.pageIndex;
    if (index >= $scope.pageNum) {
      return;
    } else {
      $location.path('/admin/' + userId + '/textbook-section-list');
      $location.search('pageIndex', index + 1);
      $scope.pageIndex = index + 1;
      getAllTextbookSections();
      $route.reload();
    }
  };

  $scope.lastPage = function () {
    $scope.pageIndex = $scope.pageNum;
    $location.path('/admin/' + userId + '/textbook-section-list');
    $location.search('pageIndex', $scope.pageIndex);
    getAllTextbookSections();
    $route.reload();
  };

  $scope.firstPage = function () {
    $scope.pageIndex = 1;
    $location.path('/admin/' + userId + '/textbook-section-list');
    $location.search('pageIndex', $scope.pageIndex);
    getAllTextbookSections();
    $route.reload();
  };

  if (path.indexOf('textbook-section-list') > 0) {
    getPageParams();
    getAllTextbookSections();
  }

  function isValid() {
    var obj;
    var isPassed = true;
    if($scope.textbookSection) {
      obj = $scope.textbookSection;
    }else{
      obj = $scope.form;
    }
    if(typeof obj.name == 'undefined' || obj.name.length == 0) {
      $('#name').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    return isPassed;
  }
  $('form input').on('input', function(){
    $(this).siblings('span.error-msg').html('');
  });

  ///////////// test data
  /*$scope.textbookSections = [
    {id:1, "textbook_id":"1","name":"111","pre_section_id":"111","remark":"1111"},
    {id:2, "textbook_id":"1","name":"111","pre_section_id":"111","remark":"1111"},
    {id:3, "textbook_id":"1","name":"111","pre_section_id":"111","remark":"1111"}
  ];
  $scope.textbookSection = {id:3, "textbook_id":"1","name":"111","pre_section_id":"111","remark":"1111"};
*/
}]);

