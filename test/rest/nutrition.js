'use strict';
var assert = require('assert');
var nock = require('nock');
var querystring = require('querystring');
var validic = require('../../lib');

describe('validic', function () {
  var client = new validic('api.validic.com', 'v1', '1', '1').client;

  describe('#get_nutrition', function () {

    describe('no user_id given', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/nutrition.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/nutritions.json');
        done();
      });
  
      it('returns a response object', function (done) {
        client.nutrition.get_nutrition({}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes an nutrition request to the correct url', function (done) {
        client.nutrition.get_nutrition({}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    }); 

    describe('with user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/users/1/nutrition.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/bulk_nutritions.json');
        done();
      });
  
      it('returns a response object', function (done) {
        client.nutrition.get_nutrition({user_id: 1}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes an nutrition request to the correct url', function (done) {
        client.nutrition.get_nutrition({user_id: 1}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    }); 
  });

  describe('#create_nutrition', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .post('/v1/organizations/1/users/1/nutrition.json', {
          nutrition: { 
            timestamp: '2013-03-10T07:12:16+00:00', 
            activity_id: '12345' 
          },
          access_token: '1'
        })
        .replyWithFile(200, __dirname + '/../fixtures/nutrition.json');
      done();
    });

    it('requests the correct resource', function (done) {
      client.nutrition.create_nutrition({user_id: '1', timestamp: '2013-03-10T07:12:16+00:00', activity_id: '12345'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });

    it('returns a nutrition', function (done) {
      client.nutrition.create_nutrition({user_id: '1', timestamp: '2013-03-10T07:12:16+00:00', activity_id: '12345'}, function (response) {
        assert.equal('nutrition', response.name);
        done();
      });
    });
  });

  describe('#update_nutrition', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .put('/v1/organizations/1/users/1/nutrition/51552cddfded0807c4000096.json', {
          nutrition: { 
            timestamp: '2013-03-10T07:12:16+00:00'
          },
          access_token: '1'
        })
        .replyWithFile(200, __dirname + '/../fixtures/nutrition.json');
      done();
    });

    it('makes a nutrition request to the correct url', function (done) {
      client.nutrition.update_nutrition({user_id: '1', _id: '51552cddfded0807c4000096', timestamp: '2013-03-10T07:12:16+00:00'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });

    it('returns a nutrition', function (done) {
      client.nutrition.update_nutrition({user_id: '1', _id: '51552cddfded0807c4000096', timestamp: '2013-03-10T07:12:16+00:00'}, function (response) {
        assert.equal('nutrition', response.name);
        done();
      });
    });
  });

  describe('#delete_nutrition', function () {
    describe('when resource is found', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .delete('/v1/organizations/1/users/1/nutrition/51552cddfded0807c4000096.json', {
            access_token: '1'
          })
          .reply(200, {});
        done();
      });
  
      it('returns true', function (done) {
        client.nutrition.delete_nutrition({user_id: '1', _id: '51552cddfded0807c4000096'}, function (response) {
          assert(scope.isDone());
          assert.equal(true, response);
          done();
        });
      });
    });
  });

  describe('#latest_nutrition', function () {
    describe('with user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/users/2/nutrition/latest.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/nutritions.json');
        done();
      });

      it('makes a latest for nutrition', function (done) {
        client.nutrition.latest_nutrition({user_id: '2'}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes a latest url', function (done) {
        client.nutrition.latest_nutrition({user_id: '2'}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    });

    describe('without user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/nutrition/latest.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/nutrition.json');
        done();
      });

      it('makes a request for latest nutrition records', function (done) {
        client.nutrition.latest_nutrition({}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes a latest url', function (done) {
        client.nutrition.latest_nutrition({}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    });
  });

});
