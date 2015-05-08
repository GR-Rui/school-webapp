'use strict';

/**
 * @ngdoc function
 * @name cimWebappApp.controller:VideoManagerCtrl
 * @description
 * # VideoManagerCtrl
 * Controller of the cimWebappApp
 */
Site.controller('VideoManagerCtrl', ['$scope', '$http','$filter', '$window', function ($scope, $http, $filter, $window) {

  $scope.shareVideos = [
    {id: 1, name: '五单元练习第3题', type: 'mp4', dataTime: '2014-05-04 17:24:59'},
    {id: 2, name: '五单元练习第3题', type: 'mp4', dataTime: '2014-05-04 17:24:59'},
    {id: 3, name: '五单元练习第3题', type: 'mp4', dataTime: '2014-05-04 17:24:59'},
    {id: 4, name: '五单元练习第3题', type: 'mp4', dataTime: '2014-05-04 17:24:59'},
    {id: 4, name: '五单元练习第3题', type: 'mp4', dataTime: '2014-05-04 17:24:59'},
    {id: 4, name: '五单元练习第3题', type: 'mp4', dataTime: '2014-05-04 17:24:59'}
  ];

  var uploadObj = $("#fileUpload").uploadFile({
    url : "upload.php",
    allowedTypes : "png,gif,jpg,jpeg,mp4,wmv",
    multiple : true,
    autoSubmit : false,
    fileName : "file",
    maxFileSize : 1024 * 1024 * 200,
    maxFileCount : 2,
    showProgress : true,
    showFileCounter : true,
    showStatusAfterSuccess : true,
    uploadButtonClass : "ajax-file-upload-blue",
    onSubmit:function(files) {
      $("#eventsmessage").html($("#eventsmessage").html()+"<br/>Submitting:"+JSON.stringify(files));
    },
    onSuccess:function(files,data,xhr) {

    },
    onError: function(files,status,errMsg) {
      $("#eventsmessage").html($("#eventsmessage").html()+"<br/>Error for: "+JSON.stringify(files));
    }
  });

  $("#startUpload").on('click', function() {
    uploadObj.startUpload();
  });

}]);