'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:ClassManagerCtrl
 * @description
 * # ClassManagerCtrl
 * Controller of the webApp
 */
Site.controller('ClassManagerCtrl', ['$scope', 'ClassManagerSrv', function ($scope, ClassManagerSrv) {
  console.log("ClassManagerCtrl");

  $scope.addClass = function () {
    var strData = $('#addForm').serialize();
    var tmpArr = strData.split('&');
    var data = {};
    _.forEach(tmpArr, function (item, key) {
      var ele = item.split('=');
      if (ele && ele.length == 2) {
        var key = ele[0];
        var value = ele[1];
        if (value != '') {
          data[key] = value;
        }
      }
    });
    var jsonData = JSON.stringify(data);

    ClassManagerSrv.addClass(jsonData)
      .then(function (res) {
        console.log(res);
      })
  };

}]);
