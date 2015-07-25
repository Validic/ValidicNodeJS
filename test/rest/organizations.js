'use strict';
var assert = require('assert');
var nock = require('nock');
var querystring = require('querystring');
var validic = require('../../lib');

describe('validic', function () {
  var client = new validic('api.validic.com', 'v1', '1', '1').client;

  describe('#get_organizations', function () {
    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .get('/v1/organizations/1.json?' + querystring.stringify({access_token: '1'}))
        .replyWithFile(200, __dirname + '/../fixtures/organizations.json');
      done();
    });

    it('returns a organization object', function (done) {
      client.organizations.get_organizations(function (response) {
        assert.equal('response', response.name);
        done();
      });
    });

    it('creates the correct url', function (done) {
      client.organizations.get_organizations(function (response) {
        assert(scope.isDone());
        done();
      });
    });
  });

});
