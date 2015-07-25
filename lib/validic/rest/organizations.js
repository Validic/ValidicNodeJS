'use strict';

var utils = require('./utils');

var organizations = function (request) {
  this.request = request;
};  

organizations.prototype.get_organizations = function (callback) {
  this.request.get_request('organizations', {}, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

module.exports = organizations;
