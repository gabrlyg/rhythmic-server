const Track = require('../models/Track');

exports.get = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else {
    Track.readOneById(id).then(track => {
      if (!track) {
        let err = new Error('Track not found');
        err.status = 404;
        next(err);
      } else {
        res.status(200).json(track);
      }
    }).catch(error => {
      let err = new Error('Internal Server Error');
      err.status = 500;
      next(err);
      console.error(err);
    });
  }
}