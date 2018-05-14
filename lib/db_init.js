const mongoose = require('mongoose');
const Artist = require('../models/Artist');

const dbUri = 'mongodb://music_app:music_application@localhost:27017/music';
mongoose.connect(dbUri);
const db = mongoose.connection;
db.on('connected', console.log.bind(console, 'MongoDB connected'));
db.on('disconnected', console.log.bind(console, 'MongoDB disconnected'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const linkin_park = {
  name: 'Linkin Park',
  image: '/images/artists/linkin_park.jpg',
  bio: 'Linkin Park is an American rock band from Agoura Hills, California. Formed in 1996, the band rose to international fame with their debut album Hybrid Theory (2000), which was certified Diamond by the RIAA in 2005 and multi-Platinum in several other countries.Their following studio album Meteora continued the band\'s success, topping the Billboard 200 album chart in 2003, and was followed by extensive touring and charity work.',
  genres: [
    'Alternative rock',
    'Nu metal',
    'Alternative metal',
    'Rap rock',
    'Electronic rock'
  ],
}
const muse = {
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
}

const 

// Artist.create(linkin_park)
//   .then(result => console.log(result))
//   .catch(err => console.error(err));

// Artist.update('5acc735e660cd335183393e3', {
//   intro: 'Linkin Park is an American rock band from Agoura Hills, California. Formed in 1996, the band rose to international fame with their debut album Hybrid Theory (2000), which was certified Diamond by the RIAA in 2005 and multi-Platinum in several other countries.Their following studio album Meteora continued the band\'s success, topping the Billboard 200 album chart in 2003, and was followed by extensive touring and charity work.'
// }).then(result => console.log(result))
//   .catch(err => console.error(err));