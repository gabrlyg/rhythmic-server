const mongoose = require('mongoose');
const Track = require('../../../models/Track');

const dbUri = 'mongodb://music_app:music_application@localhost:27017/music';
mongoose.connect(dbUri);
const db = mongoose.connection;
db.on('connected', console.log.bind(console, 'MongoDB connected'));
db.on('disconnected', console.log.bind(console, 'MongoDB disconnected'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const linkin_park = {
  id: '5acc735e660cd335183393e3',
  name: 'Linkin Park',
}
const hybrid_theory = {
  album: {
    id: '5af1033c1ef1861a30417d80',
    name: 'Hybrid Theory',
  },
  genres: [
    'Alternative rock',
    'Nu metal',
    'Alternative metal',
    'Rap rock',
    'Electronic rock'
  ],
  image: '/images/albums/hybrid_theory_linkin_park.jpg',
}

const tracks = [{
  ...hybrid_theory,
  name: 'Papercut',
  artists: [
    linkin_park,
  ],
  track_number: 1,
  uri: '/tracks/linkin_park/hybrid_theory/papercut.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/papercut.lrc',
}, {
  ...hybrid_theory,
  name: 'One Step Closer',
  artists: [
    linkin_park,
  ],
  track_number: 2,
  uri: '/tracks/linkin_park/hybrid_theory/one_step_closer.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/one_step_closer.lrc',
}, {
  ...hybrid_theory,
  name: 'With You',
  artists: [
    linkin_park,
  ],
  track_number: 3,
  uri: '/tracks/linkin_park/hybrid_theory/with_you.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/with_you.lrc',
}, {
  ...hybrid_theory,
  name: 'Points Of Authority',
  artists: [
    linkin_park,
  ],
  track_number: 4,
  uri: '/tracks/linkin_park/hybrid_theory/points_of_authority.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/points_of_authority.lrc',
}, {
  ...hybrid_theory,
  name: 'Crawling',
  artists: [
    linkin_park,
  ],
  track_number: 5,
  uri: '/tracks/linkin_park/hybrid_theory/crawling.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/crawling.lrc',
}, {
  ...hybrid_theory,
  name: 'Runaway',
  artists: [
    linkin_park,
  ],
  track_number: 6,
  uri: '/tracks/linkin_park/hybrid_theory/runaway.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/runaway.lrc',
}, {
  ...hybrid_theory,
  name: 'By Myself',
  artists: [
    linkin_park,
  ],
  track_number: 7,
  uri: '/tracks/linkin_park/hybrid_theory/by_myself.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/by_myself.lrc',
}, {
  ...hybrid_theory,
  name: 'In The End',
  artists: [
    linkin_park,
  ],
  track_number: 8,
  uri: '/tracks/linkin_park/hybrid_theory/in_the_end.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/in_the_end.lrc',
}, {
  ...hybrid_theory,
  name: 'A Place For My Head',
  artists: [
    linkin_park,
  ],
  track_number: 9,
  uri: '/tracks/linkin_park/hybrid_theory/a_place_for_my_head.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/a_place_for_my_head.lrc',
}, {
  ...hybrid_theory,
  name: 'Forgotten',
  artists: [
    linkin_park,
  ],
  track_number: 10,
  uri: '/tracks/linkin_park/hybrid_theory/forgotten.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/forgotten.lrc',
}, {
  ...hybrid_theory,
  name: 'Cure For The Itch',
  artists: [
    linkin_park,
  ],
  track_number: 11,
  uri: '/tracks/linkin_park/hybrid_theory/cure_for_the_itch.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/cure_for_the_itch.lrc',
}, {
  ...hybrid_theory,
  name: 'Pushing Me Away',
  artists: [
    linkin_park,
  ],
  track_number: 12,
  uri: '/tracks/linkin_park/hybrid_theory/pushing_me_away.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/pushing_me_away.lrc',
}, {
  ...hybrid_theory,
  name: 'My December',
  artists: [
    linkin_park,
  ],
  track_number: 13,
  uri: '/tracks/linkin_park/hybrid_theory/my_december.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/my_december.lrc',
}, {
  ...hybrid_theory,
  name: 'High Voltage',
  artists: [
    linkin_park,
  ],
  track_number: 14,
  uri: '/tracks/linkin_park/hybrid_theory/high_voltage.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/high_voltage.lrc',
}, {
  ...hybrid_theory,
  name: 'Papercut [Recorded Live At BBC1]',
  artists: [
    linkin_park,
  ],
  track_number: 15,
  uri: '/tracks/linkin_park/hybrid_theory/papercut_recorded_live_at_bbc1.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/papercut_recorded_live_at_bbc1.lrc',
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