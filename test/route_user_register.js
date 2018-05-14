const SHA256 = require('crypto-js/sha256');
const rp = require('../lib/request-promise');
const secret = require('../config').secret;

const body = JSON.stringify({
  username: 'test',
  email: 'test@example.com',
  password: SHA256('test').toString(),
});

const options = {
  host: 'localhost',
  port: 3000,
  method: 'POST',
  path: '/register',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  }
}

rp(options, body).then((result) => {
  result.setEncoding('utf8');
  result.on('data', (data) => {
    console.log(data);
  });
}).catch((err) => {
  console.error(err);
});