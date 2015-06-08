'use strict';

/**
 * @ngdoc function
 * @name WebappApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the WebappApp
 */
Site.controller('HeaderCtrl', ['$scope', 'AuthSrv', '$state', 'SchoolManagerSrv', 'StudentManagerSrv', 'TeacherManagerSrv', 'TextbookManagerSrv', 'TextbookSectionManagerSrv', 'VideoManagerSrv',
  function ($scope, AuthSrv, $state, SchoolManagerSrv, StudentManagerSrv, TeacherManagerSrv, TextbookManagerSrv, TextbookSectionManagerSrv, VideoManagerSrv) {
    console.log("HeaderCtrl");

    $scope.userData = {id: "SG0822888", name: "ruigao", password: "19851012", position: "teacher"};
    $scope.pageSize = 10;

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
          {name: "视频列表", link: "admin.video-list"},
          {name: "添加视频", link: "admin.video-add"}
        ]
      }
    ];

    /*
     ,
     {
     name: "教学管理",
     subList: [
     {name: "视频管理", link: "admin.video-manager"},
     {name: "视频列表", link: "admin.video-list"},
     {name: "添加视频", link: "admin.video-add"}
     ]
     }
     */

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

    SchoolManagerSrv.getAvailableSchools()
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.availableSchools = JSON.parse(temp);
      });

    TeacherManagerSrv.getAvailableTeachers()
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.availableTeachers = JSON.parse(temp);
      });

    TextbookManagerSrv.getAvailableTextbooks()
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.availableTextbooks = JSON.parse(temp);
      });

    TextbookSectionManagerSrv.getAvailableTextbookSections()
      .then(function (res) {
        var temp = JSON.parse(res);
        $scope.availableTextbookSections = JSON.parse(temp);
      });

    /*
     ** Filter list
     */
    $scope.textbookLevel = [
      {id:'PRIMARY_SCHOOL', name:'小学'},
      {id:'JUNIOR_MIDDLE_SCHOOL', name:'初中'},
      {id:'SENIOR_MIDDLE_SCHOOL', name:'高中'}
    ];
    $scope.textbookVersion = [
      {id:'SUJIAO_VERSION', name:'苏教版'},
      {id:'RENJIAO_VERSION', name:'人教版'}
    ];
    $scope.grade = [
      {id:'GRADE_ONE', name:'一年级'},
      {id:'GRADE_TWO', name:'二年级'},
      {id:'GRADE_THREE', name:'三年级'},
      {id:'GRADE_FOUR', name:'四年级'},
      {id:'GRADE_FIVE', name:'五年级'},
      {id:'GRADE_SIX', name:'六年级'},
      {id:'GRADE_SEVEN', name:'七年级'},
      {id:'GRADE_EIGHT', name:'八年级'},
      {id:'GRADE_NINE', name:'九年级'}
    ];
    $scope.discipline = [
      {id:'CHINESE', name:'语文'},
      {id:'MATH', name:'数学'},
      {id:'ENGLISH', name:'英语'}
    ];
    $scope.textbookStatus = [
      {id:'DISABLED', name:'未启用'},
      {id:'ENABLED', name:'已启用但不能被前台用户使用'},
      {id:'OPENED', name:'启用并且开放给前台用户使用'}
    ];
    $scope.questionType = [
      {id:'SINGLE_OPTION', name:'单选题'},
      {id:'MULTIPLE_OPTION', name:'多选题'},
      {id:'YES_OR_NO', name:'是非判断题'}
    ];

    // test data
    /*
    $scope.availableSchools = [
      {id: 1, name: '111111', desc: '111111'},
      {id: 2, name: '222222', desc: '111111'},
      {id: 3, name: '3333333', desc: '111111'}
    ];
    $scope.availableTextbooks = [
      {id: 1, name: '111111', desc: '111111'},
      {id: 2, name: '222222', desc: '111111'},
      {id: 3, name: '3333333', desc: '111111'}
    ];
    $scope.availableTextbookSections = [
      {id: 1, name: '111111', desc: '111111'},
      {id: 2, name: '222222', desc: '111111'},
      {id: 3, name: '3333333', desc: '111111'}
    ];*/

  }]);
