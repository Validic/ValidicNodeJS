'use strict';

var user = function (attrs) {
  this.name = "user";
  for (var k in attrs) {
    this[k] = attrs[k];
  }
};  

module.exports = user;
