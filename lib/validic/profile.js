'use strict';

var profile = function (attrs) {
  this.name = "profile";
  for (var k in attrs) {
    this[k] = attrs[k];
  }
};  

module.exports = profile;
