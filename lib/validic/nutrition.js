'use strict';

var nutrition = function (attrs) {
  this.name = "nutrition";
  for (var k in attrs) {
    this[k] = attrs[k];
  }
};  

module.exports = nutrition;
