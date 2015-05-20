'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:TextbookSectionManagerCtrl
 * @description
 * # TextbookSectionManagerCtrl
 * Controller of the webApp
 */
Site.controller('TextbookSectionManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'TextbookSectionManagerSrv', function ($scope, $state, $location, $stateParams, $q, TextbookSectionManagerSrv) {
  console.log('TextbookSectionManagerCtrl');

  var tsid = $stateParams.tsid;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('textbook-section-list') > 0) {
    getAllTextbookSections();
  }

  //
  if (tsid) {
    TextbookSectionManagerSrv.getTextbookSectionById(tsid)
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.textbookSection = JSON.parse(temp);
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
        if (res) {
          $state.go('super-admin.textbook-section-list', {id: userId});
        }
      });
  };

  // update
  $scope.update = function (tsid) {
//    var object = _.pick($scope.textbook, ['name', 'description']);
    var object = $scope.textbook;
      TextbookSectionManagerSrv.updateTextbookSection(tsid, object)
      .then(function (res) {
        if (res) {
          $state.go('super-admin.textbook-section-list', {id: userId});
        }
      });
  };

  // Delete
  $scope.delete = function (tsid) {
    TextbookSectionManagerSrv.deleteTextbookSection(tsid)
      .then(function (res) {
        if (res) {
          $state.go('super-admin.textbook-section-list', {id: userId});
        }
      });
  };

  function getAllTextbookSections() {
    TextbookSectionManagerSrv.getAllTextbookSections()
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.textbookSections = JSON.parse(temp);
      });
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

