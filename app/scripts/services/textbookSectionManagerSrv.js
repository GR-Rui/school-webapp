Site.factory('TextbookSectionManagerSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    // insert
    insertTextbookSection: function (data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .post(ConfigConst.urls.api + 'NewTextbookSection?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update
    updateTextbookSection: function (id, data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .put(ConfigConst.urls.api + 'UpdateTextbookSection?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete
    deleteTextbookSection: function (id) {
      return $http
        .delete(ConfigConst.urls.api + 'deleteTextbookSection?info=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one object by id
    getTextbookSectionById: function (id) {
      return $http
        .get(ConfigConst.urls.api + 'OneTextbookSection?info=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all objects
    getAllTextbookSections: function () {
      return $http
        .get(ConfigConst.urls.api + 'AllTextbookSections?info=', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
