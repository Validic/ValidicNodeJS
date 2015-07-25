'use strict';

var utils = require('./utils');
var bio = require('../biometrics');

var biometrics = function (request) {
  this.request = request;
};  

biometrics.prototype.get_biometrics = function (options, callback) {
  this.request.get_request('biometrics', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

biometrics.prototype.create_biometrics = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  options = { user_id: user_id, biometrics: options};
  this.request.post_request('biometrics', options, function (resp) {
    var b = new bio(resp.biometrics);
    callback(b);
  });
};

biometrics.prototype.update_biometrics = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id, biometrics: options};
  this.request.put_request('biometrics', options, function (resp) {
    var b = new bio(resp.biometrics);
    callback(b);
  });
};

biometrics.prototype.delete_biometrics = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id };
  this.request.delete_request('biometrics', options, function (resp) {
    callback(true);
  });
};

biometrics.prototype.latest_biometrics = function (options, callback) {
  this.request.latest('biometrics', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

module.exports = biometrics;
