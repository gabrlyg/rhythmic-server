const mongoose = require('mongoose');
const User = require('../models/User');

const dbUri = 'mongodb://music_app:music_application@localhost:27017/music';
mongoose.connect(dbUri);
const db = mongoose.connection;
db.on('connected', console.log.bind(console, 'MongoDB connected'));
db.on('disconnected', console.log.bind(console, 'MongoDB disconnected'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

User.create({
  username: 'test1',
  email: 'test1@example.com',
  password: 'password',
}).then((user) => {
  console.log('Created');
  console.log(user);
  return User.create({
    username: 'test1',
    email: 'test1@example.com',
    password: 'password'
  });
}).then((user) => {
  console.log('Created Again');
  console.log(user);
  return User.update({ username: 'test1' }, { email: 'test1@update.com' });
}).then((user) => {
  console.log('Updated');
  console.log(user);
  return User.read({ username: 'test1' });
}).then((user) => {
  console.log('Read');
  console.log(user);
  return User.delete({ username: 'test1' });
}).then((user) => {
  console.log('Delete');
  console.log(user);
  return User.delete({ username: 'test1' });
}).then((user) => {
  console.log('Delete Again');
  console.log(user);
}).catch((err) => {
  console.log('Error');
  console.log(err.code);
});