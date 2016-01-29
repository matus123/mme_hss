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
628 - Supported-Features /missing in dictionary
493 - Service-Selection /missing name, wrong vendorid
486 - MIP6-Agent-Info /missing name, wrong vendorid

*/

const socket = diameter.createConnection(options, function() {
  let session = socket.diameterSession;
  let request = session.createRequest('3GPP S6a/S6d', '3GPP-Notify');
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
    [ 'Destination-Host', 'HSS.HOST' ],
    [ 'Supported-Features', [
      [ 'Feature-List-ID', 1],
      [ 'Feature-List', 201327167]
    ]],
    [ 'Homogeneous-Support-of-IMS-Voice-Over-PS-Sessions', 'NOT_SUPPORTED' ],
    [ 'NOR-Flags', 128 ],
    [ 'Context-Identifier', 1 ],
    [ 'Service-Selection', 'www.test0.com' ],
    [ 'Terminal-Information', [
      [ 'Software-Version', '02' ],
      [ 'IMEI', '12345670901231' ]
    ]],
    [ 'MIP6-Agent-Info', [
      [ 'MIP-Home-Agent-Host', [
        [ 'Destination-Host', 'netowl-pgw00.nodes.epc.mnc012.mcc310.3gppnetwork.org' ],
        [ 'Destination-Realm', 'epc.mnc012.mcc310.3gppnetwork.org' ]
      ]]
    ]],
    [ 'Visited-Network-Identifier', 'mnc012.mcc310.3gppnetwork.org' ]
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