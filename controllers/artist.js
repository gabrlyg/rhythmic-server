const Artist = require('../models/Artist');
const Album = require('../models/Album');

exports.get = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({
      error: 'Bad Request'
    });
  } else {
    Artist.readById(id).then(artist => {
      if (!artist) {
        res.status(404).json({ error: 'Artist not found' });
      } else {
        Album.readByArtist(artist.name).then(albums => {
          if (albums !== undefined) {
            res.status(200).json({
              ...artist,
              albums: albums,
            });
          }
        }).catch(err => { throw err });
      }
    }).catch(err => {
      res.status(500).json({ error: 'Internal Server Error' });
      console.error(err);
    });
  }
}