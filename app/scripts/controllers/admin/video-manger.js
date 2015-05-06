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
    allowedTypes : "xml,png",
    multiple : false,
    autoSubmit : false,
    fileName : "file",
    maxFileSize : 1024 * 1024 * 1,
    maxFileCount : 1,
    showProgress : true,
    showFileCounter : false,
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