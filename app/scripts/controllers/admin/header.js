'use strict';

/**
 * @ngdoc function
 * @name WebappApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the WebappApp
 */
Site.controller('HeaderCtrl', ['$scope', 'AuthSrv', '$state', function ($scope, AuthSrv, $state) {
  console.log("HeaderCtrl");

  $scope.userData = {id: "SG0822888", name: "ruigao", password: "19851012", position: "teacher"};

  $scope.headerArray = [
    {
      name: "前台系统管理",
      subList: [
        {name: "教师用户管理", link: "admin.teacher-list"},
        {name: "新增教师", link: "admin.teacher-add"},
        {name: "学生用户管理", link: "admin.student-list"},
        {name: "新增学生", link: "admin.student-add"}
      ]
    },
    {
      name: "学籍管理",
      subList: [
        {name: "学校管理", link: "admin.school-list"},
        {name: "新增学校", link: "admin.school-add"},
        {name: "班级管理", link: "admin.class-list"},
        {name: "新增班级", link: "admin.class-add"}
      ]
    },
    {
      name: "课本管理",
      subList: [
        {name: "教材管理", link: "admin.textbook-list"},
        {name: "教材添加", link: "admin.textbook-add"},
        {name: "章节管理", link: "admin.chapter"},
        {name: "教材－章节管理", link: "admin.textbook-section-list"},
        {name: "教材－章节添加", link: "admin.textbook-section-add"},
        {name: "班级－教材关联管理", link: "admin.class-textbook"},
        {name: "教师－班级关联管理", link: "admin.teacher-class"}
      ]
    },
    {
      name: "教学管理",
      subList: [
        {name: "视频管理", link: "admin.video-manager"},
        {name: "视频列表", link: "admin.video-list"},
        {name: "添加视频", link: "admin.video-add"}
      ]
    }
  ];

  $scope.profile = [
    {name: "个人信息管理", link: "admin.profile"},
    {name: "注销系统", link: "login"}
  ];

  // left slide bar
  $scope.resourceSummary = [
    {name: "教师用户管理", count: "1"},
    {name: "学生用户管理", count: "11"},
    {name: "教材管理", count: "13"},
    {name: "班级管理", count: "41"},
    {name: "视频管理", count: "13"}
  ];
  $scope.courseSummary = [
    {name: "上传视频", code: "12345"},
    {name: "视频标签", code: "12345"},
    {name: "视频分类", code: "12345"}
  ];


}]);
