'use strict';
var assert = require('assert');
var nock = require('nock');
var querystring = require('querystring');
var validic = require('../../lib');

describe('validic', function () {
  var client = new validic('api.validic.com', 'v1', '1', '1').client;

  describe('#get_profile', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .get('/v1/profile.json?' + querystring.stringify({access_token:1, authentication_token:2}))
        .replyWithFile(200, __dirname + '/../fixtures/profile.json');
      done();
    });

    it('returns a validic profile object', function (done) {
      client.profile.get_profile({access_token:1, authentication_token:2}, function (response) {
        assert.equal('profile', response.name);
        done();
      });
    });

    it('builds the correct path for profile', function (done) {
      client.profile.get_profile({access_token:1, authentication_token:2}, function (response) {
        assert(scope.isDone());
        done();
      });
    });
  });

  describe('#create_profile', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .post('/v1/profile.json', {
          authentication_token: 2,
          profile: { 
            gender: 'm', 
            location: 'NC' 
          },
          access_token: '1'
        })
        .replyWithFile(200, __dirname + '/../fixtures/profile.json');
      done();
    });

    it('returns a validic profile object', function (done) {
      client.profile.create_profile({authentication_token:2, gender:'m', location:'NC'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });

    it('builds the correct path for profile', function (done) {
      client.profile.create_profile({authentication_token:2, gender:'m', location:'NC'}, function (response) {
        assert.equal('profile', response.name);
        done();
      });
    });
  });

});
