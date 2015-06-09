Site.factory('TeacherClassManagerSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    // insert
    insertTeacherClass: function (data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .post(ConfigConst.urls.api + 'NewTeacherClass?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update
    updateTeacherClass: function (id, data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .put(ConfigConst.urls.api + 'UpdateTeacherClass?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete
    deleteTeacherClass: function (id) {
      return $http
        .delete(ConfigConst.urls.api + 'DeleteTeacherClassById?id=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one object by id
    getTeacherClassById: function (id) {
      return $http
        .get(ConfigConst.urls.api + 'GetTeacherClassById?id=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get Available Classes
    getAvailableTeacherClasses: function () {
      return $http
        .get(ConfigConst.urls.api + 'GetTeacherClassById?id=0', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get pagination objects
    getAllTeacherClasses: function (size, index) {
      return $http
        .get(ConfigConst.urls.api + 'GetTeacherClassPager/?pageIndex='+index+'&pageSize='+size, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get count
    getTeacherClassCount: function () {
      return $http
        .get(ConfigConst.urls.api + 'GetTeacherClassCount', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
