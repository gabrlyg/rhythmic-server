const Album = require('../models/Album');
const Track = require('../models/Track');

exports.get = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({
      error: 'Bad Request',
    });
  } else {
    Album.readOneById(id).then(album => {
      if (!album) {
        res.status(404).json({
          error: 'Album not found',
        });
      } else {
        Track.readMany({ 'album.id': album._id }).then(tracks => {
          res.status(200).json({
            ...album._doc,
            tracks: tracks,
          });
        }).catch(err => { throw err });
      }
    }).catch(err => {
      res.status(500).json({
        error: 'Internal Server Error',
      });
      console.error(err);
    });
  }
}