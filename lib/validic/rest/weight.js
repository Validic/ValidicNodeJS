'use strict';

var utils = require('./utils');
var bio = require('../weight');

var weight = function (request) {
  this.request = request;
};  

weight.prototype.get_weight = function (options, callback) {
  this.request.get_request('weight', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

weight.prototype.create_weight = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  options = { user_id: user_id, weight: options};
  this.request.post_request('weight', options, function (resp) {
    var b = new bio(resp.weight);
    callback(b);
  });
};

weight.prototype.update_weight = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id, weight: options};
  this.request.put_request('weight', options, function (resp) {
    var b = new bio(resp.weight);
    callback(b);
  });
};

weight.prototype.delete_weight = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id };
  this.request.delete_request('weight', options, function (resp) {
    callback(true);
  });
};

weight.prototype.latest_weight = function (options, callback) {
  this.request.latest('weight', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

module.exports = weight;
