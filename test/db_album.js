const Album = require('../models/Album');
const mongoose = require('mongoose');

const dbUri = 'mongodb://music_app:music_application@localhost:27017/music';
mongoose.connect(dbUri);
const db = mongoose.connection;
db.on('connected', console.log.bind(console, 'MongoDB connected'));
db.on('disconnected', console.log.bind(console, 'MongoDB disconnected'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const undergroundSix = {
  name: 'LP Underground 6',
  artists: [{
    id: '5af99eaa6889ed335810dc07',
    name: 'Linkin Park',
  }],
  genres: ['Alternative rock', 'Nu metal', 'Alternative metal', 'Rap rock', 'Electronic rock'],
  image: '/images/albums/underground_6_linkin_park.jpg',
  intro: 'LP Underground 6 is Linkin Park\'s sixth EP, and sixth release from their fanclub, the LP Underground. The EP contains six tracks, four of which are live recordings from the band\'s short Japan Tour in 2006. The EP\'s release coincided of the new version of the LP Underground, and was released on December 5, 2006.',
  release_date: new Date('2006-12-05'),
}

Album.readByArtist('Linkin Park').then(albums => {
  console.log(albums.toString());
}).catch(err => {
  console.error(err);
});