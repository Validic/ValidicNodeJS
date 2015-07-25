'use strict';

var utils = require('./utils');
var bio = require('../sleep');

var sleep = function (request) {
  this.request = request;
};  

sleep.prototype.get_sleep = function (options, callback) {
  this.request.get_request('sleep', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

sleep.prototype.create_sleep = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  options = { user_id: user_id, sleep: options};
  this.request.post_request('sleep', options, function (resp) {
    var b = new bio(resp.sleep);
    callback(b);
  });
};

sleep.prototype.update_sleep = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id, sleep: options};
  this.request.put_request('sleep', options, function (resp) {
    var b = new bio(resp.sleep);
    callback(b);
  });
};

sleep.prototype.delete_sleep = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id };
  this.request.delete_request('sleep', options, function (resp) {
    callback(true);
  });
};

sleep.prototype.latest_sleep = function (options, callback) {
  this.request.latest('sleep', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

module.exports = sleep;
