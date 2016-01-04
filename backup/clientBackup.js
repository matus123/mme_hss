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

/**
session.createRequest(ApplicationID, CommandCode);
**/

// const socket = diameter.createConnection(options, function() {
//   let session = socket.diameterSession;
//   let request = session.createRequest('3GPP S6a/S6d', '3GPP-Authentication-Information');
//   request.header.flags.proxiable = true;
//   request.body = request.body.concat([ 
//     [ 'Origin-Host', 'gx.pcef.com' ],
//     [ 'Origin-Realm', 'pcef.com' ],
//     [ 'Vendor-Id', 10415 ],
//     [ 'Origin-State-Id', 219081 ],
//     [ 'Supported-Vendor-Id', 10415 ],
//     [ 'Auth-Application-Id', 'Diameter Credit Control' ] 
//   ]);
//   console.log('request=>',request);
//   session.sendRequest(request).then(function(response) {
//     // handle response
//     console.log('response=>',response);
//   }, function(error) {
//     console.log('Error sending request: ' + error);
//   });
// });

const socket = diameter.createConnection(options, function() {
  let session = socket.diameterSession;
  let request = session.createRequest('3GPP S6a/S6d', '3GPP-Authentication-Information');
  request.header.flags.proxiable = true;
  request.body = request.body.concat([ 
    [ 'Vendor-Specific-Application-Id', [
      [ 'Vendor-Id', 10415],
      [ 'Auth-Application-Id', '3GPP S6a/S6d' ]
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

// Handling server initiated messages:
// socket.on('diameterMessage', function(event) {
//   if (event.message.command === 'Capabilities-Exchange') {
//     event.response.body = event.response.body.concat([
//       ['Result-Code', 'DIAMETER_SUCCESS'],
//       ['Origin-Host', 'test.com'],
//       ['Origin-Realm', 'com'],
//       ['Host-IP-Address', '2001:db8:3312::1'],
//       ['Host-IP-Address', '1.2.3.4'],
//       ['Vendor-Id', 123],
//       ['Product-Name', 'node-diameter']
//     ]);
//     event.callback(event.response);
//     socket.diameterSession.end();
//   }
// });
socket.on('error', function(err) {
  console.log(err);
});