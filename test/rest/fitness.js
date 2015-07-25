'use strict';
var assert = require('assert');
var nock = require('nock');
var querystring = require('querystring');
var validic = require('../../lib');

describe('validic', function () {
  var client = new validic('api.validic.com', 'v1', '1', '1').client;

  describe('#get_fitness', function () {

    describe('no user_id given', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/fitness.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/fitnesses.json');
        done();
      });
  
      it('returns a response object', function (done) {
        client.fitness.get_fitness({}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes an fitness request to the correct url', function (done) {
        client.fitness.get_fitness({}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    }); 

    describe('with user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/users/1/fitness.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/bulk_fitnesses.json');
        done();
      });
  
      it('returns a response object', function (done) {
        client.fitness.get_fitness({user_id: 1}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes an fitness request to the correct url', function (done) {
        client.fitness.get_fitness({user_id: 1}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    }); 
  });

  describe('#create_fitness', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .post('/v1/organizations/1/users/1/fitness.json', {
          fitness: { 
            timestamp: '2013-03-10T07:12:16+00:00', 
            activity_id: '12345' 
          },
          access_token: '1'
        })
        .replyWithFile(200, __dirname + '/../fixtures/fitness.json');
      done();
    });

    it('requests the correct resource', function (done) {
      client.fitness.create_fitness({user_id: '1', timestamp: '2013-03-10T07:12:16+00:00', activity_id: '12345'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });

    it('returns a fitness', function (done) {
      client.fitness.create_fitness({user_id: '1', timestamp: '2013-03-10T07:12:16+00:00', activity_id: '12345'}, function (response) {
        assert.equal('fitness', response.name);
        done();
      });
    });
  });

  describe('#update_fitness', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .put('/v1/organizations/1/users/1/fitness/51552cddfded0807c4000096.json', {
          fitness: { 
            timestamp: '2013-03-10T07:12:16+00:00'
          },
          access_token: '1'
        })
        .replyWithFile(200, __dirname + '/../fixtures/fitness.json');
      done();
    });

    it('makes a fitness request to the correct url', function (done) {
      client.fitness.update_fitness({user_id: '1', _id: '51552cddfded0807c4000096', timestamp: '2013-03-10T07:12:16+00:00'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });

    it('returns a fitness', function (done) {
      client.fitness.update_fitness({user_id: '1', _id: '51552cddfded0807c4000096', timestamp: '2013-03-10T07:12:16+00:00'}, function (response) {
        assert.equal('fitness', response.name);
        done();
      });
    });
  });

  describe('#delete_fitness', function () {
    describe('when resource is found', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .delete('/v1/organizations/1/users/1/fitness/51552cddfded0807c4000096.json', {
            access_token: '1'
          })
          .reply(200, {});
        done();
      });
  
      it('returns true', function (done) {
        client.fitness.delete_fitness({user_id: '1', _id: '51552cddfded0807c4000096'}, function (response) {
          assert(scope.isDone());
          assert.equal(true, response);
          done();
        });
      });
    });
  });

  describe('#latest_fitness', function () {
    describe('with user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/users/2/fitness/latest.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/fitnesses.json');
        done();
      });

      it('makes a latest for fitness', function (done) {
        client.fitness.latest_fitness({user_id: '2'}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes a latest url', function (done) {
        client.fitness.latest_fitness({user_id: '2'}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    });

    describe('without user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/fitness/latest.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/fitness.json');
        done();
      });

      it('makes a request for latest fitness records', function (done) {
        client.fitness.latest_fitness({}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes a latest url', function (done) {
        client.fitness.latest_fitness({}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    });
  });

});
