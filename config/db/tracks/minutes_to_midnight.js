const mongoose = require('mongoose');
const Track = require('../../../models/Track');
const dbUri = require('../../index').dbUri;

mongoose.connect(dbUri);
const db = mongoose.connection;
db.on('connected', console.log.bind(console, 'MongoDB connected'));
db.on('disconnected', console.log.bind(console, 'MongoDB disconnected'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const linkin_park = {
  // id: '5af99eaa6889ed335810dc07', // desktop
  id: '5afa76fc6ef5b30bb8ac3b80', // laptop
  name: 'Linkin Park',
}
const minutes_to_midnight = {
  album: {
    // id: '5af9a17e3ca8cf06908177b5', // desktop
    id: '5afa77a81a56492308712c51', // laptop
    name: 'Minutes To Midnight',
  },
  genres: [
    'Alternative rock',
    'Nu metal',
    'Alternative metal',
    'Rap rock',
    'Electronic rock'
  ],
  image: '/images/albums/minutes_to_midnight_linkin_park.jpg',
}
const tracks = [{
  ...minutes_to_midnight,
  name: 'Wake',
  artists: [
    linkin_park,
  ],
  track_number: 1,
  uri: '/tracks/linkin_park/minutes_to_midnight/wake.mp3',
  lyrics: '/lyrics/linkin_park/minutes_to_midnight/wake.lrc',
}, {
  ...minutes_to_midnight,
  name: 'Given Up',
  artists: [
    linkin_park,
  ],
  track_number: 2,
  uri: '/tracks/linkin_park/minutes_to_midnight/given_up.mp3',
  lyrics: '/lyrics/linkin_park/minutes_to_midnight/given_up.lrc',
}, {
  ...minutes_to_midnight,
  name: 'Leave Out All The Rest',
  artists: [
    linkin_park,
  ],
  track_number: 3,
  uri: '/tracks/linkin_park/minutes_to_midnight/leave_out_all_the_rest.mp3',
  lyrics: '/lyrics/linkin_park/minutes_to_midnight/leave_out_all_the_rest.lrc',
}, {
  ...minutes_to_midnight,
  name: 'Bleed It Out',
  artists: [
    linkin_park,
  ],
  track_number: 4,
  uri: '/tracks/linkin_park/minutes_to_midnight/bleed_it_out.mp3',
  lyrics: '/lyrics/linkin_park/minutes_to_midnight/bleed_it_out.lrc',
}, {
  ...minutes_to_midnight,
  name: 'Shadow Of The Day',
  artists: [
    linkin_park,
  ],
  track_number: 5,
  uri: '/tracks/linkin_park/minutes_to_midnight/shadow_of_the_day.mp3',
  lyrics: '/lyrics/linkin_park/minutes_to_midnight/shadow_of_the_day.lrc',
}, {
  ...minutes_to_midnight,
  name: 'What I\'ve Done',
  artists: [
    linkin_park,
  ],
  track_number: 6,
  uri: '/tracks/linkin_park/minutes_to_midnight/what_i\'ve_done.mp3',
  lyrics: '/lyrics/linkin_park/minutes_to_midnight/what_i\'ve_done.lrc',
}, {
  ...minutes_to_midnight,
  name: 'Hands Held High',
  artists: [
    linkin_park,
  ],
  track_number: 7,
  uri: '/tracks/linkin_park/minutes_to_midnight/hands_held_high.mp3',
  lyrics: '/lyrics/linkin_park/minutes_to_midnight/hands_held_high.lrc',
}, {
  ...minutes_to_midnight,
  name: 'No More Sorrow',
  artists: [
    linkin_park,
  ],
  track_number: 8,
  uri: '/tracks/linkin_park/minutes_to_midnight/no_more_sorrow.mp3',
  lyrics: '/lyrics/linkin_park/minutes_to_midnight/no_more_sorrow.lrc',
}, {
  ...minutes_to_midnight,
  name: 'Valentine\'s Day',
  artists: [
    linkin_park,
  ],
  track_number: 9,
  uri: '/tracks/linkin_park/minutes_to_midnight/valentine\'s_day.mp3',
  lyrics: '/lyrics/linkin_park/minutes_to_midnight/valentine\'s_day.lrc',
}, {
  ...minutes_to_midnight,
  name: 'In Between',
  artists: [
    linkin_park,
  ],
  track_number: 10,
  uri: '/tracks/linkin_park/minutes_to_midnight/in_between.mp3',
  lyrics: '/lyrics/linkin_park/minutes_to_midnight/in_pieces.mp3',
}, {
  ...minutes_to_midnight,
  name: 'In Pieces',
  artists: [
    linkin_park,
  ],
  track_number: 11,
  uri: '/tracks/linkin_park/minutes_to_midnight/in_pieces.mp3',
  lyrics: '/lyrics/linkin_park/minutes_to_midnight/in_pieces.lrc',
}, {
  ...minutes_to_midnight,
  name: 'The Little Things Give You Away',
  artists: [
    linkin_park,
  ],
  track_number: 12,
  uri: '/tracks/linkin_park/minutes_to_midnight/the_little_things_give_you_away.mp3',
  lyrics: '/lyrics/linkin_park/minutes_to_midnight/the_little_things_give_you_away.lrc',
}];

let cnt = 0;
const count = () => {
  cnt++;
  if (cnt === tracks.length) {
    console.log('Finished!');
  }
}

for (let item of tracks) {
  Track.create(item).then(result => {
    if (result) {
      console.log('Success: ' + item.name);
      count();
    }
  }).catch(err => {
    console.error('Failed: ' + item.name);
    count();
  });
}