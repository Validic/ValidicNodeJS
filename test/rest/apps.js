'use strict';
var assert = require('assert');
var nock = require('nock');
var querystring = require('querystring');
var validic = require('../../lib');

describe('validic', function () {
  var client = new validic('api.validic.com', 'v1', '1', '1').client;

  describe('#get_apps', function () {
    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .get('/v1/organizations/1/apps.json?' + querystring.stringify({access_token: '1'}))
        .replyWithFile(200, __dirname + '/../fixtures/apps.json');
      done();
    });

    it('returns a response object', function (done) {
      client.apps.get_org_apps(function (response) {
        assert.equal('response', response.name);
        done();
      });
    });

    it('makes an apps request to the correct url', function (done) {
      client.apps.get_org_apps(function (response) {
        assert(scope.isDone());
        done();
      });
    });
  });

  describe('#get_user_synced_apps', function () {
    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .get('/v1/organizations/1/sync_apps.json?' + querystring.stringify({authentication_token: '2', access_token: '1'}) )
        .replyWithFile(200, __dirname + '/../fixtures/synced_apps.json');
      done();
    });

    it('returns a response object', function (done) {
      client.apps.get_user_synced_apps({authentication_token: '2'}, function (response) {
        assert.equal('response', response.name);
        done();
      });
    });

    it('makes an apps request to the correct url', function (done) {
      client.apps.get_user_synced_apps({authentication_token: '2'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });
  });

});
