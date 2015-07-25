'use strict'; 

var summary = require('../summary');
var response = require('../response');

module.exports.build_response_attr = function (resp) {
  var sum_hash = resp.summary || null;
  var s = new summary(sum_hash);
  var r = new response(s, resp);
  return r;
};
