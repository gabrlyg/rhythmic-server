const mongoose = require('mongoose');
const Track = require('../../models/Track');

const dbUri = 'mongodb://music_app:music_application@localhost:27017/music';
mongoose.connect(dbUri);
const db = mongoose.connection;
db.on('connected', console.log.bind(console, 'MongoDB connected'));
db.on('disconnected', console.log.bind(console, 'MongoDB disconnected'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const linkin_park = {
  artist: {
    id: '5acc735e660cd335183393e3',
    name: 'Linkin Park',
  },
  genres: [
    'Alternative rock',
    'Nu metal',
    'Alternative metal',
    'Rap rock',
    'Electronic rock'
  ],
}

const hybrid_theory = {
  album: {
    id: '5af1033c1ef1861a30417d80',
    name: 'Hybrid Theory',
  },
  genres: linkin_park.genres,
  image: '/images/albums/hybrid_theory_linkin_park.jpg',
}
const meteora = {
  album: {
    id: '5af1033c1ef1861a30417d82',
    name: 'Meteora',
  },
  genres: linkin_park.genres,
  image: '/images/albums/meteora_linkin_park.jpg',
}
const minutes_to_midnight = {
  album: {
    id: '5af1033c1ef1861a30417d84',
    name: 'Minutes To Midnight',
  },
  genres: linkin_park.genres,
  image: '/images/albums/minutes_to_midnight_linkin_park.jpg',
}
const a_thousand_suns = {
  album: {
    id: '5af1033c1ef1861a30417d86',
    name: 'A Thousand Suns',
  },
  genres: linkin_park.genres,
  image: '/images/albums/a_thousand_suns_linkin_park.jpg',
}
const road_to_revolution = {
  album: {
    id: '5af1033c1ef1861a30417d88',
    name: 'Road To Revolution: Live At Milton Keynes',
  },
  genres: linkin_park.genres,
  image: '/images/albums/road_to_revolution_linkin_park.jpg',
}
const living_things = {
  album: {
    id: '5af1033c1ef1861a30417d8a',
    name: 'LIVING THINGS',
  },
  genres: linkin_park.genres,
  image: '/images/albums/living_things_linkin_park.jpg',
}
const the_hunting_party = {
  album: {
    id: '5af1033c1ef1861a30417d8c',
    name: 'The Hunting Party',
  },
  genres: linkin_park.genres,
  image: '/images/albums/the_hunting_party_linkin_park.jpg',
}
const one_more_light = {
  album: {
    id: '5af1033c1ef1861a30417d8e',
    name: 'One More Light',
  },
  genres: linkin_park.genres,
  image: '/images/albums/one_more_light_linkin_park.jpg',
}
const one_more_light_live = {
  album: {
    id: '5af1033c1ef1861a30417d90',
    name: 'One More Light (Live)',
  },
  genres: linkin_park.genres,
  image: '/images/albums/one_more_light_live_linkin_park.jpg',
}
const showbiz = {
  album: {
    id: '5af1033c1ef1861a30417d92',
    name: 'Showbiz',
  },
  genres: muse.genres,
  image: '/images/albums/showbiz_muse.jpg',
}
const origin_of_symmetry = {
  album: {
    id: '5af1033c1ef1861a30417d94',
    name: 'Origin Of Symmetry',
  },
  genres: muse.genres,
  image: '/images/albums/origin_of_symmetry_muse.jpg',
}
const absolution = {
  album: {
    id: '5af1033c1ef1861a30417d96',
    name: 'Absolution',
  },
  genres: muse.genres,
  image: '/images/albums/absolution_muse.jpg',
}
const black_holes_and_revelation = {
  album: {
    id: '5af1033c1ef1861a30417d98',
    name: 'Black Holes And Revelations',
  },
  genres: muse.genres,
  image: '/images/albums/black_holes_and_revelations_muse.jpg',
}
const the_resistance = {
  album: {
    id: '5af1033c1ef1861a30417d9a',
    name: 'The Resistance',
  },
  genres: muse.genres,
  image: '/images/albums/the_resistance_muse.jpg',
}
const the_2nd_law = {
  album: {
    id: '5af1033c1ef1861a30417d9c',
    name: 'The 2nd Law',
  },
  genres: muse.genres,
  image: '/images/albums/the_2nd_law_muse.jpg',
}
const live_at_rome = {
  album: {
    id: '5af1033c1ef1861a30417d9e',
    name: 'Live At Rome Olympic Stadium'
  },
  genres: muse.genres,
  image: '/images/albums/live_at_rome_olympic_stadium_muse.jpg',
}
const drones = {
  album: {
    id: '5af1033c1ef1861a30417da0',
    name: 'Drones',
  },
  genres: muse.genres,
  image: '/images/albums/drones_muse.jpg',
}
const dig_down = {
  album: {
    id: '5af1033c1ef1861a30417da2',
    name: 'Dig Down',
  },
  genres: muse.genres,
  image: '/images/albums/dig_down_muse.jpg',
}
const thought_contagion = {
  album: {
    id: '5af1033c1ef1861a30417da4',
    name: 'Thought Contagion',
  },
  genres: muse.genres,
  image: '/images/albums/thought_contagion_muse.jpg"',
}
const american_idiot = {
  album: {
    id: '5af1033c1ef1861a30417da6',
    name: 'American Idiot',
  },
  genres: green_day.genres,
  image: '/images/albums/american_idiot_green_day.jpg',
}
const tre = {
  album: {
    id: '5af1033c1ef1861a30417da8',
    name: '¡TRÉ!',
  },
  genres: green_day.genres,
  image: '/images/albums/¡TRÉ!_greed_day.jpg',
}
const dos = {
  album: {
    id: '5af1033c1ef1861a30417daa',
    name: '¡DOS!',
  },
  genres: green_day.genres,
  image: '/images/albums/¡DOS!_green_day.jpg',
}
const uno = {
  album: {
    id: '5af1033c1ef1861a30417dac',
    name: '¡UNO!',
  },
  genres: green_day.genres,
  image: '/images/albums/¡UNO!_green_day.jpg',
}
const twenty1stcentruybreakdown = {
  album: {
    id: '5af1033c1ef1861a30417dae',
    name: '21st Century Breakdown',
  },
  genres: green_day.genres,
  image: '/images/albums/21st_century_breakdown_green_day.jpg',
}
const theoriginalbroadwaycasting = {
  album: {
    id: '5af1033c1ef1861a30417db0',
    name: 'The Original Broadway Cast Recording \'American Idiot\' Featuring Green Day',
  },
  genres: green_day.genres,
  image: '/images/albums/the_original_broadway_cast_recording_american_idiot_green_day.jpg',
}
const revolution_radio = {
  album: {
    id: '5af1033c1ef1861a30417db2',
    name: 'Revolution Radio',
  },
  genres: green_day.genres,
  image: '/images/albums/revolution_radio_green_day.jpg',
}
const tracks = [{
  ...hybrid_theory,
  name: 'Papercut',
  artists: [
    linkin_park.artist,
  ],
  track_number: 1,
  uri: '/tracks/linkin_park/hybrid_theory/papercut.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/papercut.lrc',
},{
  ...hybrid_theory,
  name: 'One Step Closer',
  artists: [
    linkin_park.artist,
  ],
  track_number: 2,
  uri: '/tracks/linkin_park/hybrid_theory/one_step_closer.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/one_step_closer.lrc',
},{
  ...hybrid_theory,
  name: 'With You',
  artists: [
    linkin_park.artist,
  ],
  track_number: 3,
  uri: '/tracks/linkin_park/hybrid_theory/with_you.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/with_you.lrc',
},{
  ...hybrid_theory,
  name: 'Points Of Authority',
  artists: [
    linkin_park.artist,
  ],
  track_number: 4,
  uri: '/tracks/linkin_park/hybrid_theory/points_of_authority.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/points_of_authority.lrc',
},{
  ...hybrid_theory,
  name: 'Crawling',
  artists: [
    linkin_park.artist,
  ],
  track_number: 5,
  uri: '/tracks/linkin_park/hybrid_theory/crawling.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/crawling.lrc',
},{
  ...hybrid_theory,
  name: 'Runaway',
  artists: [
    linkin_park.artist,
  ],
  track_number: 6,
  uri: '/tracks/linkin_park/hybrid_theory/runaway.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/runaway.lrc',
},{
  ...hybrid_theory,
  name: 'By Myself',
  artists: [
    linkin_park.artist,
  ],
  track_number: 7,
  uri: '/tracks/linkin_park/hybrid_theory/by_myself.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/by_myself.lrc',
},{
  ...hybrid_theory,
  name: 'In The End',
  artists: [
    linkin_park.artist,
  ],
  track_number: 8,
  uri: '/tracks/linkin_park/hybrid_theory/in_the_end.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/in_the_end.lrc',
},{
  ...hybrid_theory,
  name: 'A Place For My Head',
  artists: [
    linkin_park.artist,
  ],
  track_number: 9,
  uri: '/tracks/linkin_park/hybrid_theory/a_place_for_my_head.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/a_place_for_my_head.lrc',
},{
  ...hybrid_theory,
  name: 'Forgotten',
  artists: [
    linkin_park.artist,
  ],
  track_number: 10,
  uri: '/tracks/linkin_park/hybrid_theory/forgotten.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/forgotten.lrc',
},{
  ...hybrid_theory,
  name: 'Cure For The Itch',
  artists: [
    linkin_park.artist,
  ],
  track_number: 11,
  uri: '/tracks/linkin_park/hybrid_theory/cure_for_the_itch.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/cure_for_the_itch.lrc',
},{
  ...hybrid_theory,
  name: 'Pushing Me Away',
  artists: [
    linkin_park.artist,
  ],
  track_number: 12,
  uri: '/tracks/linkin_park/hybrid_theory/pushing_me_away.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/pushing_me_away.lrc',
},{
  ...hybrid_theory,
  name: 'My December',
  artists: [
    linkin_park.artist,
  ],
  track_number: 13,
  uri: '/tracks/linkin_park/hybrid_theory/my_december.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/my_december.lrc',
},{
  ...hybrid_theory,
  name: 'High Voltage',
  artists: [
    linkin_park.artist,
  ],
  track_number: 14,
  uri: '/tracks/linkin_park/hybrid_theory/high_voltage.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/high_voltage.lrc',
},{
  ...hybrid_theory,
  name: 'Papercut [Recorded Live At BBC1]',
  artists: [
    linkin_park.artist,
  ],
  track_number: 15,
  uri: '/tracks/linkin_park/hybrid_theory/papercut_recorded_live_at_bbc1.mp3',
  lyrics: '/lyrics/linkin_park/hybrid_theory/papercut_recorded_live_at_bbc1.lrc',
}];