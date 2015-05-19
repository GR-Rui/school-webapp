Site.factory('TeacherManagerSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    // insert
    insertTeacher: function (data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .post(ConfigConst.urls.api + 'NewTeacher?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update
    updateTeacher: function (id, data) {
      var jsonStr = JSON.stringify(data);
      return $http
        .put(ConfigConst.urls.api + 'UpdateTeacher?info=' + jsonStr, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete
    deleteTeacher: function (id) {
      return $http
        .delete(ConfigConst.urls.api + 'DeleteTeacherById?id=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one object by id
    getTeacherById: function (id) {
      return $http
        .get(ConfigConst.urls.api + 'GetTeacherPager?name=' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all objects
    getAllTeachers: function () {
      return $http
        .get(ConfigConst.urls.api + 'GetTeacherPager/?pageIndex=1&pageSize=100', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);