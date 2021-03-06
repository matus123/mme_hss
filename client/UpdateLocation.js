'use strict';

const diameter = require('diameter');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3868;

const options = {
  beforeAnyMessage: diameter.logMessage,
  afterAnyMessage: diameter.logMessage,
  port: PORT,
  host: HOST
};

const socket = diameter.createConnection(options, function() {
  let session = socket.diameterSession;
  let request = session.createRequest('3GPP S6a/S6d', '3GPP-Update-Location');
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
    [ 'RAT-Type', 'EUTRAN', 10415 ],
    [ 'ULR-Flags', 98 ],
    [ 'Visited-PLMN-Id', new Buffer('132010', 'hex') ],
    [ 'Destination-Host', 'HSS.HOST' ],
    [ 'Supported-Features', [
      [ 'Feature-List-ID', 1],
      [ 'Feature-List', 201327167]
    ]],
    [ 'Terminal-Information', [
      [ 'Software-Version', '02' ],
      [ 'IMEI', '12345670901231' ]
    ]],
    [ 'UE-SRVCC-Capability', 'UE-SRVCC-NOT-SUPPORTED' ]
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