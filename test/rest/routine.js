'use strict';
var assert = require('assert');
var nock = require('nock');
var querystring = require('querystring');
var validic = require('../../lib');

describe('validic', function () {
  var client = new validic('api.validic.com', 'v1', '1', '1').client;

  describe('#get_routine', function () {

    describe('no user_id given', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/routine.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/routine.json');
        done();
      });
  
      it('returns a response object', function (done) {
        client.routine.get_routine({}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes an routine request to the correct url', function (done) {
        client.routine.get_routine({}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    }); 

    describe('with user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/users/1/routine.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/routines.json');
        done();
      });
  
      it('returns a response object', function (done) {
        client.routine.get_routine({user_id: 1}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes an routine request to the correct url', function (done) {
        client.routine.get_routine({user_id: 1}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    }); 
  });

  describe('#create_routine', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .post('/v1/organizations/1/users/1/routine.json', {
          routine: { 
            timestamp: '2013-03-10T07:12:16+00:00', 
            activity_id: '12345' 
          },
          access_token: '1'
        })
        .replyWithFile(200, __dirname + '/../fixtures/routine.json');
      done();
    });

    it('requests the correct resource', function (done) {
      client.routine.create_routine({user_id: '1', timestamp: '2013-03-10T07:12:16+00:00', activity_id: '12345'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });

    it('returns a routine', function (done) {
      client.routine.create_routine({user_id: '1', timestamp: '2013-03-10T07:12:16+00:00', activity_id: '12345'}, function (response) {
        assert.equal('routine', response.name);
        done();
      });
    });
  });

  describe('#update_routine', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .put('/v1/organizations/1/users/1/routine/51552cddfded0807c4000096.json', {
          routine: { 
            timestamp: '2013-03-10T07:12:16+00:00'
          },
          access_token: '1'
        })
        .replyWithFile(200, __dirname + '/../fixtures/routine.json');
      done();
    });

    it('makes a routine request to the correct url', function (done) {
      client.routine.update_routine({user_id: '1', _id: '51552cddfded0807c4000096', timestamp: '2013-03-10T07:12:16+00:00'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });

    it('returns a routine', function (done) {
      client.routine.update_routine({user_id: '1', _id: '51552cddfded0807c4000096', timestamp: '2013-03-10T07:12:16+00:00'}, function (response) {
        assert.equal('routine', response.name);
        done();
      });
    });
  });

  describe('#delete_routine', function () {
    describe('when resource is found', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .delete('/v1/organizations/1/users/1/routine/51552cddfded0807c4000096.json', {
            access_token: '1'
          })
          .reply(200, {});
        done();
      });
  
      it('returns true', function (done) {
        client.routine.delete_routine({user_id: '1', _id: '51552cddfded0807c4000096'}, function (response) {
          assert(scope.isDone());
          assert.equal(true, response);
          done();
        });
      });
    });
  });

  describe('#latest_routine', function () {
    describe('with user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/users/2/routine/latest.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/routine.json');
        done();
      });

      it('makes a latest for routine', function (done) {
        client.routine.latest_routine({user_id: '2'}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes a latest url', function (done) {
        client.routine.latest_routine({user_id: '2'}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    });

    describe('without user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/routine/latest.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/routine.json');
        done();
      });

      it('makes a request for latest routine records', function (done) {
        client.routine.latest_routine({}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes a latest url', function (done) {
        client.routine.latest_routine({}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    });
  });

});
