'use strict';

var utils = require('./utils');
var user = require('../user');

var users = function (request) {
  this.request = request;
};  

users.prototype.get_users = function (options, callback) {
  this.request.get_request('users', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

users.prototype.refresh_token = function (options, callback) {
  this.request.get_request('refresh_token', options, function (resp) {
    var u = new user(resp.user);
    callback(u);
  });
};

users.prototype.me = function (options, callback) {
  this.request.get_request('me', options, function (resp) {
    callback(resp.me._id);
  });
};

users.prototype.provision_user = function (options, callback) {
  this.request.post_request('users', {user: options}, function (resp) {
    var u = new user(resp.user);
    callback(u);
  });
};

users.prototype.update_user = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  options = { user_id: user_id, user: options};
  this.request.put_request('users', options, function (resp) {
    var u = new user(resp.user);
    callback(u);
  });
};

users.prototype.delete_user = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  options = { user_id: user_id};
  this.request.delete_request('users', options, function (resp) {
    callback(true);
  });
};

users.prototype.suspend_user = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  options = { user_id: user_id, suspend: 1};
  this.request.put_request('users', options, function (resp) {
    callback(true);
  });
};

users.prototype.unsuspend_user = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  options = { user_id: user_id, suspend: 0};
  this.request.put_request('users', options, function (resp) {
    callback(true);
  });
};

module.exports = users;
