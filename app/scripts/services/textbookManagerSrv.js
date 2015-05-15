Site.factory('TextbookManagerSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    // insert
    insertTextbook: function (data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .post(ConfigConst.urls.api + 'NewTextbook?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update
    updateTextbook: function (id, data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .put(ConfigConst.urls.api + 'UpdateTextbook?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete
    deleteTextbook: function (id) {
      return $http
        .delete(ConfigConst.urls.api + 'deleteTextbook?info=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one object by id
    getTextbookById: function (id) {
      return $http
        .get(ConfigConst.urls.api + 'OneTextbook?info=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all objects
    getAllTextbooks: function () {
      return $http
        .get(ConfigConst.urls.api + 'AllTextbooks?info=', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
