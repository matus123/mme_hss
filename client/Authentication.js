'use strict';

const diameter = require('diameter');

const HOST = '127.0.0.1';
const PORT = 3868;

const options = {
  beforeAnyMessage: diameter.logMessage,
  afterAnyMessage: diameter.logMessage,
  port: PORT,
  host: HOST
};

/*
628 - Supported-Features /missing in dictionary.json
*/

const socket = diameter.createConnection(options, function() {
  let session = socket.diameterSession;
  let request = session.createRequest('3GPP S6a/S6d', '3GPP-Authentication-Information');
  //request.header.flags.proxiable = true;
  request.body = request.body.concat([ 
    [ 'Vendor-Specific-Application-Id', [
      [ 'Vendor-Id', 10415],
      [ 'Auth-Application-Id', '3GPP S6a' ]
    ]],
    [ 'Auth-Session-State', 'NO_STATE_MAINTAINED' ],
    [ 'Origin-Host', 'mmeOriginHost.com' ],
    [ 'Origin-Realm', 'mmeOriginRealm.com' ],
    [ 'Destination-Realm', 'HSS.REALM' ],
    [ 'User-Name', '262010986726546' ],
    [ 'Visited-PLMN-Id', '132010' ],
    [ 'Destination-Host', 'HSS.HOST' ],
    //[ 'Supported-Features', ],
    [ 'Requested-EUTRAN-Authentication-Info', [
      [ 'Number-Of-Requested-Vectors', 1]
    ]]
  ]);
  console.log('request=>',request);
  session.sendRequest(request).then(function(response) {
    // handle response
    console.log('response=>',response);
  }, function(error) {
    console.log('Error sending request: ' + error);
  });
});

socket.on('error', function(err) {
  console.log(err);
});