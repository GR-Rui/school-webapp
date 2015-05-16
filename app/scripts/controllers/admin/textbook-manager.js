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
        if (res.ack == 'success') {
          var object = res.data;
//          object.createDate = moment().format('LLLL');
          $scope.textbook = object;
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
    TextbookManagerSrv.insertTextbook(object)
      .then(function (res) {
        if (res.ack == 'success') {
          var tid = res.data.id;
          $state.go('super-admin.textbook-detail', {id: userId, tid: tid});
        }
      });
  };

  // update
  $scope.update = function (tid) {
    var object = _.pick($scope.textbook, ['name', 'description']);
    TextbookManagerSrv.updateTextbook(tid, object)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.textbook-detail', {id: userId, tid: tid});
        }
      });
  };

  // Delete
  $scope.delete = function (tid) {
    TextbookManagerSrv.deleteTextbook(tid)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.textbook-list', {id: userId});
        }
      });
  };

  function getAllTextbooks() {
    TextbookManagerSrv.getAllTextbooks()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.textbooks = res.data;
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
  $scope.textbooks = [
    {id:1, "name":"111","press":"111","publishing_date":"111","publishing_edtion":"111","printing_batch":"111","isbn":"1111","level":"111111","version":"11","grade":"11","discipline":"111","term":"111","remark":"1111"},
    {id:2, "name":"111","press":"111","publishing_date":"111","publishing_edtion":"111","printing_batch":"111","isbn":"1111","level":"111111","version":"11","grade":"11","discipline":"111","term":"111","remark":"1111"},
    {id:3, "name":"111","press":"111","publishing_date":"111","publishing_edtion":"111","printing_batch":"111","isbn":"1111","level":"111111","version":"11","grade":"11","discipline":"111","term":"111","remark":"1111"}
  ];
  $scope.textbook = {id:3, "name":"111","press":"111","publishing_date":"111","publishing_edtion":"111","printing_batch":"111","isbn":"1111","level":"111111","version":"11","grade":"11","discipline":"111","term":"111","remark":"1111"};

}]);

