'use strict';

var weight = function (attrs) {
  this.name = "weight";
  for (var k in attrs) {
    this[k] = attrs[k];
  }
};  

module.exports = weight;
