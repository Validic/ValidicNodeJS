'use strict';
var assert = require('assert');
var nock = require('nock');
var querystring = require('querystring');
var validic = require('../../lib');

describe('validic', function () {
  var client = new validic('api.validic.com', 'v1', '1', '1').client;

  describe('#get_users', function () {
    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .get('/v1/organizations/1/users.json?' + querystring.stringify({access_token: '1'}))
        .replyWithFile(200, __dirname + '/../fixtures/users.json');
      done();
    });

    it('returns a response object', function (done) {
      client.users.get_users({}, function (response) {
        assert.equal('response', response.name);
        done();
      });
    });

    it('makes an users request to the correct url', function (done) {
      client.users.get_users({}, function (response) {
        assert(scope.isDone());
        done();
      });
    });
  });

  describe('#provision_user', function () {
    describe('', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .post('/v1/organizations/1/users.json', { user: { uid: '123467890' }, access_token: '1' })
          .replyWithFile(200, __dirname + '/../fixtures/user.json');
        done();
      });
  
      it('requests the correct resource', function (done) {
        client.users.provision_user({uid: '123467890'}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
  
      it('returns a users', function (done) {
        client.users.provision_user({uid: '123467890'} , function (response) {
          assert.equal('user', response.name);
          assert.equal('123467890', response.uid);
          done();
        });
      });
    });
    describe('with optional profile', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .post('/v1/organizations/1/users.json', { user: { uid: '123467890', profile: { gender: 'M' } }, access_token: '1' })
          .replyWithFile(200, __dirname + '/../fixtures/user_with_profile.json');
        done();
      });
  
      it('requests the correct resource', function (done) {
        client.users.provision_user({uid: '123467890', profile: { gender: 'M' }}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
  
      it('returns a users', function (done) {
        client.users.provision_user({uid: '123467890', profile: { gender: 'M' }} , function (response) {
          assert.equal('user', response.name);
          assert.equal('123467890', response.uid);
          assert.equal('M', response.profile.gender);
          done();
        });
      });
    });
  });

  describe('#update_user', function () {
    describe('', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .put('/v1/organizations/1/users.json', { user: { uid: 'abcde' }, access_token: '1' })
          .replyWithFile(200, __dirname + '/../fixtures/updated_user.json');
        done();
      });
  
      it('requests the correct resource', function (done) {
        client.users.update_user({uid: 'abcde'}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
  
      it('returns a users', function (done) {
        client.users.update_user({uid: 'abcde'} , function (response) {
          assert.equal('user', response.name);
          assert.equal('abcde', response.uid);
          done();
        });
      });
    });
    describe('with optional profile', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .put('/v1/organizations/1/users.json', { user: { uid: '123467890', profile: { gender: 'M' } }, access_token: '1' })
          .replyWithFile(200, __dirname + '/../fixtures/user_with_profile.json');
        done();
      });
  
      it('requests the correct resource', function (done) {
        client.users.update_user({uid: '123467890', profile: { gender: 'M' }}, function (response) {
          assert(scope.isDone());
          done();
        });
      });
  
      it('returns a users', function (done) {
        client.users.update_user({uid: '123467890', profile: { gender: 'M' }} , function (response) {
          assert.equal('user', response.name);
          assert.equal('123467890', response.uid);
          assert.equal('M', response.profile.gender);
          done();
        });
      });
    });
  });

  describe('#delete_user', function () {
    describe('when resource is found', function () {
      var scope;
      beforeEach(function (done) {
        scope = nock('https://api.validic.com')
          .delete('/v1/organizations/1/users/1.json', {
            access_token: '1'
          })
          .reply(200, {});
        done();
      });
  
      it('returns true', function (done) {
        client.users.delete_user({user_id: '1'}, function (response) {
          assert(scope.isDone());
          assert.equal(true, response);
          done();
        });
      });
    });
  });

  describe('#me', function () {
    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .get('/v1/me.json?' + querystring.stringify({authentication_token: 'auth_token', access_token: '1'}))
        .replyWithFile(200, __dirname + '/../fixtures/me.json');
      done();
    });

    it('returns a string', function (done) {
      client.users.me({authentication_token: 'auth_token'}, function (response) {
        assert.equal('1', response);
        done();
      });
    });

    it('makes an users request to the correct url', function (done) {
      client.users.me({authentication_token: 'auth_token'}, function (response) {
        assert(scope.isDone());
        done();
      });
    });
  });

  describe('#suspend_user', function () {
    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .put('/v1/organizations/1/users/1.json', function (data) {
          var t1 = (data.suspend == 1);
          var t2 = (data.access_token == 1);
          return t1 && t2;
        })
        .reply(200, {});
      done();
    });

    it('returns true', function (done) {
      client.users.suspend_user({user_id: 1}, function (response) {
        assert.equal(true, response);
        done();
      });
    });

    it('makes an users request to the correct url', function (done) {
      client.users.suspend_user({user_id: 1}, function (response) {
        assert(scope.isDone());
        done();
      });
    });
  });

  describe('#unsuspend_user', function () {
    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .put('/v1/organizations/1/users/1.json', function (data) {
          var t1 = (data.suspend == 0);
          var t2 = (data.access_token == 1);
          return t1 && t2;
        })
        .reply(200, {});
      done();
    });

    it('returns true', function (done) {
      client.users.unsuspend_user({user_id: 1}, function (response) {
        assert.equal(true, response);
        done();
      });
    });

    it('makes an users request to the correct url', function (done) {
      client.users.unsuspend_user({user_id: 1}, function (response) {
        assert(scope.isDone());
        done();
      });
    });
  });

  describe('#refresh_token', function () {
    var scope;
    beforeEach(function (done) {
      scope = nock('https://api.validic.com')
        .get('/v1/organizations/1/users/1/refresh_token.json?' + querystring.stringify({access_token: '1'}))
        .replyWithFile(200, __dirname + '/../fixtures/refresh_token.json');
      done();
    });

    it('returns a response object', function (done) {
      client.users.refresh_token({user_id: 1}, function (response) {
        assert.equal('user', response.name);
        done();
      });
    });

    it('makes an users request to the correct url', function (done) {
      client.users.refresh_token({user_id: 1}, function (response) {
        assert(scope.isDone());
        done();
      });
    });
  });
});
