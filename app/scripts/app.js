'use strict';

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * # webApp
 *
 * Main module of the application.
 */
var Site = angular.module('Site', [
  'ngAnimate',
  'ngRoute',
  'ngSanitize',
  'ngCookies',
  'ui.router'
]);

Site.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      "use strict";

      $stateProvider
        .state('admin', {abstract: true, url: '/admin/:id', templateUrl: 'views/admin/wrap.html'})
        .state('admin.home', {url: '', templateUrl: 'views/admin/home.html'})
        .state('admin.teacher', {url: '/teacher-manager', templateUrl: 'views/admin/teacher.manager.html'})
        .state('admin.student', {url: '/student-manager', templateUrl: 'views/admin/student.manager.html'})
        .state('admin.school', {url: '/school-manager', templateUrl: 'views/admin/school.manager.html'})
        .state('admin.class-add', {url: '/class-add', templateUrl: 'views/admin/class-add.html'})
        .state('admin.class-edit', {url: '/class-edit/:cid', templateUrl: 'views/admin/class-edit.html'})
        .state('admin.class-list', {url: '/class-list', templateUrl: 'views/admin/class-list.html'})
        .state('admin.class-detail', {url: '/class-detail/:cid', templateUrl: 'views/admin/class-detail.html'})
        .state('admin.textbook', {url: '/textbook-manager', templateUrl: 'views/admin/textbook.manager.html'})
        .state('admin.chapter', {url: '/chapter-manager', templateUrl: 'views/admin/chapter.manager.html'})
        .state('admin.class-textbook', {url: '/class-textbook', templateUrl: 'views/admin/class.textbook.relation.html'})
        .state('admin.teacher-class', {url: '/teacher-class', templateUrl: 'views/admin/teacher.class.relation.html'})
        .state('admin.video-manager', {url: '/video-manager', templateUrl: 'views/admin/video-manager.html'})
        .state('admin.video-add', {url: '/video-add', templateUrl: 'views/admin/video-add.html'})
        .state('admin.video-edit', {url: '/video-edit/:vid', templateUrl: 'views/admin/video-edit.html'})
        .state('admin.video-list', {url: '/video-list', templateUrl: 'views/admin/video-list.html'})
        .state('admin.video-detail', {url: '/video-detail/:vid', templateUrl: 'views/admin/video-detail.html'})
        .state('admin.player', {url: '/video-player/:id', templateUrl: 'views/admin/video.player.html'})
        .state('admin.profile', {url: '/profile', templateUrl: 'views/admin/profile.html'})

        .state('login', {url: '/login', templateUrl: 'views/login.html', controller: 'LoginCtrl'});
      $urlRouterProvider.otherwise('/login');

    }]);
