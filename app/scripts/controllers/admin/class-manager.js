'use strict';

/**
 * @ngdoc function
 * @name cimWebappApp.controller:ClassManagerCtrl
 * @description
 * # ClassManagerCtrl
 * Controller of the cimWebappApp
 */
Site.controller('ClassManagerCtrl', ['$scope', 'ClassManagerSrv', function ($scope, ClassManagerSrv) {
  console.log("ClassManagerCtrl");

  $scope.addClass = function () {
    var strData = $('#addForm').serialize();
    var tmpArr = strData.split('&');
    var data = {};
    _.forEach(tmpArr, function(item, key){
      var ele = item.split('=');
      var key = ele[0];
      var value = ele[1];
      data[key] = value;
    });
//    var data = {
//      name: $scope.form.name,
//      school_id: $scope.form.school,
//      school_code: $scope.form.code,
//      grade: $scope.form.grade,
//      enter_year: $scope.form.year,
//      charge_teacher: $scope.form.charge,
//      contact_mobile: $scope.form.contact,
//      remark: $scope.form.remark
//
//    };
    var jsonData = JSON.stringify(data);

    //formData = encodeURIComponent(formData);
    ClassManagerSrv.addClass(jsonData)
      .then(function (res) {
        console.log(res);
      })
  };

}]);
