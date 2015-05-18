'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:VideoManagerCtrl
 * @description
 * # VideoManagerCtrl
 * Controller of the webApp
 */
Site.controller('VideoManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'VideoManagerSrv', function ($scope, $state, $location, $stateParams, $q, VideoManagerSrv) {
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
          var object = res.data;
//          object.createDate = moment().format('LLLL');
          $scope.video = object;
        }
      });
  }

  /*
   $scope.checkAll = function () {
   $scope.selectedAll = !$scope.selectedAll;
   angular.forEach($scope.classes, function (item) {
   item.selected = $scope.selectedAll;
   });
   };

   $scope.deleteItems = function () {
   var promiseArray = [];
   var classes = _.filter($scope.classes, {'selected': true});
   _.forEach(classes, function (item) {
   promiseArray.push(ClassManagerSrv.deleteClass(item.id));
   });
   $q.all(promiseArray)
   .then(function (responseArray) {
   if (responseArray.length == classes.length) {
   $scope.classes = _.xor($scope.classes, classes);
   }
   })
   };*/

  // create
  $scope.create = function () {
    var object = $scope.form;
//    object.operId = userId;
    VideoManagerSrv.insertVideo(object)
      .then(function (res) {
        if (res.ack == 'success') {
          var vid = res.data.id;
          $state.go('super-admin.video-detail', {id: userId, cid: vid});
        }
      });
  };

  // update
  $scope.update = function (vid) {
    var object = _.pick($scope.class, ['name', 'description']);
    VideoManagerSrv.update(vid, object)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.video-detail', {id: userId, vid: vid});
        }
      });
  };

  // Delete
  $scope.delete = function (vid) {
    VideoManagerSrv.deleteClass(vid)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.video-list', {id: userId});
        }
      });
  };

  function getAllVideos() {
    VideoManagerSrv.getAllVideos()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.videos = res.data;
          // default sort column
          $scope.getters = {
            name: function (value) {
              //this will sort by the length of the first name string
              return value.name.length;
            }
          };
        }//if
      });
  };

  var uploadObj = $("#fileUploadPost").uploadFile({
    url: "upload.php",
    allowedTypes: "png,gif,jpg,jpeg",
    multiple: true,
    autoSubmit: false,
    fileName: "file",
    maxFileSize: 1024 * 1024 * 20,
    maxFileCount: 1,
    showProgress: true,
    showFileCounter: true,
    showStatusAfterSuccess: true,
    uploadButtonClass: "ajax-file-upload-blue",
    onSubmit: function (files) {
      $("#eventsmessage").html($("#eventsmessage").html() + "<br/>Submitting:" + JSON.stringify(files));
    },
    onSuccess: function (files, data, xhr) {

    },
    onError: function (files, status, errMsg) {
      $("#eventsmessage").html($("#eventsmessage").html() + "<br/>Error for: " + JSON.stringify(files));
    }
  });

  $("#startUploadPost").on('click', function () {
    uploadObj.startUpload();
  });

  // test date
  $scope.videos = [
    {id: 1, "video_name": "1111", "mime": "1111", "location": "11111", "url": "1111", "tudouUrl": "1111", "duration": "1111", "cover_mime": "111", "cover_location": "111", "cover_url": "1111", "cover_size": "1111", "cover_height": "11111", "cover_width": "1111"},
    {id: 2, "video_name": "1111", "mime": "1111", "location": "11111", "url": "1111", "tudouUrl": "1111", "duration": "1111", "cover_mime": "111", "cover_location": "111", "cover_url": "1111", "cover_size": "1111", "cover_height": "11111", "cover_width": "1111"},
    {id: 3, "video_name": "1111", "mime": "1111", "location": "11111", "url": "1111", "tudouUrl": "1111", "duration": "1111", "cover_mime": "111", "cover_location": "111", "cover_url": "1111", "cover_size": "1111", "cover_height": "11111", "cover_width": "1111"}
  ];
  $scope.video = {
    id: 1, "video_name": "1111", "mime": "1111", "location": "11111", "url": "1111", "tudouUrl": "1111", "duration": "1111", "cover_mime": "111", "cover_location": "111", "cover_url": "1111", "cover_size": "1111", "cover_height": "11111", "cover_width": "1111"
  }

}]);