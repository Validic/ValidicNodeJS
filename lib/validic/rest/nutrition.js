'use strict';

var utils = require('./utils');
var bio = require('../nutrition');

var nutrition = function (request) {
  this.request = request;
};  

nutrition.prototype.get_nutrition = function (options, callback) {
  this.request.get_request('nutrition', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

nutrition.prototype.create_nutrition = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  options = { user_id: user_id, nutrition: options};
  this.request.post_request('nutrition', options, function (resp) {
    var b = new bio(resp.nutrition);
    callback(b);
  });
};

nutrition.prototype.update_nutrition = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id, nutrition: options};
  this.request.put_request('nutrition', options, function (resp) {
    var b = new bio(resp.nutrition);
    callback(b);
  });
};

nutrition.prototype.delete_nutrition = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id };
  this.request.delete_request('nutrition', options, function (resp) {
    callback(true);
  });
};

nutrition.prototype.latest_nutrition = function (options, callback) {
  this.request.latest('nutrition', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

module.exports = nutrition;
