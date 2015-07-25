'use strict';

var routine = function (attrs) {
  this.name = "routine";
  for (var k in attrs) {
    this[k] = attrs[k];
  }
};  

module.exports = routine;
