Site.factory('ClassManagerSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    // insert
    insertClass: function (data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .post(ConfigConst.urls.api + 'NewClass?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update
    updateClass: function (id, data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .post(ConfigConst.urls.api + 'UpdateClass?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete
    deleteClass: function (id) {
      return $http
        .post(ConfigConst.urls.api + 'DeleteClassById?id=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one object by id
    getClassById: function (id) {
      return $http
        .get(ConfigConst.urls.api + 'GetClassById?id=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get Available Classes
    getAvailableClasses: function () {
      return $http
        .get(ConfigConst.urls.api + 'GetClassById?id=0', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get pagination objects
    getAllClasses: function (size, index) {
      return $http
        .get(ConfigConst.urls.api + 'GetClassPager/?pageIndex='+index+'&pageSize='+size, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get count
    getClassCount: function () {
      return $http
        .get(ConfigConst.urls.api + 'GetClassCount', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
