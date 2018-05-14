const http = require('http');
const rp = require('../lib/request-promise');

const invalidToken = 'abcdefg';
const token = 'U2FsdGVkX1/Sk9K8mhZD0XQt6vCTISuocWOJ6+KcVPf1f2Egz8ZapH46a6OUd2S9LwZ4/e617XiFX6Yz8byrUg==';

body0 = JSON.stringify({
  expectedScope: 'user',
});
body1 = JSON.stringify({
  expectedScope: 'public',
});
body2 = JSON.stringify({
  expectedScope: 'admin',
});
body3 = JSON.stringify({});

const options = {
  host: 'localhost',
  port: 3000,
  method: 'POST',
  path: '/auth/authentication',
  headers: {
    'Content-Type': 'application/json',
  }
}

rp({
  ...options,
  headers: {
    ...options.headers,
    'Authorization': 'Bearer ' + token,
    'Content-Length': Buffer.byteLength(body0),
  }
}, body0).then((res) => {
  res.setEncoding('utf8');
  res.on('data', (data) => {
    console.log('User:');
    console.log(data);
  });
  res.on('error', (err) => { throw err });
  return rp({
    ...options,
    headers: {
      ...options.headers,
      'Authorization': 'Bearer ' + token,
      'Content-Length': Buffer.byteLength(body1),
    }
  }, body1);
}).then((res) => {
  res.setEncoding('utf8');
  res.on('data', (data) => {
    console.log('Public:');
    console.log(data);
  });
  res.on('error', (err) => { throw err });
  return rp({
    ...options,
    headers: {
      ...options.headers,
      'Authorization': 'Bearer ' + token,
      'Content-Length': Buffer.byteLength(body2),
    }
  }, body2);
}).then((res) => {
  res.setEncoding('utf8');
  res.on('data', (data) => {
    console.log('Invalid scope:');
    console.log(data);
  });
  res.on('error', (err) => { throw err });
  return rp({
    ...options,
    headers: {
      ...options.headers,
      'Authorization': 'Bearer ' + token,
      'Content-Length': Buffer.byteLength(body3),
    }
  }, body3);
}).then((res) => {
  res.setEncoding('utf8');
  res.on('data', (data) => {
    console.log('Bad request:');
    console.log(data);
  });
  res.on('error', (err) => { throw err });
  return rp({
    ...options,
    headers: {
      ...options.headers,
      'Authorization': 'Bearer ' + invalidToken,
      'Content-Length': Buffer.byteLength(body1),
    }
  }, body1);
}).then((res) => {
  res.setEncoding('utf8');
  res.on('data', (data) => {
    console.log('Invalid Token:');
    console.log(data);
  });
});