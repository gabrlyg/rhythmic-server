const Artist = require('../models/Artist');
const Album = require('../models/Album');

exports.get = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else {
    Artist.readById(id).then(artist => {
      if (!artist) {
        let err = new Error('Artist not found');
        err.status = 404;
        next(err);
      } else {
        Album.readByArtist(artist.name).then(albums => {
          if (albums !== undefined) {
            res.status(200).json({
              ...artist,
              albums: albums,
            });
          }
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
      console.error(error);
    });
  }
}