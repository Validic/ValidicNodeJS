'use strict';

var tobacco_cessation = function (attrs) {
  this.name = "tobacco_cessation";
  for (var k in attrs) {
    this[k] = attrs[k];
  }
};  

module.exports = tobacco_cessation;
