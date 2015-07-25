'use strict';

var biometrics = function (attrs) {
  this.name = "biometrics";
  for (var k in attrs) {
    this[k] = attrs[k];
  }
};  

module.exports = biometrics;
