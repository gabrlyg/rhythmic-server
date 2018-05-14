const http = require('http');

const RequestPromise = (options, data) => {
  return new Promise((executor, reject) => {
    const req = http.request(options, executor);
    req.on('error', reject);
    req.end(data);
  });
}

module.exports = RequestPromise;