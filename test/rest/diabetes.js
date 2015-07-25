'use strict';
var assert = require('assert');
var nock = require('nock');
var querystring = require('querystring');
var validic = require('../../lib');

describe('validic', function () {
  var client = new validic('api.validic.com', 'v1', '1', '1').client;

  describe('#get_diabetes', function () {

    describe('no user_id given', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/diabetes.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/diabetes_records.json');
        done();
      });
  
      it('returns a response object', function (done) {
        client.diabetes.get_diabetes({}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes an diabetes request to the correct url', function (done) {
        client.diabetes.get_diabetes({}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    }); 

    describe('with user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/users/1/diabetes.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/bulk_diabetes_records.json');
        done();
      });
  
      it('returns a response object', function (done) {
        client.diabetes.get_diabetes({user_id: 1}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes an diabetes request to the correct url', function (done) {
        client.diabetes.get_diabetes({user_id: 1}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    }); 
  });

  describe('#create_diabetes', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .post('/v1/organizations/1/users/1/diabetes.json', {
          diabetes: { 
            timestamp: '2013-03-10T07:12:16+00:00', 
            activity_id: '12345' 
          },
          access_token: '1'
        })
        .replyWithFile(200, __dirname + '/../fixtures/diabetes_records.json');
      done();
    });

    it('requests the correct resource', function (done) {
      client.diabetes.create_diabetes({user_id: '1', timestamp: '2013-03-10T07:12:16+00:00', activity_id: '12345'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });

    it('returns a diabetes', function (done) {
      client.diabetes.create_diabetes({user_id: '1', timestamp: '2013-03-10T07:12:16+00:00', activity_id: '12345'}, function (response) {
        assert.equal('diabetes', response.name);
        done();
      });
    });
  });

  describe('#update_diabetes', function () {

    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .put('/v1/organizations/1/users/1/diabetes/51552cddfded0807c4000096.json', {
          diabetes: { 
            timestamp: '2013-03-10T07:12:16+00:00'
          },
          access_token: '1'
        })
        .replyWithFile(200, __dirname + '/../fixtures/diabetes_records.json');
      done();
    });

    it('makes a diabetes request to the correct url', function (done) {
      client.diabetes.update_diabetes({user_id: '1', _id: '51552cddfded0807c4000096', timestamp: '2013-03-10T07:12:16+00:00'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });

    it('returns a diabetes', function (done) {
      client.diabetes.update_diabetes({user_id: '1', _id: '51552cddfded0807c4000096', timestamp: '2013-03-10T07:12:16+00:00'}, function (response) {
        assert.equal('diabetes', response.name);
        done();
      });
    });
  });

  describe('#delete_diabetes', function () {
    describe('when resource is found', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .delete('/v1/organizations/1/users/1/diabetes/51552cddfded0807c4000096.json', {
            access_token: '1'
          })
          .reply(200, {});
        done();
      });
  
      it('returns true', function (done) {
        client.diabetes.delete_diabetes({user_id: '1', _id: '51552cddfded0807c4000096'}, function (response) {
          assert(scope.isDone());
          assert.equal(true, response);
          done();
        });
      });
    });
  });

  describe('#latest_diabetes', function () {
    describe('with user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/users/2/diabetes/latest.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/diabetes_records.json');
        done();
      });

      it('makes a latest for diabetes', function (done) {
        client.diabetes.latest_diabetes({user_id: '2'}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes a latest url', function (done) {
        client.diabetes.latest_diabetes({user_id: '2'}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    });

    describe('without user_id', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .get('/v1/organizations/1/diabetes/latest.json?' + querystring.stringify({access_token: '1'}))
          .replyWithFile(200, __dirname + '/../fixtures/diabetes_records.json');
        done();
      });

      it('makes a request for latest diabetes records', function (done) {
        client.diabetes.latest_diabetes({}, function (response) {
          assert.equal('response', response.name);
          done();
        });
      });
  
      it('makes a latest url', function (done) {
        client.diabetes.latest_diabetes({}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
    });
  });

});
