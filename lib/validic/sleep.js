'use strict';

var sleep = function (attrs) {
  this.name = "sleep";
  for (var k in attrs) {
    this[k] = attrs[k];
  }
};  

module.exports = sleep;
