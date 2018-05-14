const rp = require('../lib/request-promise');
const config = require('../config');

exports.authorize = (result, scope) => {
  const body = JSON.stringify({
    userId: result._id,
    password: result.password,
    scope: scope,
  });
  return rp({
    host: config.authServerHost,
    port: config.authServerPort,
    method: 'POST',
    path: '/auth/authorization',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    }
  }, body);
}

exports.authenticate = (req, expectedScope) => {
  return rp({
    host: config.authServerHost,
    port: config.authServerPort,
    method: 'POST',
    path: '/auth/authentication',
    headers: {
      'Authorization': req.headers.authorization,
    }
  }, { expectedScope: expectedScope });
}