const mongoose = require('mongoose');
const AES = require('crypto-js/AES');
const User = require('../models/User');
const Track = require('../models/Track');
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const secret = require('../config').secret;

const dbUri = 'mongodb://music_app:music_application@localhost:27017/music';
mongoose.connect(dbUri);
const db = mongoose.connection;
db.on('connected', console.log.bind(console, 'MongoDB connected'));
db.on('disconnected', console.log.bind(console, 'MongoDB disconnected'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userInfo = {
  username: 'test',
  email: 'test@example.com',
  password: AES.encrypt('test', secret).toString(),
}

// User.create(userInfo).then((result) => {
//   console.log('Created');
//   console.log(JSON.stringify(result));
//   return User.readByUsername('test');
// }).then((user) => {
//   console.log('Found');
//   console.log(JSON.stringify(user));
//   // return User.readByUsername('abc');
// })/*.then((result) => {
//   if (result === null) {
//     console.log('Not found');
//   } else {
//     console.log(JSON.stringify(result));
//   }
//   return User.updateByUsername('test', { email: 'change@example.com' });
// }).then((result) => {
//   console.log('Changed');
//   console.log(JSON.stringify(result));
//   return User.deleteByUsername('test');
// }).then((result) => {
//   console.log('Deleted');
//   console.log(JSON.stringify(result));
// })*/.catch((err) => {
//   console.log('Error');
//   console.error(err);
// });

// User.getTracks('test1').then(uTracks => {
//   console.log(uTracks);
// });

// User.addToArtists('5a9e43beff350b33e83b9234', '5af99eaa6889ed335810dc07').then(user => {
//   console.log(user);
//   return Artist.readManyById(user.artists);
// }).then(artists => {
//   console.log(artists);
// });

// User.deleteFromArtists('5a9e43beff350b33e83b9234', '5af99eaa6889ed335810dc07').then(u => {
//   console.log(u);
// })
