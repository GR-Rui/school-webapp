Site.factory('ClassManagerSrv', ['$http', 'ConfigConst', function ($http, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token

  return {

    addClass: function (data) {
      return $http
        .get(ConfigConst.urls.api + 'NewClass?info=' + data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }

}]);