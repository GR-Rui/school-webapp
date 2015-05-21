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
  var params = $location.search();
  if (!_.isEmpty(params)) {
    $scope.pageIndex = params.pageIndex;
  } else {
    $scope.pageIndex = 1;
  }

  TextbookSectionManagerSrv.getTextbookSectionCount()
    .then(function (res) {
      $scope.count = res;
      $scope.pageNum = Math.ceil($scope.count/$scope.pageSize);
    });

  $scope.prePage = function () {
    var index = $scope.pageIndex;
    if (index <= 1) {
      return;
    } else {
      $location.path('/admin/' + userId + '/textbook-section-list');
      $location.search('pageIndex', index - 1);
      $route.reload();
    }
  };

  $scope.nextPage = function () {
    var index = $scope.pageIndex;
    if (index >= $scope.pageNum) {
      return;
    } else {
      $location.path('/admin/' + userId + '/textbook-section-list');
      $location.search('pageIndex', index + 1);
      $route.reload();
    }
  };

  if (path.indexOf('textbook-section-list') > 0) {
    getAllTextbookSections();
  }

  ///////////// test data
  /*$scope.textbookSections = [
    {id:1, "textbook_id":"1","name":"111","pre_section_id":"111","remark":"1111"},
    {id:2, "textbook_id":"1","name":"111","pre_section_id":"111","remark":"1111"},
    {id:3, "textbook_id":"1","name":"111","pre_section_id":"111","remark":"1111"}
  ];
  $scope.textbookSection = {id:3, "textbook_id":"1","name":"111","pre_section_id":"111","remark":"1111"};
*/
}]);

