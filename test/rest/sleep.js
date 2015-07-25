'use strict';
var assert = require('assert');
var nock = require('nock');
var querystring = require('querystring');
var validic = require('../../lib');

describe('validic', function () {
  var client = new validic('api.validic.com', 'v1', '1', '1').client;

  describe('#get_sleep', function () {

    describe('no user_id given', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/sleep.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/sleep.json');
        done();
      });
  
      it('returns a response object', function (done) {
        client.sleep.get_sleep({}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes an sleep request to the correct url', function (done) {
        client.sleep.get_sleep({}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    }); 

    describe('with user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/users/1/sleep.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/sleeps.json');
        done();
      });
  
      it('returns a response object', function (done) {
        client.sleep.get_sleep({user_id: 1}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes an sleep request to the correct url', function (done) {
        client.sleep.get_sleep({user_id: 1}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    }); 
  });

  describe('#create_sleep', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .post('/v1/organizations/1/users/1/sleep.json', { 
          sleep: { timestamp: '2013-03-10T07:12:16+00:00',
                  utc_offset: '+00:00', total_sleep: 477,
                  awake: 34, deep: 234, light: 94, rem: 115,
                  times_woken: 4, activity_id: '12345' },
          access_token: '1' })
        .replyWithFile(200, __dirname + '/../fixtures/sleep.json');
      done();
    });

    it('requests the correct resource', function (done) {
      client.sleep.create_sleep({user_id: '1', timestamp: "2013-03-10T07:12:16+00:00", utc_offset: "+00:00", total_sleep: 477, awake: 34, deep: 234, light: 94, rem: 115, times_woken: 4, activity_id: '12345'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });

    it('returns a sleep', function (done) {
      client.sleep.create_sleep({user_id: '1', timestamp: "2013-03-10T07:12:16+00:00", utc_offset: "+00:00", total_sleep: 477, awake: 34, deep: 234, light: 94, rem: 115, times_woken: 4, activity_id: '12345'}, function (response) {
        assert.equal('sleep', response.name);
        done();
      });
    });
  });

  describe('#update_sleep', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .put('/v1/organizations/1/users/1/sleep.json', { 
          sleep: { timestamp: '2013-03-10T07:12:16+00:00',
                  utc_offset: '+00:00', total_sleep: 477,
                  awake: 34, deep: 234, light: 94, rem: 115,
                  times_woken: 4, activity_id: '12345' },
          access_token: '1' })
        .replyWithFile(200, __dirname + '/../fixtures/sleep.json');
      done();
    });

    it('makes a sleep request to the correct url', function (done) {
      client.sleep.update_sleep({user_id: '1', timestamp: "2013-03-10T07:12:16+00:00", utc_offset: "+00:00", total_sleep: 477, awake: 34, deep: 234, light: 94, rem: 115, times_woken: 4, activity_id: '12345'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });

    it('returns a sleep', function (done) {
      client.sleep.update_sleep({user_id: '1', timestamp: "2013-03-10T07:12:16+00:00", utc_offset: "+00:00", total_sleep: 477, awake: 34, deep: 234, light: 94, rem: 115, times_woken: 4, activity_id: '12345'}, function (response) {
        assert.equal('sleep', response.name);
        done();
      });
    });
  });

  describe('#delete_sleep', function () {
    describe('when resource is found', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .delete('/v1/organizations/1/users/1/sleep/51552cddfded0807c4000096.json', {
            access_token: '1'
          })
          .reply(200, {});
        done();
      });
  
      it('returns true', function (done) {
        client.sleep.delete_sleep({user_id: '1', _id: '51552cddfded0807c4000096'}, function (response) {
          assert(scope.isDone());
          assert.equal(true, response);
          done();
        });
      });
    });
  });

  describe('#latest_sleep', function () {
    describe('with user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/users/2/sleep/latest.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/sleep.json');
        done();
      });

      it('makes a latest for sleep', function (done) {
        client.sleep.latest_sleep({user_id: '2'}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes a latest url', function (done) {
        client.sleep.latest_sleep({user_id: '2'}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    });

    describe('without user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/sleep/latest.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/sleep.json');
        done();
      });

      it('makes a request for latest sleep records', function (done) {
        client.sleep.latest_sleep({}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes a latest url', function (done) {
        client.sleep.latest_sleep({}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    });
  });

});
