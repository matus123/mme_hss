'use strict';

const winston = require('winston');


const logger = new (winston.Logger)({
	transports: [
	  new (winston.transports.File)({ 
	  	name: 'trafficLog',
	  	filename: 'messages.log',
      level: 'info',
      handleExceptions: true,
      json: true
	  })
	],
	exitOnError: true
});


module.exports = logger;

