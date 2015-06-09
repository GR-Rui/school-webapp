Site.factory('TeacherTextbookManagerSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    // insert
    insertTeacherTextbook: function (data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .post(ConfigConst.urls.api + 'NewTeacherTextbook?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update
    updateTeacherTextbook: function (id, data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .put(ConfigConst.urls.api + 'UpdateTeacherTextbook?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete
    deleteTeacherTextbook: function (id) {
      return $http
        .delete(ConfigConst.urls.api + 'DeleteTeacherTextbookById?id=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one object by id
    getTeacherTextbookById: function (id) {
      return $http
        .get(ConfigConst.urls.api + 'GetTeacherTextbookById?id=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get Available Textbooks
    getAvailableTeacherTextbooks: function () {
      return $http
        .get(ConfigConst.urls.api + 'GetTeacherTextbookById?id=0', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get pagination objects
    getAllTeacherTextbooks: function (size, index) {
      return $http
        .get(ConfigConst.urls.api + 'GetTeacherTextbookPager/?pageIndex='+index+'&pageSize='+size, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get count
    getTeacherTextbookCount: function () {
      return $http
        .get(ConfigConst.urls.api + 'GetTeacherTextbookCount', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
