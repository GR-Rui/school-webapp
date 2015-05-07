'use strict';

/**
 * @ngdoc function
 * @name cimWebappApp.controller:VideoManagerCtrl
 * @description
 * # VideoManagerCtrl
 * Controller of the cimWebappApp
 */
Site.controller('VideoManagerCtrl', ['$scope', '$http','$filter', '$window', function ($scope, $http, $filter, $window) {

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

  flowplayer("player", "scripts/libs/flowplayer-3.2.18.swf");

}]);