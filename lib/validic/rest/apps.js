'use strict';

var utils = require('./utils');

var apps = function (request) {
  this.request = request;
};  

apps.prototype.get_org_apps = function (callback) {
  this.request.get_request('apps', {}, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

apps.prototype.get_user_synced_apps = function (options, callback) {
  this.request.get_request('sync_apps', {authentication_token: options.authentication_token}, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

module.exports = apps;
