'use strict';

const server = require('./server/server');

const HOST = '127.0.0.1';
const PORT = 3868;


server.listen(PORT, HOST);

console.log('Started DIAMETER server on ' + HOST + ':' + PORT);