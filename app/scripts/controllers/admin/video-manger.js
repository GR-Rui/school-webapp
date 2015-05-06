'use strict';

/**
 * @ngdoc function
 * @name cimWebappApp.controller:VideoManagerCtrl
 * @description
 * # VideoManagerCtrl
 * Controller of the cimWebappApp
 */
Site.controller('VideoManagerCtrl', ['$scope', '$http','$filter', '$window', function ($scope, $http, $filter, $window) {

}])
  .controller('DemoFileUploadController', [
    '$scope', '$http', '$filter', '$window',
    function ($scope, $http) {
      var url = 'upload.php';
      $scope.options = {
        url: url
      };
      var isOnGitHub = false;
      if (!isOnGitHub) {
        $scope.loadingFiles = true;
        $http.get(url)
          .then(
          function (response) {
            $scope.loadingFiles = false;
            $scope.queue = response.data.files || [];
          },
          function () {
            $scope.loadingFiles = false;
          }
        );
      }
    }
  ])

  .controller('FileDestroyController', [
    '$scope', '$http',
    function ($scope, $http) {
      var file = $scope.file,
        state;
      if (file.url) {
        file.$state = function () {
          return state;
        };
        file.$destroy = function () {
          state = 'pending';
          return $http({
            url: file.deleteUrl,
            method: file.deleteType
          }).then(
            function () {
              state = 'resolved';
              $scope.clear(file);
            },
            function () {
              state = 'rejected';
            }
          );
        };
      } else if (!file.$cancel && !file._index) {
        file.$cancel = function () {
          $scope.clear(file);
        };
      }
    }
  ]);
