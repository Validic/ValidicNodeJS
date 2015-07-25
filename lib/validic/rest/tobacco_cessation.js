'use strict';

var utils = require('./utils');
var bio = require('../tobacco_cessation');

var tobacco_cessation = function (request) {
  this.request = request;
};  

tobacco_cessation.prototype.get_tobacco_cessation = function (options, callback) {
  this.request.get_request('tobacco_cessation', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

tobacco_cessation.prototype.create_tobacco_cessation = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  options = { user_id: user_id, tobacco_cessation: options};
  this.request.post_request('tobacco_cessation', options, function (resp) {
    var b = new bio(resp.tobacco_cessation);
    callback(b);
  });
};

tobacco_cessation.prototype.update_tobacco_cessation = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id, tobacco_cessation: options};
  this.request.put_request('tobacco_cessation', options, function (resp) {
    var b = new bio(resp.tobacco_cessation);
    callback(b);
  });
};

tobacco_cessation.prototype.delete_tobacco_cessation = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id };
  this.request.delete_request('tobacco_cessation', options, function (resp) {
    callback(true);
  });
};

tobacco_cessation.prototype.latest_tobacco_cessation = function (options, callback) {
  this.request.latest('tobacco_cessation', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

module.exports = tobacco_cessation;
