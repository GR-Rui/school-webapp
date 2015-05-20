'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:TextbookManagerCtrl
 * @description
 * # TextbookManagerCtrl
 * Controller of the webApp
 */
Site.controller('TextbookManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'TextbookManagerSrv', function ($scope, $state, $location, $stateParams, $q, TextbookManagerSrv) {
  console.log('TextbookManagerCtrl');

  var tid = $stateParams.tid;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('textbook-list') > 0) {
    getAllTextbooks();
  }

  //
  if (tid) {
    TextbookManagerSrv.getTextbookById(tid)
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.textbook = JSON.parse(temp);
      });
  }

  // create
  $scope.create = function () {
    var object = $scope.form;
//    object.operId = userId;
    TextbookManagerSrv.insertTextbook(object)
      .then(function (res) {
        if (res) {
          $state.go('super-admin.textbook-list', {id: userId});
        }
      });
  };

  // update
  $scope.update = function (tid) {
//    var object = _.pick($scope.textbook, ['name', 'description']);
    var object = $scope.textbook;
      TextbookManagerSrv.updateTextbook(tid, object)
      .then(function (res) {
        if (res) {
          $state.go('super-admin.textbook-list', {id: userId});
        }
      });
  };

  // Delete
  $scope.delete = function (tid) {
    TextbookManagerSrv.deleteTextbook(tid)
      .then(function (res) {
        if (res) {
          $state.go('super-admin.textbook-list', {id: userId});
        }
      });
  };

  function getAllTextbooks() {
    TextbookManagerSrv.getAllTextbooks()
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.textbooks = JSON.parse(temp);
      });
  }

  ///////////// test data
  /*$scope.textbooks = [
    {id:1, "name":"111","press":"111","publishing_date":"111","publishing_edtion":"111","printing_batch":"111","isbn":"1111","level":"111111","version":"11","grade":"11","discipline":"111","term":"111","remark":"1111"},
    {id:2, "name":"111","press":"111","publishing_date":"111","publishing_edtion":"111","printing_batch":"111","isbn":"1111","level":"111111","version":"11","grade":"11","discipline":"111","term":"111","remark":"1111"},
    {id:3, "name":"111","press":"111","publishing_date":"111","publishing_edtion":"111","printing_batch":"111","isbn":"1111","level":"111111","version":"11","grade":"11","discipline":"111","term":"111","remark":"1111"}
  ];
  $scope.textbook = {id:3, "name":"111","press":"111","publishing_date":"111","publishing_edtion":"111","printing_batch":"111","isbn":"1111","level":"111111","version":"11","grade":"11","discipline":"111","term":"111","remark":"1111"};
*/
}]);

