const mongoose = require('mongoose');
const Track = require('../../../models/Track');
const dbUri = require('../../index').dbUri;

mongoose.connect(dbUri);
const db = mongoose.connection;
db.on('connected', console.log.bind(console, 'MongoDB connected'));
db.on('disconnected', console.log.bind(console, 'MongoDB disconnected'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const linkin_park = {
  id: '5af99eaa6889ed335810dc07',
  name: 'Linkin Park',
}
const meteora = {
  album: {
    id: '5af9a17e3ca8cf06908177b3',
    // id: '5af1033c1ef1861a30417d82', // laptop
    name: 'Meteora',
  },
  genres: [
    'Alternative rock',
    'Nu metal',
    'Alternative metal',
    'Rap rock',
    'Electronic rock'
  ],
  image: '/images/albums/meteora_linkin_park.jpg',
}

const tracks = [{
  ...meteora,
  name: 'Foreword',
  artists: [
    linkin_park,
  ],
  track_number: 1,
  uri: '/tracks/linkin_park/meteora/foreword.mp3',
  lyrics: '/lyrics/linkin_park/meteora/foreword.lrc',
}, {
  ...meteora,
  name: 'Don\'t Stay',
  artists: [
    linkin_park,
  ],
  track_number: 2,
  uri: '/tracks/linkin_park/meteora/don\'t_stay.mp3',
  lyrics: '/lyrics/linkin_park/meteora/don\'t_stay.lrc',
}, {
  ...meteora,
  name: 'Somewhere I Belong',
  artists: [
    linkin_park,
  ],
  track_number: 3,
  uri: '/tracks/linkin_park/meteora/somewhere_i_belong.mp3',
  lyrics: '/lyrics/linkin_park/meteora/somewhere_i_belong.lrc',
}, {
  ...meteora,
  name: 'Lyring From You',
  artists: [
    linkin_park,
  ],
  track_number: 4,
  uri: '/tracks/linkin_park/meteora/lying_from_you.mp3',
  lyrics: '/lyrics/linkin_park/meteora/lyring_from_you.lrc',
}, {
  ...meteora,
  name: 'Hit The Floor',
  artists: [
    linkin_park,
  ],
  track_number: 5,
  uri: '/tracks/linkin_park/meteora/hit_the_floor.mp3',
  lyrics: '/lyrics/linkin_park/meteora/hit_the_floor.lrc',
}, {
  ...meteora,
  name: 'Easier To Run',
  artists: [
    linkin_park,
  ],
  track_number: 6,
  uri: '/tracks/linkin_park/meteora/easier_to_run.mp3',
  lyrics: '/lyrics/linkin_park/meteora/easier_to_run.lrc',
}, {
  ...meteora,
  name: 'Faint',
  artists: [
    linkin_park,
  ],
  track_number: 7,
  uri: '/tracks/linkin_park/meteora/faint.mp3',
  lyrics: '/lyrics/linkin_park/meteora/faint.lrc',
}, {
  ...meteora,
  name: 'Figure.09',
  artists: [
    linkin_park,
  ],
  track_number: 8,
  uri: '/tracks/linkin_park/meteora/figure.09.mp3',
  lyrics: '/lyrics/linkin_park/meteora/figure.09.lrc',
}, {
  ...meteora,
  name: 'Breaking The Habit',
  artists: [
    linkin_park,
  ],
  track_number: 9,
  uri: '/tracks/linkin_park/meteora/breaking_the_habit.mp3',
  lyrics: '/lyrics/linkin_park/meteora/breaking_the_habit.lrc',
}, {
  ...meteora,
  name: 'From The Inside',
  artists: [
    linkin_park,
  ],
  track_number: 10,
  uri: '/tracks/linkin_park/meteora/from_the_inside.mp3',
  lyrics: '/lyrics/linkin_park/meteora/from_the_inside.lrc',
}, {
  ...meteora,
  name: 'Nobody\'s Listening',
  artists: [
    linkin_park,
  ],
  track_number: 11,
  uri: '/tracks/linkin_park/meteora/nobody\'s_listening.mp3',
  lyrics: '/lyrics/linkin_park/meteora/nobody\'s_listening.lrc',
}, {
  ...meteora,
  name: 'Session',
  artists: [
    linkin_park,
  ],
  track_number: 12,
  uri: '/tracks/linkin_park/meteora/session.mp3',
  lyrics: '/lyrics/linkin_park/meteora/session.lrc',
}, {
  ...meteora,
  name: 'Numb',
  artists: [
    linkin_park,
  ],
  track_number: 13,
  uri: '/tracks/linkin_park/meteora/numb.mp3',
  lyrics: '/lyrics/linkin_park/meteora/numb.lrc',
}];

for (let item of tracks) {
  Track.create(item).then(result => {
    if (result) {
      console.log('Success: ' + item.name);
    }
  }).catch(err => {
    console.error('Failed: ' + item.name);
  });
}