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
        .post(ConfigConst.urls.api + 'UpdateSchool?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete
    deleteSchool: function (id) {
      return $http
        .post(ConfigConst.urls.api + 'DeleteSchoolById?id=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one object by id
    getSchoolById: function (id) {
      return $http
        .get(ConfigConst.urls.api + 'GetSchoolById?id=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get Available Schools
    getAvailableSchools: function () {
      return $http
        .get(ConfigConst.urls.api + 'GetSchoolById?id=0', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get pagination objects
    getAllSchools: function (size, index) {
      return $http
        .get(ConfigConst.urls.api + 'GetSchoolPager/?pageIndex='+index+'&pageSize='+size, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get count
    getSchoolCount: function () {
      return $http
        .get(ConfigConst.urls.api + 'GetSchoolCount', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
