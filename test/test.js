const request = require('supertest');
const app = require('../app');

request(app).get('/api/u/test').then(response => {
  console.log(response.statusCode);
  console.log(response.body);
});