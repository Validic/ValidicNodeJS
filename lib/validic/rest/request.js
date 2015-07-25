'use strict';

var https = require('https');
var querystring = require('querystring');

var request = function (api_url, api_version, access_token, organization_id) {
  this.api_url = api_url;
  this.api_version = api_version;
  this.access_token = access_token;
  this.organization_id = organization_id;
};  

request.prototype.latest = function (type, options, callback) {
  var organization_id = options.organization_id || this.organization_id;
  var user_id = options.user_id;
  delete options.organization_id;
  delete options.user_id;
  delete options._id;

  var path = "";
  if (user_id) {
    path = "/" + this.api_version + "/organizations/" + organization_id + "/users/" + user_id + "/" + type.toString() + "/latest.json";
  } else {
    path = "/" + this.api_version + "/organizations/" + organization_id + "/" + type.toString() + "/latest.json";
  }
  this.get(path, options, callback);
};

request.prototype.get_request = function (type, options, callback) {
  var path = this.construct_path(type, options);
  delete options.organization_id;
  delete options.user_id;
  delete options._id;
  this.get(path, options, callback);
};

request.prototype.post_request = function (type, options, callback) {
  var path = this.construct_path(type, options);
  delete options.organization_id;
  delete options.user_id;
  delete options._id;
  this.post(path, options, callback);
};

request.prototype.put_request = function (type, options, callback) {
  var path = this.construct_path(type, options);
  delete options.organization_id;
  delete options.user_id;
  delete options._id;
  this.put(path, options, callback);
};

request.prototype.delete_request = function (type, options, callback) {
  var path = this.construct_path(type, options);
  delete options.organization_id;
  delete options.user_id;
  delete options._id;
  this.delete(path, options, callback);
};

request.prototype.construct_path = function (type, options) {
  var organization_id = options.organization_id || this.organization_id;
  var user_id = options.user_id || null;
  var activity_id = options._id || null;

  var path = "";
  if (activity_id) {
    path = "/" + this.api_version + "/organizations/" + organization_id + "/users/" + user_id + "/" + type.toString() + "/" + activity_id + '.json';
  } else if (user_id && type === 'users') {
    path = "/" + this.api_version + "/organizations/" + organization_id + "/users/" + user_id + ".json";
  } else if (user_id) {
    path = "/" + this.api_version + "/organizations/" + organization_id + "/users/" + user_id + "/" + type.toString() + ".json";
  } else if (type === 'me') {
    path = "/" + this.api_version + "/me.json";
  } else if (type === 'profile') {
    path = "/" + this.api_version + "/profile.json";
  } else if (type === 'organizations') { 
    path = "/" + this.api_version + "/organizations/" + organization_id + ".json";
  } else {
    path = "/" + this.api_version + "/organizations/" + organization_id + "/" + type.toString() + ".json";
  }
  return path;
};

request.prototype.get = function (path, options, callback) {
  this.request('get', path, options, callback);
};

request.prototype.post = function (path, options, callback) {
  this.request('post', path, options, callback);
};

request.prototype.put = function (path, options, callback) {
  this.request('put', path, options, callback);
};

request.prototype.delete = function (path, options, callback) {
  this.request('delete', path, options, callback);
};

request.prototype.request = function (method, path, options, callback) {
  options.access_token = options.access_token || this.access_token;
  var request_options = {};
  var fullpath = '';

  if (method === 'get') {
    fullpath = path + '?' + querystring.stringify(options);
    request_options = {
      hostname: this.api_url,
      port: 443,
      path: fullpath,
      method: method
    };
  } else {
    fullpath = path;
    request_options = {
      hostname: this.api_url,
      port: 443,
      path: fullpath,
      method: method
    };
  }

  var req = https.request(request_options, function (res) {
    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      callback(JSON.parse(body));
    });
  });

  if (method !== 'get') {
    req.write(JSON.stringify(options));
  }

  req.end();
};

request.prototype.raw_get = function (url, callback) {
  var fullpath = url.split('https://api.validic.com')[1];

  var request_options = {
    hostname: this.api_url,
    port: 443,
    path: fullpath,
    method: 'GET'
  };

  var req = https.request(request_options, function (res) {
    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      callback(JSON.parse(body));
    });
  });

  req.end();
};

module.exports = request;
