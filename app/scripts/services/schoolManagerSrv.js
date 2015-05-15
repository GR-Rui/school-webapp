Site.factory('SchoolManagerSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    // insert
    insertSchool: function (data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .post(ConfigConst.urls.api + 'NewSchool?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update
    updateSchool: function (id, data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .put(ConfigConst.urls.api + 'UpdateSchool?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete
    deleteSchool: function (id) {
      return $http
        .delete(ConfigConst.urls.api + 'deleteSchool?info=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one object by id
    getSchoolById: function (id) {
      return $http
        .get(ConfigConst.urls.api + 'OneSchool?info=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all objects
    getAllSchools: function () {
      return $http
        .get(ConfigConst.urls.api + 'AllSchools?info=', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
