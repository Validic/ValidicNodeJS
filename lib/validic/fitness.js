'use strict';

var fitness = function (attrs) {
  this.name = "fitness";
  for (var k in attrs) {
    this[k] = attrs[k];
  }
};  

module.exports = fitness;
