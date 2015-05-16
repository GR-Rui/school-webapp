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
        if (res.ack == 'success') {
          var object = res.data;
//          object.createDate = moment().format('LLLL');
          $scope.textbookSection = object;
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
    TextbookSectionManagerSrv.insertTextbookSection(object)
      .then(function (res) {
        if (res.ack == 'success') {
          var tid = res.data.id;
          $state.go('super-admin.textbook-section-detail', {id: userId, tsid: tsid});
        }
      });
  };

  // update
  $scope.update = function (tsid) {
    var object = _.pick($scope.textbook, ['name', 'description']);
    TextbookSectionManagerSrv.updateTextbookSection(tsid, object)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.textbook-section-detail', {id: userId, tsid: tsid});
        }
      });
  };

  // Delete
  $scope.delete = function (tsid) {
    TextbookSectionManagerSrv.deleteTextbookSection(tsid)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.textbook-section-list', {id: userId});
        }
      });
  };

  function getAllTextbookSections() {
    TextbookSectionManagerSrv.getAllTextbookSections()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.textbookSections = res.data;
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
  $scope.textbookSections = [
    {id:1, "textbook_id":"1","name":"111","pre_section_id":"111","remark":"1111"},
    {id:2, "textbook_id":"1","name":"111","pre_section_id":"111","remark":"1111"},
    {id:3, "textbook_id":"1","name":"111","pre_section_id":"111","remark":"1111"}
  ];
  $scope.textbookSection = {id:3, "textbook_id":"1","name":"111","pre_section_id":"111","remark":"1111"};

}]);

