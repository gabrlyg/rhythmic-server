const rp = require('../lib/request-promise');

const checkUsername = JSON.stringify({
  username: 'test',
});

const checkEmail = JSON.stringify({
  email: 'test@example.com',
});

const options = {
  host: 'localhost',
  port: 3000,
  method: 'POST',
  path: '/user/availability',
  headers: {
    'Content-Type': 'application/json',
  }
}

const check = (options, info) => {
  return rp(options, info);
}

check({
  ...options,
  headers: {
    ...options.headers,
    'Content-Length': Buffer.byteLength(checkUsername),
  }
}, checkUsername).then((res) => {
  res.setEncoding('utf8');
  res.on('data', (data) => {
    console.log(data);
  });
  return rp({
    ...options,
    headers: {
      ...options.headers,
      'Content-Length': Buffer.byteLength(checkEmail),
    }
  }, checkEmail);
}).then((res) => {
  res.setEncoding('utf8');
  res.on('data', (data) => {
    console.log(data);
  });
}).catch((err) => {
  console.error(err);
});