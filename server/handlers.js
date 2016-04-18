'use strict';

const logger = require('../logger');
let counter = 0;

const handlers = {
	'3GPP-Authentication-Information': function (event) {
		event.response.body = event.response.body.concat([
			[ 'Result-Code', 'DIAMETER_SUCCESS'],
			[ 'Auth-Session-State', 'NO_STATE_MAINTAINED' ],
			[ 'Origin-Host', 'HSS.HOST'],
			[ 'Origin-Realm', 'HSS.REALM'],
			[ 'Authentication-Info', [
				[ 'E-UTRAN-Vector', [
					[ 'RAND', new Buffer('b5dccc06326927233269272332692723', 'hex')],
					[ 'XRES', new Buffer('54cb470a3eefc9bd', 'hex') ],
					[ 'AUTN', new Buffer('ab5785fcff99825d8eb4b0c2b88d4fb6', 'hex')],
					[ 'KASME', new Buffer('2050862ddfd1df1b82c3f353d432e173b49380a81a970150f0204314ccc436cb', 'hex') ]
				]]
			]]
		]);
		event.callback(event.response);
		return event.response;
	},

	'3GPP-Notify': function (event) {
		event.response.body = event.response.body.concat([
			[ 'Result-Code', 'DIAMETER_SUCCESS'],
			[ 'Auth-Session-State', 'NO_STATE_MAINTAINED' ],
			[ 'Origin-Host', 'HSS.HOST'],
			[ 'Origin-Realm', 'HSS.REALM']
		]);
		event.callback(event.response);
		return event.response;
	},

	'3GPP-Update-Location': function (event) {
		event.response.body = event.response.body.concat([
            [ 'Result-Code', 'DIAMETER_SUCCESS'],
            [ 'Auth-Session-State', 'NO_STATE_MAINTAINED' ],
            [ 'Origin-Host', 'HSS.HOST'],
            [ 'Origin-Realm', 'HSS.REALM'],
            [ 'ULA-Flags', 1],
            [ 'Subscription-Data', [
                ['Subscriber-Status', 0]
                // ['MSISDN', new Buffer('03792900f3', 'hex')],
                // ['STN-SR', new Buffer('6103792900f0', 'hex')],
                // ['Network-Access-Mode(1417)', 'PACKET_AND_CIRCUIT (0)'],
                // ['Access-Restriction-Data(1426)', '0'],
                // ['APN-OI-Replacement(1427)', 'mnc012.mcc310.gprs'],
                // ['3GPP-Charging-Characteristics', 13],
                // ['AMBR', 1435],
                // ['APN-Configuration-Profile', 1429]
			]]
		]);
		event.callback(event.response);
		return event.response;
	},

	'Device-Watchdog': function (event) {
		event.response.body = event.response.body.concat([
			[ 'Result-Code', 'DIAMETER_SUCCESS'],
			[ 'Origin-Host', 'HSS.HOST'],
			[ 'Origin-Realm', 'HSS.REALM']
		]);
		event.callback(event.response);
		return event.response;
	}
}

module.exports.handle = function (request) {
	const id = counter;
	counter++;
	logger.info({logID:id, type: 'Request'}, request.message);
	const response = handlers[request.message.command](request);
	logger.info({logID:id, type: 'Response'}, response);
};

module.exports.handleExists = function (request) {
	if(typeof handlers[request.message.command] === 'function'){
		return true;
	}
	return false;
}