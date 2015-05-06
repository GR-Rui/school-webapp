'use strict';

/**
 * @ngdoc overview
 * @name cimWebappApp
 * @description
 * # cimWebappApp
 *
 * Main module of the application.
 */
var Site = angular.module('Site', [
  'ngAnimate',
  'ngRoute',
  'ngSanitize',
  'ngCookies',
  'ui.router',
  'blueimp.fileupload'
]);

Site.config(
  [          '$stateProvider', '$urlRouterProvider', '$httpProvider', 'fileUploadProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, fileUploadProvider) {
      "use strict";

      $stateProvider
        .state('admin', {abstract: true, url: '/admin/:id', templateUrl: 'views/admin/wrap.html'})
        .state('admin.home', {url: '', templateUrl: 'views/admin/home.html'})
        .state('admin.teacher', {url: '/teacher-manager', templateUrl: 'views/admin/teacher.manager.html'})
        .state('admin.student', {url: '/student-manager', templateUrl: 'views/admin/student.manager.html'})
        .state('admin.school', {url: '/school-manager', templateUrl: 'views/admin/school.manager.html'})
        .state('admin.class', {url: '/class-manager', templateUrl: 'views/admin/class.manager.html'})
        .state('admin.textbook', {url: '/textbook-manager', templateUrl: 'views/admin/textbook.manager.html'})
        .state('admin.chapter', {url: '/chapter-manager', templateUrl: 'views/admin/chapter.manager.html'})
        .state('admin.class-textbook', {url: '/class-textbook', templateUrl: 'views/admin/class.textbook.relation.html'})
        .state('admin.teacher-class', {url: '/teacher-class', templateUrl: 'views/admin/teacher.class.relation.html'})
        .state('admin.video', {url: '/video-manager', templateUrl: 'views/admin/video.manager.html'})
        .state('admin.profile', {url: '/profile', templateUrl: 'views/admin/profile.html'})

        .state('login', {url: '/login', templateUrl: 'views/login.html', controller: 'LoginCtrl'});
      $urlRouterProvider.otherwise('/admin/SG0822888');


      //upload config
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      fileUploadProvider.defaults.redirect = window.location.href.replace(
        /\/[^\/]*$/,
        '/cors/result.html?%s'
      );
      var isOnGitHub = false;
      if (isOnGitHub) {
        // Demo settings:
        angular.extend(fileUploadProvider.defaults, {
          // Enable image resizing, except for Android and Opera,
          // which actually support image resizing, but fail to
          // send Blob objects via XHR requests:
          disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
          maxFileSize: 5000000,
          acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
        });
      }

    }]);
