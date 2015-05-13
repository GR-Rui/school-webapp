'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:VideoHomeCtrl
 * @description
 * # VideoHomeCtrl
 * Controller of the webApp
 */
Site.controller('VideoHomeCtrl', ['$scope', '$sce', function ($scope, $sce) {

  $scope.shareVideos = [
    {id: 1, name: '五单元练习第3题', type: 'mp4', dataTime: '2014-05-04 17:24:59'},
    {id: 2, name: '五单元练习第3题', type: 'mp4', dataTime: '2014-05-04 17:24:59'},
    {id: 3, name: '五单元练习第3题', type: 'mp4', dataTime: '2014-05-04 17:24:59'},
    {id: 4, name: '五单元练习第3题', type: 'mp4', dataTime: '2014-05-04 17:24:59'},
    {id: 4, name: '五单元练习第3题', type: 'mp4', dataTime: '2014-05-04 17:24:59'},
    {id: 4, name: '五单元练习第3题', type: 'mp4', dataTime: '2014-05-04 17:24:59'}
  ];

}]);
