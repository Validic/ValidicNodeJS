'use strict';
var assert = require('assert');
var nock = require('nock');
var querystring = require('querystring');
var validic = require('../../lib');

describe('validic', function () {
  var client = new validic('api.validic.com', 'v1', '1', '1').client;

  describe('#get_weight', function () {

    describe('no user_id given', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/weight.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/weight.json');
        done();
      });
  
      it('returns a response object', function (done) {
        client.weight.get_weight({}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes an weight request to the correct url', function (done) {
        client.weight.get_weight({}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    }); 

    describe('with user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/users/1/weight.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/weights.json');
        done();
      });
  
      it('returns a response object', function (done) {
        client.weight.get_weight({user_id: 1}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes an weight request to the correct url', function (done) {
        client.weight.get_weight({user_id: 1}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    }); 
  });

  describe('#create_weight', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .post('/v1/organizations/1/users/1/weight.json', { 
          weight: { timestamp: '2013-03-10T07:12:16+00:00',
                    utc_offset: '+00:00', weight: 177,
                    height: 34, data_id: '12345' },
            access_token: '1' })
        .replyWithFile(200, __dirname + '/../fixtures/weight.json');
      done();
    });

    it('requests the correct resource', function (done) {
      client.weight.create_weight({user_id: '1', timestamp: "2013-03-10T07:12:16+00:00", utc_offset: "+00:00", weight: 177, height: 34, data_id: '12345'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });

    it('returns a weight', function (done) {
      client.weight.create_weight({user_id: '1', timestamp: "2013-03-10T07:12:16+00:00", utc_offset: "+00:00", weight: 177, height: 34, data_id: '12345'} , function (response) {
        assert.equal('weight', response.name);
        done();
      });
    });
  });

  describe('#update_weight', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .put('/v1/organizations/1/users/1/weight.json', { 
          weight: { timestamp: '2013-03-10T07:12:16+00:00',
                    utc_offset: '+00:00', weight: 177,
                    height: 34, data_id: '12345' },
            access_token: '1' })
        .replyWithFile(200, __dirname + '/../fixtures/weight.json');
      done();
    });

    it('makes a weight request to the correct url', function (done) {
      client.weight.update_weight({user_id: '1', timestamp: "2013-03-10T07:12:16+00:00", utc_offset: "+00:00", weight: 177, height: 34, data_id: '12345'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });

    it('returns a weight', function (done) {
      client.weight.update_weight({user_id: '1', timestamp: "2013-03-10T07:12:16+00:00", utc_offset: "+00:00", weight: 177, height: 34, data_id: '12345'}, function (response) {
        assert.equal('weight', response.name);
        done();
      });
    });
  });

  describe('#delete_weight', function () {
    describe('when resource is found', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .delete('/v1/organizations/1/users/1/weight/51552cddfded0807c4000096.json', {
            access_token: '1'
          })
          .reply(200, {});
        done();
      });
  
      it('returns true', function (done) {
        client.weight.delete_weight({user_id: '1', _id: '51552cddfded0807c4000096'}, function (response) {
          assert(scope.isDone());
          assert.equal(true, response);
          done();
        });
      });
    });
  });

  describe('#latest_weight', function () {
    describe('with user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/users/2/weight/latest.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/weight.json');
        done();
      });

      it('makes a latest for weight', function (done) {
        client.weight.latest_weight({user_id: '2'}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes a latest url', function (done) {
        client.weight.latest_weight({user_id: '2'}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    });

    describe('without user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/weight/latest.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/weight.json');
        done();
      });

      it('makes a request for latest weight records', function (done) {
        client.weight.latest_weight({}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes a latest url', function (done) {
        client.weight.latest_weight({}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    });
  });

});
