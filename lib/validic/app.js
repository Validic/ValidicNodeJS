'use strict';

var app = function (attrs) {
  for (var k in attrs) {
    this[k] = attrs[k];
  }
};  

module.exports = app;
