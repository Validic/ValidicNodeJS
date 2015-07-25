'use strict';

var diabetes = function (attrs) {
  this.name = "diabetes";
  for (var k in attrs) {
    this[k] = attrs[k];
  }
};  

module.exports = diabetes;
