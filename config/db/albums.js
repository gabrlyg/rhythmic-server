const mongoose = require('mongoose');
const Album = require('../../models/Album');

const dbUri = 'mongodb://music_app:music_application@localhost:27017/music';
mongoose.connect(dbUri);
const db = mongoose.connection;
db.on('connected', console.log.bind(console, 'MongoDB connected'));
db.on('disconnected', console.log.bind(console, 'MongoDB disconnected'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const albums = [{
  name: 'Hybrid Theory',
  artists: [{
    id: '5acc735e660cd335183393e3',
    name: 'Linkin Park',
  }],
  genres: ['Alternative rock', 'Nu metal', 'Alternative metal', 'Rap rock', 'Electronic rock'],
  image: '/images/albums/hybrid_theory_linkin_park.jpg',
  release_date: new Date('2000-10-24'),
}, {
  name: 'Meteora',
  artists: [{
    id: '5acc735e660cd335183393e3',
    name: 'Linkin Park',
  }],
  genres: ['Alternative rock', 'Nu metal', 'Alternative metal', 'Rap rock', 'Electronic rock'],
  image: '/images/albums/meteora_linkin_park.jpg',
  release_date: new Date('2003-01-01'),
}, {
  name: 'Minutes To Midnight',
  artists: [{
    id: '5acc735e660cd335183393e3',
    name: 'Linkin Park',
  }],
  genres: ['Alternative rock', 'Nu metal', 'Alternative metal', 'Rap rock', 'Electronic rock'],
  image: '/images/albums/minutes_to_midnight_linkin_park.jpg',
  release_date: new Date('2007-06-06'),
}, {
  name: 'A Thousand Suns',
  artists: [{
    id: '5acc735e660cd335183393e3',
    name: 'Linkin Park',
  }],
  genres: ['Alternative rock', 'Nu metal', 'Alternative metal', 'Rap rock', 'Electronic rock'],
  image: '/images/albums/a_thousand_suns_linkin_park.jpg',
  release_date: new Date('2010-09-08'),
}, {
  name: 'Road To Revolution: Live At Milton Keynes',
  artists: [{
    id: '5acc735e660cd335183393e3',
    name: 'Linkin Park',
  }],
  genres: ['Alternative rock', 'Nu metal', 'Alternative metal', 'Rap rock', 'Electronic rock'],
  image: '/images/albums/road_to_revolution_linkin_park.jpg',
  release_date: new Date('2008-11-24'),
}, {
  name: 'LIVING THINGS',
  artists: [{
    id: '5acc735e660cd335183393e3',
    name: 'Linkin Park',
  }],
  genres: ['Alternative rock', 'Nu metal', 'Alternative metal', 'Rap rock', 'Electronic rock'],
  image: '/images/albums/living_things_linkin_park.jpg',
  release_date: new Date('2012-06-25'),
}, {
  name: 'The Hunting Party',
  artists: [{
    id: '5acc735e660cd335183393e3',
    name: 'Linkin Park',
  }],
  genres: ['Alternative rock', 'Nu metal', 'Alternative metal', 'Rap rock', 'Electronic rock'],
  image: '/images/albums/the_hunting_party_linkin_park.jpg',
  release_date: new Date('2014-06-13'),
}, {
  name: 'One More Light',
  artists: [{
    id: '5acc735e660cd335183393e3',
    name: 'Linkin Park',
  }],
  genres: ['Alternative rock', 'Nu metal', 'Alternative metal', 'Rap rock', 'Electronic rock'],
  image: '/images/albums/one_more_light_linkin_park.jpg',
  release_date: new Date('2017-05-19'),
}, {
  name: 'One More Light (Live)',
  artists: [{
    id: '5acc735e660cd335183393e3',
    name: 'Linkin Park',
  }],
  genres: ['Alternative rock', 'Nu metal', 'Alternative metal', 'Rap rock', 'Electronic rock'],
  image: '/images/albums/one_more_light_live_linkin_park.jpg',
  release_date: new Date('2017-11-15'),
}, {
  name: 'Showbiz',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db0',
    name: 'Muse',
  }],
  genres: [
    'Alternative rock',
    'Progressive rock',
    'Art rock',
    'Hard rock',
    'Space rock',
    'Electronica'],
  image: '/images/albums/showbiz_muse.jpg',
  release_date: new Date('1999-09-07'),
}, {
  name: 'Origin Of Symmetry',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db0',
    name: 'Muse',
  }],
  genres: [
    'Alternative rock',
    'Progressive rock',
    'Art rock',
    'Hard rock',
    'Space rock',
    'Electronica'],
  image: '/images/albums/origin_of_symmetry_muse.jpg',
  release_date: new Date('2001-07-17'),
}, {
  name: 'Absolution',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db0',
    name: 'Muse',
  }],
  genres: [
    'Alternative rock',
    'Progressive rock',
    'Art rock',
    'Hard rock',
    'Space rock',
    'Electronica'],
  image: '/images/albums/absolution_muse.jpg',
  release_date: new Date('2003-09-15'),
}, {
  name: 'Black Holes And Revelations',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db0',
    name: 'Muse',
  }],
  genres: [
    'Alternative rock',
    'Progressive rock',
    'Art rock',
    'Hard rock',
    'Space rock',
    'Electronica'],
  image: '/images/albums/black_holes_and_revelations_muse.jpg',
  release_date: new Date('2006-06-01'),
}, {
  name: 'The Resistance',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db0',
    name: 'Muse',
  }],
  genres: [
    'Alternative rock',
    'Progressive rock',
    'Art rock',
    'Hard rock',
    'Space rock',
    'Electronica'],
  image: '/images/albums/the_resistance_muse.jpg',
  release_date: new Date('2009-09-14'),
}, {
  name: 'The 2nd Law',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db0',
    name: 'Muse',
  }],
  genres: [
    'Alternative rock',
    'Progressive rock',
    'Art rock',
    'Hard rock',
    'Space rock',
    'Electronica'],
  image: '/images/albums/the_2nd_law_muse.jpg',
  release_date: new Date('2012-10-01'),
}, {
  name: 'Live At Rome Olympic Stadium',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db0',
    name: 'Muse',
  }],
  genres: [
    'Alternative rock',
    'Progressive rock',
    'Art rock',
    'Hard rock',
    'Space rock',
    'Electronica'],
  image: '/images/albums/live_at_rome_olympic_stadium_muse.jpg',
  release_date: new Date('2013-12-03'),
}, {
  name: 'Drones',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db0',
    name: 'Muse',
  }],
  genres: [
    'Alternative rock',
    'Progressive rock',
    'Art rock',
    'Hard rock',
    'Space rock',
    'Electronica'],
  image: '/images/albums/drones_muse.jpg',
  release_date: new Date('2015-06-05'),
}, {
  name: 'Dig Down',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db0',
    name: 'Muse',
  }],
  genres: [
    'Alternative rock',
    'Progressive rock',
    'Art rock',
    'Hard rock',
    'Space rock',
    'Electronica'],
  image: '/images/albums/dig_down_muse.jpg',
  release_date: new Date('2017-05-19'),
}, {
  name: 'Thought Contagion',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db0',
    name: 'Muse',
  }],
  genres: [
    'Alternative rock',
    'Progressive rock',
    'Art rock',
    'Hard rock',
    'Space rock',
    'Electronica'],
  image: '/images/albums/thought_contagion_muse.jpg',
  release_date: new Date('2018-02-15'),
}, {
  name: 'American Idiot',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db1',
    name: 'Green Day',
  }],
  genres: [
    'Punk rock',
    'Pop rock',
    'Alternative rock'],
  image: '/images/albums/american_idiot_green_day.jpg',
  release_date: new Date('2004-09-21'),
}, {
  name: '¡TRÉ!',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db1',
    name: 'Green Day',
  }],
  genres: [
    'Punk rock',
    'Pop rock',
    'Alternative rock'],
  image: '/images/albums/¡TRÉ!_greed_day.jpg',
  release_date: new Date('2012-12-10'),
}, {
  name: '¡DOS!',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db1',
    name: 'Green Day',
  }],
  genres: [
    'Punk rock',
    'Pop rock',
    'Alternative rock'],
  image: '/images/albums/¡DOS!_green_day.jpg',
  release_date: new Date('2012-11-13'),
}, {
  name: '¡UNO!',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db1',
    name: 'Green Day',
  }],
  genres: [
    'Punk rock',
    'Pop rock',
    'Alternative rock'],
  image: '/images/albums/¡UNO!_green_day.jpg',
  release_date: new Date('2012-09-24'),
}, {
  name: '21st Century Breakdown',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db1',
    name: 'Green Day',
  }],
  genres: [
    'Punk rock',
    'Pop rock',
    'Alternative rock'],
  image: '/images/albums/21st_century_breakdown_green_day.jpg',
  release_date: new Date('2009-05-15'),
}, {
  name: 'The Original Broadway Cast Recording \'American Idiot\' Featuring Green Day',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db1',
    name: 'Green Day',
  }],
  genres: [
    'Punk rock',
    'Pop rock',
    'Alternative rock'],
  image: '/images/albums/the_original_broadway_cast_recording_american_idiot_green_day.jpg',
  release_date: new Date('2010-04-20'),
}, {
  name: 'Revolution Radio',
  artists: [{
    id: '5af0f7ed98eb702d5cec8db1',
    name: 'Green Day',
  }],
  genres: [
    'Punk rock',
    'Pop rock',
    'Alternative rock'],
  image: '/images/albums/revolution_radio_green_day.jpg',
  release_date: new Date('2016-10-07'),
}];

for (let item of albums) {
  Album.create(item).then(result => {
    if (result) {
      console.log('Success: ' + item.name);
    }
  }).catch(err => {
    console.error(err);
  });
}