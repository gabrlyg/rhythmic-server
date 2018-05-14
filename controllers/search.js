const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Track = require('../models/Track');

const internal_server_error = {
  error: 'Internal Server Error',
}

exports.get = (req, res) => {
  if (!req.query.keywords) {
    res.status(400).json({
      error: 'Bad Request',
    });
  } else {
    const keywords = new RegExp(keywords);
    switch (req.query.categories) {
      case 'artists': {
        Artist.search(keywords).then(artists => {
          res.status(200).json({
            items: artists,
          });
        }).catch(err => {
          res.status(500).json(internal_server_error);
          console.error(err);
        });
        break;
      }
      case 'albums': {
        Album.search(keywords).then(albums => {
          res.status(200).json({
            items: albums,
          });
        }).catch(err => {
          res.status(500).json(internal_server_error);
          console.error(err);
        });
        break;
      }
      case 'tracks': {
        Track.search(keywords).then(tracks => {
          res.status(200).json({
            items: tracks,
          });
        }).catch(err => {
          res.status(500).json(internal_server_error);
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
            }).catch(err => { throw err });
          }).catch(err => { throw err });
        }).catch(err => {
          res.status(500).json(internal_server_error);
          console.error(err);
        });
        break;
      }
    }
  }
}