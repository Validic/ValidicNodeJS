'use strict';
var assert = require('assert');
var nock = require('nock');
var querystring = require('querystring');
var validic = require('../../lib');

describe('validic', function () {
  var client = new validic('api.validic.com', 'v1', '1', '1').client;

  describe('#get_tobacco_cessation', function () {

    describe('no user_id given', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/tobacco_cessation.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/tobacco_cessation.json');
        done();
      });
  
      it('returns a response object', function (done) {
        client.tobacco_cessation.get_tobacco_cessation({}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes an tobacco_cessation request to the correct url', function (done) {
        client.tobacco_cessation.get_tobacco_cessation({}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    }); 

    describe('with user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/users/1/tobacco_cessation.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/tobacco_cessations.json');
        done();
      });
  
      it('returns a response object', function (done) {
        client.tobacco_cessation.get_tobacco_cessation({user_id: 1}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes an tobacco_cessation request to the correct url', function (done) {
        client.tobacco_cessation.get_tobacco_cessation({user_id: 1}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    }); 
  });

  describe('#create_tobacco_cessation', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .post('/v1/organizations/1/users/1/tobacco_cessation.json', {
          tobacco_cessation: { 
            timestamp: '2013-03-10T07:12:16+00:00', 
            activity_id: '12345' 
          },
          access_token: '1'
        })
        .replyWithFile(200, __dirname + '/../fixtures/tobacco_cessation.json');
      done();
    });

    it('requests the correct resource', function (done) {
      client.tobacco_cessation.create_tobacco_cessation({user_id: '1', timestamp: '2013-03-10T07:12:16+00:00', activity_id: '12345'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });

    it('returns a tobacco_cessation', function (done) {
      client.tobacco_cessation.create_tobacco_cessation({user_id: '1', timestamp: '2013-03-10T07:12:16+00:00', activity_id: '12345'}, function (response) {
        assert.equal('tobacco_cessation', response.name);
        done();
      });
    });
  });

  describe('#update_tobacco_cessation', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .put('/v1/organizations/1/users/1/tobacco_cessation/51552cddfded0807c4000096.json', {
          tobacco_cessation: { 
            timestamp: '2013-03-10T07:12:16+00:00'
          },
          access_token: '1'
        })
        .replyWithFile(200, __dirname + '/../fixtures/tobacco_cessation.json');
      done();
    });

    it('makes a tobacco_cessation request to the correct url', function (done) {
      client.tobacco_cessation.update_tobacco_cessation({user_id: '1', _id: '51552cddfded0807c4000096', timestamp: '2013-03-10T07:12:16+00:00'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });

    it('returns a tobacco_cessation', function (done) {
      client.tobacco_cessation.update_tobacco_cessation({user_id: '1', _id: '51552cddfded0807c4000096', timestamp: '2013-03-10T07:12:16+00:00'}, function (response) {
        assert.equal('tobacco_cessation', response.name);
        done();
      });
    });
  });

  describe('#delete_tobacco_cessation', function () {
    describe('when resource is found', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .delete('/v1/organizations/1/users/1/tobacco_cessation/51552cddfded0807c4000096.json', {
            access_token: '1'
          })
          .reply(200, {});
        done();
      });
  
      it('returns true', function (done) {
        client.tobacco_cessation.delete_tobacco_cessation({user_id: '1', _id: '51552cddfded0807c4000096'}, function (response) {
          assert(scope.isDone());
          assert.equal(true, response);
          done();
        });
      });
    });
  });

  describe('#latest_tobacco_cessation', function () {
    describe('with user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/users/2/tobacco_cessation/latest.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/tobacco_cessation.json');
        done();
      });

      it('makes a latest for tobacco_cessation', function (done) {
        client.tobacco_cessation.latest_tobacco_cessation({user_id: '2'}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes a latest url', function (done) {
        client.tobacco_cessation.latest_tobacco_cessation({user_id: '2'}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    });

    describe('without user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/tobacco_cessation/latest.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/tobacco_cessation.json');
        done();
      });

      it('makes a request for latest tobacco_cessation records', function (done) {
        client.tobacco_cessation.latest_tobacco_cessation({}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes a latest url', function (done) {
        client.tobacco_cessation.latest_tobacco_cessation({}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    });
  });

});
