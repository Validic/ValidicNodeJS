'use strict';

var apps = require('./rest/apps');
var biometrics = require('./rest/biometrics');
var request = require('./rest/request');
var diabetes = require('./rest/diabetes');
var fitness = require('./rest/fitness');
var nutrition = require('./rest/nutrition');
var organizations = require('./rest/organizations');
var profile = require('./rest/profile');
var routine = require('./rest/routine');
var sleep = require('./rest/sleep');
var tobacco_cessation = require('./rest/tobacco_cessation');
var users = require('./rest/users');
var weight = require('./rest/weight');

var client = function (api_url, api_version, access_token, organization_id) {
  this.request = new request(api_url, api_version, access_token, organization_id);

  this.apps = new apps(this.request);
  this.biometrics = new biometrics(this.request);
  this.diabetes = new diabetes(this.request);
  this.fitness = new fitness(this.request);
  this.nutrition = new nutrition(this.request);
  this.organizations = new organizations(this.request);
  this.profile = new profile(this.request);
  this.routine = new routine(this.request);
  this.sleep = new sleep(this.request);
  this.tobacco_cessation = new tobacco_cessation(this.request);
  this.users = new users(this.request);
  this.weight = new weight(this.request);
};

module.exports = client;
