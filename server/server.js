'use strict';
const diameter = require('diameter');
const handlers = require('./handlers');


const options = {
    beforeAnyMessage: diameter.logMessage,
    afterAnyMessage: diameter.logMessage,
};

const server = diameter.createServer(options, function(socket) {
  socket.on('diameterMessage', function(request) {
    if(handlers.handleExists(request)) {
        handlers.handle(request);
    }
    else {
        console.log('Not implemented', request);
    }
    // if (event.message.command === 'Capabilities-Exchange') {
    //   event.response.body = event.response.body.concat([
    //     ['Result-Code', 'DIAMETER_SUCCESS'],
    //     ['Origin-Host', 'test.com'],
    //     ['Origin-Realm', 'com'],
    //     ['Host-IP-Address', '2001:db8:3312::1'],
    //     ['Host-IP-Address', '1.2.3.4'],
    //     ['Vendor-Id', 123],
    //     ['Product-Name', 'node-diameter']
    //   ]);
    //   event.callback(event.response);
    // } else if (event.message.command === 'Credit-Control') {
    //   event.response.body = event.response.body.concat([
    //     ['Result-Code', 2001], // You can also define enum values by their integer codes
    //     [264, 'test.com'], // or AVP names, this is 'Origin-Host'
    //     ['Origin-Realm', 'com'],
    //     ['Auth-Application-Id', 'Diameter Credit Control'],
    //     ['CC-Request-Type', 'INITIAL_REQUEST'],
    //     ['CC-Request-Number', 0],
    //     ['Multiple-Services-Credit-Control', [
    //       ['Granted-Service-Unit', [
    //         ['CC-Time', 123],
    //         ['CC-Money', [
    //             ['Unit-Value', [
    //                 ['Value-Digits', 123],
    //                 ['Exponent', 1]
    //             ]],
    //             ['Currency-Code', 1]
    //         ]],
    //         ['CC-Total-Octets', 123],
    //         ['CC-Input-Octets', 123],
    //         ['CC-Output-Octets', 123]
    //       ]],
    //       ['Requested-Service-Unit', [
    //         ['CC-Time', 123],
    //         ['CC-Money', [
    //             ['Unit-Value', [
    //                 ['Value-Digits', 123],
    //                 ['Exponent', 1]
    //             ]],
    //             ['Currency-Code', 1]
    //         ]],
    //         ['CC-Total-Octets', 123],
    //         ['CC-Input-Octets', 123],
    //         ['CC-Output-Octets', 123]
    //       ]]
    //     ]]
    //   ]);
    //   event.callback(event.response);
    // } 

  });
    
    socket.on('end', function() {
        console.log('Client ' + socket.diameterSession.sessionId + ' disconnected.');
    });
    socket.on('error', function(err) {
        console.log(err);
    });
});

module.exports = server;