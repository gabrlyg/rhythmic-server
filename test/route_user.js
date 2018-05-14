const SHA256 = require('crypto-js/sha256');
const rp = require('../lib/request-promise');
const secret = require('../config').secret;

const uname = JSON.stringify({
  username: 'test',
  password: SHA256('test').toString(),
});

const email = JSON.stringify({
  username: 'test',
  password: SHA256('test').toString(),
});

const unameCheck = JSON.stringify({
  username: 'test1',
});

// Login
rp({
  host: 'localhost',
  port: 3000,
  method: 'POST',
  path: '/login',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(uname),
  }
}, uname).then(result => {
  result.setEncoding('utf8');
  result.on('data', (data) => {
    console.log(data);
  });
}).catch((err) => {
  console.error(err);
});

// Check availability
// rp({
//   host: 'localhost',
//   port: '3000',
//   method: 'POST',
//   path: '/user/check',
//   headers: {
//     'Content-Type': 'application/json',
//     'Contetn-Length': Buffer.byteLength(unameCheck),
//   }
// }, unameCheck).then(result => {
//   result.setEncoding('utf8');
//   result.on('data', data => {
//     console.log(data);
//   });
// }).catch(err => {
//   console.error(err);
// });