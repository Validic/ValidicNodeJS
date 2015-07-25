'use strict';

//var utils = require('./utils');
var pro = require('../profile');

var profile = function (request) {
  this.request = request;
};  

profile.prototype.get_profile = function (options, callback) {
  this.request.get_request('profile', options, function (resp) {
    var p = new pro(resp);
    callback(p);
  });
};

profile.prototype.create_profile = function (options, callback) {
  var token = options.authentication_token;
  delete options.authentication_token;
  options = { authentication_token: token, profile: options};
  this.request.post_request('profile', options, function (resp) {
    var p = new pro(resp.profile);
    callback(p);
  });
};

module.exports = profile;
