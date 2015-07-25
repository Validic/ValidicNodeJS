'use strict';

var summary = function (sum_hash) {
  if (sum_hash) {
    this.timestamp = sum_hash.timestamp;
    this.status = sum_hash.status;
    this.offset = sum_hash.offset;
    this.message = sum_hash.message;
    this.results = sum_hash.results;
    this.start_date = sum_hash.start_date;
    this.end_date = sum_hash.end_date;
    this.limit = sum_hash.limit;
    this.previous = sum_hash.previous;
    this.next = sum_hash.next;  
  }
};

module.exports = summary;
