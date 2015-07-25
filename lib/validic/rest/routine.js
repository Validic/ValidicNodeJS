'use strict';

var utils = require('./utils');
var bio = require('../routine');

var routine = function (request) {
  this.request = request;
};  

routine.prototype.get_routine = function (options, callback) {
  this.request.get_request('routine', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

routine.prototype.create_routine = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  options = { user_id: user_id, routine: options};
  this.request.post_request('routine', options, function (resp) {
    var b = new bio(resp.routine);
    callback(b);
  });
};

routine.prototype.update_routine = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id, routine: options};
  this.request.put_request('routine', options, function (resp) {
    var b = new bio(resp.routine);
    callback(b);
  });
};

routine.prototype.delete_routine = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id };
  this.request.delete_request('routine', options, function (resp) {
    callback(true);
  });
};

routine.prototype.latest_routine = function (options, callback) {
  this.request.latest('routine', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

module.exports = routine;
