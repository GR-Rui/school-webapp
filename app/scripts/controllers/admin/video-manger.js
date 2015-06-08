'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:VideoManagerCtrl
 * @description
 * # VideoManagerCtrl
 * Controller of the webApp
 */
Site.controller('VideoManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$route', '$q', 'VideoManagerSrv', function ($scope, $state, $location, $stateParams, $route, $q, VideoManagerSrv) {
  console.log('VideoManagerCtrl');

  var vid = $stateParams.vid;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('video-list') > 0) {
    getAllVideos();
  }

  //
  if (vid) {
    VideoManagerSrv.getVideoById(vid)
      .then(function (res) {
        if (res.ack == 'success') {
          var temp = JSON.parse(res);
          var obj = JSON.parse(temp);
          $scope.video = obj[0];
        }
      });
  }

  // create
  $scope.form = {};
  $scope.form.teacher_id = 1;
  $scope.form.status = 'OPENED';
  $scope.create = function () {
    var object = $scope.form;
    VideoManagerSrv.insertVideo(object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.video-detail', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // update
  $scope.update = function (vid) {
    var object = $scope.video;
    VideoManagerSrv.update(vid, object)
      .then(function (res) {
        if (res=='true') {
          $state.go('super-admin.video-detail', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // Delete
  $scope.delete = function (vid) {
    VideoManagerSrv.deleteClass(vid)
      .then(function (res) {
        if (res=='true') {
          $state.go('super-admin.video-list', {id: userId});
        } else {
          alert('删除失败！');
        }
      });
  };

  function getAllVideos() {
    VideoManagerSrv.getAllVideos($scope.pageSize, $scope.pageIndex)
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.videos = JSON.parse(temp);
      });
  }

  /*
   ** pagination
   */
  function getPageParams() {
    var params = $location.search();
    if (!_.isEmpty(params)) {
      $scope.pageIndex = parseInt(params.pageIndex, 10);
    } else {
      $scope.pageIndex = 1;
    }
  }

  VideoManagerSrv.getVideoCount()
    .then(function (res) {
      $scope.count = res;
      $scope.pageNum = Math.ceil($scope.count/$scope.pageSize);
    });

  $scope.prePage = function () {
    getPageParams();
    var index = $scope.pageIndex;
    if (index <= 1) {
      return;
    } else {
      $location.path('/admin/' + userId + '/video-list');
      $location.search('pageIndex', index - 1);
      getAllVideos();
      $route.reload();
    }
  };

  $scope.nextPage = function () {
    getPageParams();
    var index = $scope.pageIndex;
    if (index >= $scope.pageNum) {
      return;
    } else {
      $location.path('/admin/' + userId + '/video-list');
      $location.search('pageIndex', index + 1);
      getAllVideos();
      $route.reload();
    }
  };

  if (path.indexOf('video-list') > 0) {
    getPageParams();
    getAllVideos();
  }

  // test date
  /*$scope.videos = [
    {id: 1, "video_name": "1111", "mime": "1111", "location": "11111", "url": "1111", "tudouUrl": "1111", "duration": "1111", "cover_mime": "111", "cover_location": "111", "cover_url": "1111", "cover_size": "1111", "cover_height": "11111", "cover_width": "1111"},
    {id: 2, "video_name": "1111", "mime": "1111", "location": "11111", "url": "1111", "tudouUrl": "1111", "duration": "1111", "cover_mime": "111", "cover_location": "111", "cover_url": "1111", "cover_size": "1111", "cover_height": "11111", "cover_width": "1111"},
    {id: 3, "video_name": "1111", "mime": "1111", "location": "11111", "url": "1111", "tudouUrl": "1111", "duration": "1111", "cover_mime": "111", "cover_location": "111", "cover_url": "1111", "cover_size": "1111", "cover_height": "11111", "cover_width": "1111"}
  ];
  $scope.video = {
    id: 1, "video_name": "1111", "status":"OPENED",  "mime": "1111", "location": "11111", "url": "1111", "tudouUrl": "1111", "duration": "1111", "cover_mime": "111", "cover_location": "111", "cover_url": "1111", "cover_size": "1111", "cover_height": "11111", "cover_width": "1111", "teacher_id":1
  }*/

}]);