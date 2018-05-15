const Album = require('../models/Album');
const Track = require('../models/Track');

exports.get = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else {
    Album.readOneById(id).then(album => {
      if (!album) {
        let err = new Error('Album not found');
        err.status = 404;
        next(err);
      } else {
        Track.readMany({ 'album.id': album._id }).then(tracks => {
          res.status(200).json({
            ...album._doc,
            tracks: tracks,
          });
        }).catch(error => {
          let err = new Error('Internal Server Error');
          err.status = 500;
          next(err);
        });
      }
    }).catch(error => {
      let err = new Error('Internal Server Error');
      err.status = 500;
      next(err);
      console.log(error);
    });
  }
}