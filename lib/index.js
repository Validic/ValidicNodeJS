'use strict';

var client = require('./validic/client');

var validic = function (api_url, api_version, access_token, organization_id) {
  this.BASE_URL = "https://api.validic.com/v1";
  if (!api_url || !api_version || !access_token || !organization_id) { throw Error('Constructor requires all attributes to be provided!'); }

  this.api_url = api_url;
  this.api_version = api_version;
  this.access_token = access_token;
  this.organization_id = organization_id;
  
  this.configure();
};

validic.prototype.configure = function () {
  this.client = new client(this.api_url, this.api_version, this.access_token, this.organization_id);
  return this;
};

module.exports = validic;
