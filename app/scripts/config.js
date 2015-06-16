Site.constant('ConfigConst', (function () {
  "use strict";

  var _version = "0.0.1";
  var _build = "2015-05-04";
  var _env = 'dev';  //DEV or PRD

  var _devURLs = {
    api: 'http://vmwin2k8.chinacloudapp.cn/ManageService.svc/',
    baseUrl: 'http://localhost:8078/'
  };

  var _prdURLs = {
    api: 'http://localhost',
    baseUrl: 'http://localhost'
  };

  return {
    appVersion: _version,
    build: _build,
    urls: (_env == 'dev') ? _devURLs : _prdURLs
  }
})());

