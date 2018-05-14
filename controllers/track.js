const Track = require('../models/Track');

exports.get = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({
      error: 'Bad Request',
    });
  } else {
    Track.readOneById(id).then(track => {
      if (!track) {
        res.status(404).json({
          error: 'Track not found',
        });
      } else {
        res.status(200).json(track);
      }
    }).catch(err => {
      res.status(500).json({
        error: 'Internal Server Error',
      });
      console.error(err);
    });
  }
}