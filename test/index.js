'use strict';
var assert = require('assert');
var validic = require('../lib');

describe('validic', function () {

  it('throws an error when no attributes are provided', function () {
    var testFunction = function () {
      new validic();
    }
    assert.throws(testFunction, Error);
  });

  it('sets attributes correctly', function () {
    var c = new validic('https://validic.com/api', 'v2', '123', 'abc');

    assert.equal('https://validic.com/api', c.api_url);
    assert.equal('v2', c.api_version);
    assert.equal('123', c.access_token);
    assert.equal('abc', c.organization_id);
  });

});
