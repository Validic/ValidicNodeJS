'use strict';

var utils = require('./utils');
var bio = require('../fitness');

var fitness = function (request) {
  this.request = request;
};  

fitness.prototype.get_fitness = function (options, callback) {
  this.request.get_request('fitness', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

fitness.prototype.create_fitness = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  options = { user_id: user_id, fitness: options};
  this.request.post_request('fitness', options, function (resp) {
    var b = new bio(resp.fitness);
    callback(b);
  });
};

fitness.prototype.update_fitness = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id, fitness: options};
  this.request.put_request('fitness', options, function (resp) {
    var b = new bio(resp.fitness);
    callback(b);
  });
};

fitness.prototype.delete_fitness = function (options, callback) {
  var user_id = options.user_id;
  delete options.user_id;
  var _id = options._id;
  delete options._id;
  options = { user_id: user_id, _id: _id };
  this.request.delete_request('fitness', options, function (resp) {
    callback(true);
  });
};

fitness.prototype.latest_fitness = function (options, callback) {
  this.request.latest('fitness', options, function (resp) {
    var response = utils.build_response_attr(resp);
    callback(response);
  });
};

module.exports = fitness;
