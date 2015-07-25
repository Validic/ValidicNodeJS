'use strict';

var response = function (summary, resp) {
  this.name = "response";
  
  this.summary = summary;
  if (typeof resp === 'object') {
    this.records = resp;
  } else if (typeof response === 'string') {
    this.attributes = resp;
  }
};

module.exports = response;
