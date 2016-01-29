
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
	},

	'3GPP-Notify': function (event) {
		event.response.body = event.response.body.concat([
			[ 'Result-Code', 'DIAMETER_SUCCESS'],
			[ 'Auth-Session-State', 'NO_STATE_MAINTAINED' ],
			[ 'Origin-Host', 'HSS.HOST'],
			[ 'Origin-Realm', 'HSS.REALM']
		]);
		event.callback(event.response);
	},

	'3GPP-Update-Location': function (event) {
		event.response.body = event.response.body.concat([
			[ 'Result-Code', 'DIAMETER_SUCCESS'],
			[ 'Auth-Session-State', 'NO_STATE_MAINTAINED' ],
			[ 'Origin-Host', 'HSS.HOST'],
			[ 'Origin-Realm', 'HSS.REALM'],
			[ 'ULA-Flags', 1]
			// [ 'Subscription-Data', [
			// 	[]
			// ]]
		]);
		event.callback(event.response);
	},

	'Device-Watchdog': function (event) {
		event.response.body = event.response.body.concat([
			[ 'Result-Code', 'DIAMETER_SUCCESS'],
			[ 'Origin-Host', 'HSS.HOST'],
			[ 'Origin-Realm', 'HSS.REALM']
		]);
		event.callback(event.response);
	}
}

module.exports.handle = function (request) {
	return handlers[request.message.command](request);
};

module.exports.handleExists = function (request) {
	if(typeof handlers[request.message.command] === 'function'){
		return true;
	}
	return false;
}