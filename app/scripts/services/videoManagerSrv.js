Site.factory('VideoManagerSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    // insert
    insertVideo: function (data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .post(ConfigConst.urls.api + 'NewVideo?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update
    updateVideo: function (id, data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .post(ConfigConst.urls.api + 'UpdateVideo?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete
    deleteVideo: function (id) {
      return $http
        .post(ConfigConst.urls.api + 'DeleteVideoById?id=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one object by id
    getVideoById: function (id) {
      return $http
        .get(ConfigConst.urls.api + 'GetVideoById?id=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get pagination objects
    getAllVideos: function (size, index) {
      return $http
        .get(ConfigConst.urls.api + 'GetVideoPager/?pageIndex='+index+'&pageSize='+size, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get count
    getVideoCount: function () {
      return $http
        .get(ConfigConst.urls.api + 'GetVideoCount', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
