const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Track = require('../models/Track');

const internal_server_error = {
  error: 'Internal Server Error',
}

exports.get = (req, res, next) => {
  if (!req.query.keywords) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else {
    const keywords = new RegExp(keywords);
    switch (req.query.categories) {
      case 'artists': {
        Artist.search(keywords).then(artists => {
          res.status(200).json({
            items: artists,
          });
        }).catch(error => {
          let err = new Error('Internal Server Error');
          err.status = 500;
          next(err);
          console.error(error);
        });
        break;
      }
      case 'albums': {
        Album.search(keywords).then(albums => {
          res.status(200).json({
            items: albums,
          });
        }).catch(error => {
          let err = new Error('Internal Server Error');
          err.status = 500;
          next(err);
          console.error(error);
        });
        break;
      }
      case 'tracks': {
        Track.search(keywords).then(tracks => {
          res.status(200).json({
            items: tracks,
          });
        }).catch(error => {
          let err = new Error('Internal Server Error');
          err.status = 500;
          next(err);
          console.error(error);
        });
        break;
      }
      default: {
        Artist.search(keywords).then(artists => {
          Album.search(keywords).then(albums => {
            Track.search(keywords).then(tracks => {
              res.status(200).json({
                artists: artists,
                albums: albums,
                tracks: tracks,
              });
            }).catch(error => { throw error });
          }).catch(error => { throw error });
        }).catch(error => {
          let err = new Error('Internal Server Error');
          err.status = 500;
          next(err);
          console.error(error);
        });
        break;
      }
    }
  }
}