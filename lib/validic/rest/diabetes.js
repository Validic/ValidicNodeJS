'use strict';

var utils = require('./utils');
var bio = require('../diabetes');

var diabetes = function (request) {
  this.request = request;
};  

diabetes.prototype.get_diabetes = function (options, callback) {
  this.request.get_request('diabetes', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

diabetes.prototype.create_diabetes = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  options = { user_id: user_id, diabetes: options};
  this.request.post_request('diabetes', options, function (resp) {
    var b = new bio(resp.diabetes);
    callback(b);
  });
};

diabetes.prototype.update_diabetes = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id, diabetes: options};
  this.request.put_request('diabetes', options, function (resp) {
    var b = new bio(resp.diabetes);
    callback(b);
  });
};

diabetes.prototype.delete_diabetes = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id };
  this.request.delete_request('diabetes', options, function (resp) {
    callback(true);
  });
};

diabetes.prototype.latest_diabetes = function (options, callback) {
  this.request.latest('diabetes', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

module.exports = diabetes;
