const mongoose = require('mongoose');
const Artist = require('../../models/Artist');

const dbUri = 'mongodb://music_app:music_application@localhost:27017/music';
mongoose.connect(dbUri);
const db = mongoose.connection;
db.on('connected', console.log.bind(console, 'MongoDB connected'));
db.on('disconnected', console.log.bind(console, 'MongoDB disconnected'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const artists = [{
  name: 'Muse',
  image: '/images/artists/muse.jpg',
  bio: 'Muse\'s fusion of progressive rock, electronica, and Radiohead-influenced experimentation have helped them sell millions of records and top charts worldwide.',
  genres: [
    'Alternative rock',
    'Progressive rock',
    'Art rock',
    'Hard rock',
    'Space rock',
    'Electronica',
  ],
}, {
  name: 'Green Day',
  image: '/images/artists/green_day.jpg',
  bio: 'Green Day is an American punk rock band formed in 1986 by lead vocalist and guitarist Billie Joe Armstrong and bassist Mike Dirnt.',
  genres: [
    'Punk rock',
    'Pop rock',
    'Alternative rock',
  ],
}];

for (let a of artists) {
  Artist.create(a).then(result => {
    if (result) {
      console.log('Success: ' + a.name);
    } else {
      console.error('Failed: ' + a.name);
    }
  });
}
