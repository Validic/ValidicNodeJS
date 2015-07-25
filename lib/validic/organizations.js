'use strict';

var organizations = function (attrs) {
  for (var k in attrs) {
    this[k] = attrs[k];
  }
};  

module.exports = organizations;
