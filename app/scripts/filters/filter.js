'use strict';

angular.module('SiteFilters')
  .filter('deleteFlag', function () {
    return function (booleanString) {
      if (booleanString && booleanString == 1) {
        return '已删除'
      } else {
        return '未删除';
      }
    };
  });

angular.module('SiteFilters')
  .filter('lockedFlag', function () {
    return function (booleanString) {
      if (booleanString && booleanString == 1) {
        return '已锁定'
      } else {
        return '正常';
      }
    };
  });

angular.module('SiteFilters')
  .filter('textbookLevelMap', function () {
    return function (value) {
      var temp = "";
      switch (value) {
        case 'PRIMARY_SCHOOL':
          temp = '小学';
          break;
        case 'JUNIOR_MIDDLE_SCHOOL':
          temp = '小学';
          break;
        case 'SENIOR_MIDDLE_SCHOOL':
          temp = '小学';
          break;
        default:
          temp = null;
          break;
      }
      return(temp);
    }
  });

angular.module('SiteFilters')
  .filter('textbookVersionMap', function () {
    return function (value) {
      var temp = "";
      switch (value) {
        case 'SUJIAO_VERSION':
          temp = '苏教版';
          break;
        case 'RENJIAO_VERSION':
          temp = '人教版';
          break;
        default:
          temp = null;
          break;
      }
      return(temp);
    }
  });

angular.module('SiteFilters')
  .filter('gradeMap', function () {
    return function (value) {
      var temp = "";
      switch (value) {
        case 'GRADE_ONE':
          temp = '一年级';
          break;
        case 'GRADE_TWO':
          temp = '二年级';
          break;
        case 'GRADE_THREE':
          temp = '三年级';
          break;
        case 'GRADE_FOUR':
          temp = '四年级';
          break;
        case 'GRADE_FIVE':
          temp = '五年级';
          break;
        case 'GRADE_SIX':
          temp = '六年级';
          break;
        case 'GRADE_SEVEN':
          temp = '七年级';
          break;
        case 'GRADE_EIGHT':
          temp = '八年级';
          break;
        case 'GRADE_NINE':
          temp = '九年级';
          break;
        default:
          temp = null;
          break;
      }
      return(temp);
    }
  });

angular.module('SiteFilters')
  .filter('disciplineMap', function () {
    return function (value) {
      var temp = "";
      switch (value) {
        case 'CHINESE':
          temp = '语文';
          break;
        case 'MATH':
          temp = '数学';
          break;
        case 'ENGLISH':
          temp = '英语';
          break;
        default:
          temp = null;
          break;
      }
      return(temp);
    }
  });

angular.module('SiteFilters')
  .filter('textbookStatusMap', function () {
    return function (value) {
      var temp = "";
      switch (value) {
        case 'DISABLED':
          temp = '未启用';
          break;
        case 'ENABLED':
          temp = '已启用但不能被前台用户使用';
          break;
        case 'OPENED':
          temp = '启用并且开放给前台用户使用';
          break;
        default:
          temp = null;
          break;
      }
      return(temp);
    }
  });

angular.module('SiteFilters')
  .filter('questionTypeMap', function () {
    return function (value) {
      var temp = "";
      switch (value) {
        case 'SINGLE_OPTION':
          temp = '单选题';
          break;
        case 'MULTIPLE_OPTION':
          temp = '多选题';
          break;
        case 'YES_OR_NO':
          temp = '是非判断题';
          break;
        default:
          temp = null;
          break;
      }
      return(temp);
    }
  });
