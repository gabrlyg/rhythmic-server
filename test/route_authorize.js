const User = require('../models/User');
const rp = require('../lib/request-promise');

const info = JSON.stringify({
  userId: '5a9e43beff350b33e83b9234',
  password: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
  scope: ['user', 'public'],
});
const info1 = JSON.stringify({
  userId: '5a9e43beff350b33e83b9234',
  scope: ['user', 'public'],
});
const info2 = JSON.stringify({
  userId: '5a9e43beff350b33e83b9234',
  password: 'abcdefg',
  scope: ['user', 'public'],
});
const info3 = JSON.stringify({
  userId: '5a9e43beff350b33e83b9231',
  password: 'abcdefg',
  scope: ['user', 'public'],
});
const info4 = JSON.stringify({
  userId: '5a9e43beff350b33e83b9234',
  password: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
  scope: ['admin'],
});

const options = {
  host: 'localhost',
  port: 3000,
  method: 'POST',
  path: '/auth/authorization',
  headers: {
    'Content-Type': 'application/json',
  }
}

const test = (options, body) => {
  return rp(options, body);
}

test({
  ...options,
  headers: {
    ...options.headers,
    'Content-Length': Buffer.byteLength(info),
  }
}, info).then((res) => {
  res.setEncoding('utf8');
  res.on('data', (data) => {
    console.log('Correct info:');
    console.log(data);
  });
  return rp({
    ...options,
    'Content-Length': Buffer.byteLength(info1),
  }, info1);
}).then((res) => {
  res.setEncoding('utf8');
  res.on('data', (data) => {
    console.log('Incomplete data:');
    console.log(data);
  });
  return rp({
    ...options,
    headers: {
      ...options.headers,
      'Content-Length': Buffer.byteLength(info2),
    }
  }, info2);
}).then((res) => {
  res.setEncoding('utf8');
  res.on('data', (data) => {
    console.log('Incorrect credentials:');
    console.log(data);
  });
  return rp({
    ...options,
    headers: {
      ...options.headers,
      'Content-Length': Buffer.byteLength(info3),
    }
  }, info3);
}).then((res) => {
  res.setEncoding('utf8');
  res.on('data', (data) => {
    console.log('Non-exist user:');
    console.log(data);
  });
  return rp({
    ...options,
    headers: {
      ...options.headers,
      'Content-Length': Buffer.byteLength(info4),
    }
  }, info4);
}).then((res) => {
  res.setEncoding('utf8');
  res.on('data', (data) => {
    console.log('Invalid scope:');
    console.log(data);
  });
}).catch((err) => {
  console.error(err);
});
