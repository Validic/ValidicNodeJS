# Validic #

## Build Status

## Stable Version: 0.0.0

Javascript API Wrapper for [Validic](http://www.validic.com/api/docs). It includes the
following functionality:

## Installation

Install it yourself as:

    $ npm install validic

## Usage

##### Javascript/Node
First, instantiate the client.
```javascript
var validic = require('validic');


var api_url:         = 'https://api.validic.com',
var api_version:     = 'v1',
var access_token:    = 'ORGANIZATION_ACCESS_TOKEN',
var organization_id: = 'ORGANIZATION_ID'


var client = new validic(api_url, api_version, access_token, organization_id).client;

```

Now you can use the wrapper's helper methods to interface with the Validic API.
```javascript
# Get current organization metadata
client.organizations.get_organization(options, callback);
```

When your requests return an object they are returned as a Validic Response
object. The Validic Response typically includes summary metadata and an array
of record objects.  All resonse objects are retreived in the response parameter
of the callback.
```javascript
client.routine.get_routine({}, function (response) {

});

```

You can pass a hash of options to calls that fetch data.
```javascript
client.routine.get_routine({start_date: '2015-01-01T00:00:00+00:00'}, callback);
```

