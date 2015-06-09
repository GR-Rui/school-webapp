'use strict';

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * # webApp
 *
 * Main module of the application.
 */
var SiteFilters = angular.module('SiteFilters', []);
var Site = angular.module('Site', [
  'ngAnimate',
  'ngRoute',
  'ngSanitize',
  'ngCookies',
  'ui.router',
  'SiteFilters'
]);

Site.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      "use strict";

      $stateProvider
        .state('admin', {abstract: true, url: '/admin/:id', templateUrl: 'views/admin/wrap.html'})
        .state('admin.home', {url: '', templateUrl: 'views/admin/home.html'})
        .state('admin.teacher', {url: '/teacher-manager', templateUrl: 'views/admin/teacher.manager.html'})
        .state('admin.teacher-add', {url: '/teacher-add', templateUrl: 'views/admin/teacher-add.html'})
        .state('admin.teacher-edit', {url: '/teacher-edit/:tid', templateUrl: 'views/admin/teacher-edit.html'})
        .state('admin.teacher-list', {url: '/teacher-list', templateUrl: 'views/admin/teacher-list.html'})
        .state('admin.teacher-detail', {url: '/teacher-detail/:tid', templateUrl: 'views/admin/teacher-detail.html'})
        .state('admin.student', {url: '/student-manager', templateUrl: 'views/admin/student.manager.html'})
        .state('admin.student-add', {url: '/student-add', templateUrl: 'views/admin/student-add.html'})
        .state('admin.student-edit', {url: '/student-edit/:sid', templateUrl: 'views/admin/student-edit.html'})
        .state('admin.student-list', {url: '/student-list', templateUrl: 'views/admin/student-list.html'})
        .state('admin.student-detail', {url: '/student-detail/:sid', templateUrl: 'views/admin/student-detail.html'})
        .state('admin.school', {url: '/school-manager', templateUrl: 'views/admin/school.manager.html'})
        .state('admin.school-add', {url: '/school-add', templateUrl: 'views/admin/school-add.html'})
        .state('admin.school-edit', {url: '/school-edit/:sid', templateUrl: 'views/admin/school-edit.html'})
        .state('admin.school-list', {url: '/school-list', templateUrl: 'views/admin/school-list.html'})
        .state('admin.school-detail', {url: '/school-detail/:sid', templateUrl: 'views/admin/school-detail.html'})
        .state('admin.class-add', {url: '/class-add', templateUrl: 'views/admin/class-add.html'})
        .state('admin.class-edit', {url: '/class-edit/:cid', templateUrl: 'views/admin/class-edit.html'})
        .state('admin.class-list', {url: '/class-list', templateUrl: 'views/admin/class-list.html'})
        .state('admin.class-detail', {url: '/class-detail/:cid', templateUrl: 'views/admin/class-detail.html'})
        .state('admin.textbook', {url: '/textbook-manager', templateUrl: 'views/admin/textbook.manager.html'})
        .state('admin.textbook-add', {url: '/textbook-add', templateUrl: 'views/admin/textbook-add.html'})
        .state('admin.textbook-edit', {url: '/textbook-edit/:tid', templateUrl: 'views/admin/textbook-edit.html'})
        .state('admin.textbook-list', {url: '/textbook-list', templateUrl: 'views/admin/textbook-list.html'})
        .state('admin.textbook-detail', {url: '/textbook-detail/:tid', templateUrl: 'views/admin/textbook-detail.html'})
        .state('admin.chapter', {url: '/chapter-manager', templateUrl: 'views/admin/chapter.manager.html'})
        .state('admin.textbook-section-add', {url: '/textbook-section-add', templateUrl: 'views/admin/textbook-section-add.html'})
        .state('admin.textbook-section-edit', {url: '/textbook-section-edit/:tsid', templateUrl: 'views/admin/textbook-section-edit.html'})
        .state('admin.textbook-section-list', {url: '/textbook-section-list', templateUrl: 'views/admin/textbook-section-list.html'})
        .state('admin.textbook-section-detail', {url: '/textbook-section-detail/:tsid', templateUrl: 'views/admin/textbook-section-detail.html'})
        .state('admin.class-textbook', {url: '/class-textbook', templateUrl: 'views/admin/class.textbook.relation.html'})
        .state('admin.teacher-class', {url: '/teacher-class', templateUrl: 'views/admin/teacher.class.relation.html'})
        .state('admin.video-manager', {url: '/video-manager', templateUrl: 'views/admin/video-manager.html'})
        .state('admin.video-add', {url: '/video-add', templateUrl: 'views/admin/video-add.html'})
        .state('admin.video-edit', {url: '/video-edit/:vid', templateUrl: 'views/admin/video-edit.html'})
        .state('admin.video-list', {url: '/video-list', templateUrl: 'views/admin/video-list.html'})
        .state('admin.video-detail', {url: '/video-detail/:vid', templateUrl: 'views/admin/video-detail.html'})
        .state('admin.player', {url: '/video-player/:id', templateUrl: 'views/admin/video.player.html'})
        .state('admin.profile', {url: '/profile', templateUrl: 'views/admin/profile.html'})
        .state('admin.teacher-class-add', {url: '/teacher-class-add', templateUrl: 'views/admin/teacher-class-add.html'})
        .state('admin.teacher-class-edit', {url: '/teacher-class-edit/:tcid', templateUrl: 'views/admin/teacher-class-edit.html'})
        .state('admin.teacher-class-list', {url: '/teacher-class-list', templateUrl: 'views/admin/teacher-class-list.html'})
        .state('admin.teacher-class-detail', {url: '/teacher-class-detail/:tcid', templateUrl: 'views/admin/teacher-class-detail.html'})
        .state('admin.teacher-textbook-add', {url: '/teacher-textbook-add', templateUrl: 'views/admin/teacher-textbook-add.html'})
        .state('admin.teacher-textbook-edit', {url: '/teacher-textbook-edit/:ttid', templateUrl: 'views/admin/teacher-textbook-edit.html'})
        .state('admin.teacher-textbook-list', {url: '/teacher-textbook-list', templateUrl: 'views/admin/teacher-textbook-list.html'})
        .state('admin.teacher-textbook-detail', {url: '/teacher-textbook-detail/:ttid', templateUrl: 'views/admin/teacher-textbook-detail.html'})

        .state('login', {url: '/login', templateUrl: 'views/login.html', controller: 'LoginCtrl'});
      $urlRouterProvider.otherwise('/login');

    }]);
