const mongoose = require('mongoose');
const AES = require('crypto-js/AES');
const Auth = require('../models/Auth');
const auth = require('../lib/auth');
const secret = require('../config').secret;

const dbUri = 'mongodb://music_app:music_application@localhost:27017/music';
mongoose.connect(dbUri);
const db = mongoose.connection;
db.on('connected', console.log.bind(console, 'MongoDB connected'));
db.on('disconnected', console.log.bind(console, 'MongoDB disconnected'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const user_id = '5a9e43beff350b33e83b9234';
const genToken = (user_id, issueTime) => {
  return AES.encrypt(issueTime.getTime().toString() +
    user_id, secret).toString();
}
const twentyFiveDaysAgo = new Date();
twentyFiveDaysAgo.setDate(twentyFiveDaysAgo.getDate() -25);
const token = genToken(user_id, twentyFiveDaysAgo);
Auth.create({
  token: token,
  issueTime: twentyFiveDaysAgo,
  user: { id: user_id },
}).then(result => {
  console.log(result);
  console.log('***********');
  return auth.authenticate(token);
}).then(nResult => {
  console.log(nResult);
});
