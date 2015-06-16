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
        var temp = JSON.parse(res);
        var obj = JSON.parse(temp);
        $scope.video = obj[0];
      });
  }

  // create
  $scope.form = {};
  $scope.form.teacher_id = 1;
  $scope.form.status = 'OPENED';
  $scope.create = function () {
    if ( !isValid() ) return;
    var object = $scope.form;
    VideoManagerSrv.insertVideo(object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.video-list', {id: userId});
        } else {
          alert('保存失败！');
        }
      });
  };

  // update
  $scope.update = function () {
    if ( !isValid() ) return;
    var object = $scope.video;
    VideoManagerSrv.updateVideo(vid, object)
      .then(function (res) {
        if (res=='true') {
          $state.go('admin.video-list', {id: userId});
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
          $state.go('admin.video-list', {id: userId});
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
//    getPageParams();
    var index = $scope.pageIndex;
    if (index <= 1) {
      return;
    } else {
      $location.path('/admin/' + userId + '/video-list');
      $location.search('pageIndex', index - 1);
      $scope.pageIndex = index - 1;
      getAllVideos();
      $route.reload();
    }
  };

  $scope.nextPage = function () {
//    getPageParams();
    var index = $scope.pageIndex;
    if (index >= $scope.pageNum) {
      return;
    } else {
      $location.path('/admin/' + userId + '/video-list');
      $location.search('pageIndex', index + 1);
      $scope.pageIndex = index + 1;
      getAllVideos();
      $route.reload();
    }
  };

  $scope.lastPage = function () {
    $scope.pageIndex = $scope.pageNum;
    $location.path('/admin/' + userId + '/video-list');
    $location.search('pageIndex', $scope.pageIndex);
    getAllVideos();
    $route.reload();
  };

  $scope.firstPage = function () {
    $scope.pageIndex = 1;
    $location.path('/admin/' + userId + '/video-list');
    $location.search('pageIndex', $scope.pageIndex);
    getAllVideos();
    $route.reload();
  };

  if (path.indexOf('video-list') > 0) {
    getPageParams();
    getAllVideos();
  }

  function isValid() {
    var obj;
    var isPassed = true;
    if($scope.video) {
      obj = $scope.video;
    }else{
      obj = $scope.form;
    }
    if(typeof obj.name == 'undefined' || obj.name.length == 0) {
      $('#name').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.mime == 'undefined' || obj.mime.length == 0) {
      $('#mime').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(obj.location==null || typeof obj.location == 'undefined' || obj.location.length == 0) {
      $('#location').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(obj.location==null || typeof obj.url == 'undefined' || obj.url.length == 0) {
      $('#url').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.external_url == 'undefined' || obj.external_url.length == 0) {
      $('#external_url').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.duration == 'undefined' || obj.duration.length == 0) {
      $('#duration').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.cover_mime == 'undefined' || obj.cover_mime.length == 0) {
      $('#cover_mime').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.cover_location == 'undefined' || obj.cover_location.length == 0) {
      $('#cover_location').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.cover_url == 'undefined' || obj.cover_url.length == 0) {
      $('#cover_url').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.cover_size == 'undefined' || obj.cover_size.length == 0) {
      $('#cover_size').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.cover_height == 'undefined' || obj.cover_height.length == 0) {
      $('#cover_height').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(typeof obj.cover_width == 'undefined' || obj.cover_width.length == 0) {
      $('#cover_width').siblings('span.error-msg').html('必填项');
      isPassed = false;
      return isPassed;
    }
    if(obj.duration.length > 0 && !/^\d+(\.\d+)?$/.test(obj.duration)) {
      $('#duration').siblings('span.error-msg').html('应当输入大于0的数值');
      isPassed = false;
      return isPassed;
    }
    if(obj.cover_size.length > 0 && !/^\d+(\.\d+)?$/.test(obj.cover_size)) {
      $('#cover_size').siblings('span.error-msg').html('应当输入大于0的数值');
      isPassed = false;
      return isPassed;
    }
    if(obj.cover_height.length > 0 && !/^\d+(\.\d+)?$/.test(obj.cover_height)) {
      $('#cover_height').siblings('span.error-msg').html('应当输入大于0的数值');
      isPassed = false;
      return isPassed;
    }
    if(obj.cover_width.length > 0 && !/^\d+(\.\d+)?$/.test(obj.cover_width)) {
      $('#cover_width').siblings('span.error-msg').html('应当输入大于0的数值');
      isPassed = false;
      return isPassed;
    }
    return isPassed;
  }
  $('form input').on('input', function(){
    $(this).siblings('span.error-msg').html('');
  });

  // test date
  /*$scope.videos = [
    {id: 1, "name": "1111", "mime": "1111", "location": "11111", "url": "1111", "tudouUrl": "1111", "duration": "1111", "cover_mime": "111", "cover_location": "111", "cover_url": "1111", "cover_size": "1111", "cover_height": "11111", "cover_width": "1111"},
    {id: 2, "name": "1111", "mime": "1111", "location": "11111", "url": "1111", "tudouUrl": "1111", "duration": "1111", "cover_mime": "111", "cover_location": "111", "cover_url": "1111", "cover_size": "1111", "cover_height": "11111", "cover_width": "1111"},
    {id: 3, "name": "1111", "mime": "1111", "location": "11111", "url": "1111", "tudouUrl": "1111", "duration": "1111", "cover_mime": "111", "cover_location": "111", "cover_url": "1111", "cover_size": "1111", "cover_height": "11111", "cover_width": "1111"}
  ];
  $scope.video = {
    id: 1, "name": "1111", "status":"OPENED",  "mime": "1111", "location": "11111", "url": "1111", "tudouUrl": "1111", "duration": "1111", "cover_mime": "111", "cover_location": "111", "cover_url": "1111", "cover_size": "1111", "cover_height": "11111", "cover_width": "1111", "teacher_id":1
  }
*/
}]);