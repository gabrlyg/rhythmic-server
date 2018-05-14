const Playlist = require('../models/Playlist');
const Track = require('../models/Track');
const auth = require('../lib/auth');

const bad_request = {
  error: 'Bad Request',
}
const not_authorized = {
  error: 'Not Authorized',
}
const token_expired = {
  error: 'Token Expired',
}
const playlist_not_found = {
  error: 'Playlist not found',
}
const internal_server_error = {
  error: 'Internal Server Error',
}

// GET /playlist/:id
exports.get = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json(bad_request);
  } else {
    const result = {
      owner: '',
      name: '',
      image: '',
      items: [],
    }
    Playlist.readById(id).then(playlist => {
      if (!playlist) {
        res.status(404).json(playlist_not_found);
      } else {
        result.owner = playlist.owner;
        result.name = playlist.name;
        result.image = playlist.image;
        return Track.readManyById(playlist.tracks);
      }
    }).then(tracks => {
      if (tracks !== undefined) {
        result.items = tracks;
        res.status(200).json(result);
      }
    }).catch(err => {
      res.status(500).json(internal_server_error);
      console.error(err);
    });
  }
}

exports.create = (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).json(not_authorized);
  } else {
    const authorization = req.headers.authorization.split(' ');
    if (authorization[0] !== 'Bearer') {
      res.status(401).json(not_authorized);
    } else {
      const token = authorization[1];
      auth.authenticate(token).then(result => {
        if (!result) {
          res.status(401).json(token_expired);
        } else {
          const owner = result.user_id;
          const { name, image } = req.body;
          if (!name || !image) {
            res.status(400).json(bad_request);
          } else {
            return Playlist.create({
              owner: owner,
              name: name,
              image: image,
            });
          }
        }
      }).then(playlist => {
        if (playlist !== undefined) {
          res.status(201).json(playlist);
        }
      }).catch(err => {
        res.status(500).json(internal_server_error);
        console.error(err);
      });
    }
  }
}

exports.delete = (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).json(not_authorized);
  } else {
    const authorization = req.headers.authorization.split(' ');
    if (authorization[0] !== 'Bearer') {
      res.status(401).json(not_authorized);
    } else {
      const token = authorization[1];
      auth.authenticate(token).then(result => {
        if (!result) {
          res.status(401).json(token_expired);
        } else {
          return Playlist.delete(req.params.id);
        }
      }).then(playlist => {
        if (playlist === null) {
          res.status(204).json({
            message: 'Playlist deleted successfully',
          });
        }
      }).catch(err => {
        res.status(500).json(internal_server_error);
        console.error(err);
      });
    }
  }
}

exports.add = (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).json(not_authorized);
  } else {
    const authorization = req.headers.authorization.split(' ');
    if (authorization[0] !== 'Bearer') {
      res.status(401).json(not_authorized);
    } else {
      const token = authorization[1];
      auth.authenticate(token).then(result => {
        if (!result) {
          res.status(401).json(token_expired);
        } else {
          return Track.readOneById(req.params.track_id);
        }
      }).then(track => {
        if (track !== undefined) {
          if (!track) {
            res.status(404).json({
              error: 'Track not found',
            });
          } else {
            return Playlist.add(req.params.id, req.params.track_id);
          }
        }
      }).then(nPlaylist => {
        if (nPlaylist !== undefined) {
          if (!nPlaylist) {
            res.status(404).json(playlist_not_found);
          } else {
            res.status(201).json(nPlaylist);
          }
        }
      }).catch(err => {
        res.status(500).json(internal_server_error);
        console.error(err);
      });
    }
  }
}

exports.remove = (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).json(not_authorized);
  } else {
    const authorization = req.headers.authorization.split(' ');
    if (authorization[0] !== 'Bearer') {
      res.status(401).json(not_authorized);
    } else {
      const token = authorization[1];
      auth.authenticate(token).then(result => {
        if (!result) {
          res.status(401).json(token_expired);
        } else {
          return Playlist.remove(req.params.id, req.params.track_id);
        }
      }).then(nPlaylist => {
        if (nPlaylist !== undefined) {
          if (!nPlaylist) {
            res.status(404).json(playlist_not_found);
          } else {
            res.status(201).json(nPlaylist);
          }
        }
      }).catch(err => {
        res.status(500).json(internal_server_error);
        console.error(err);
      });
    }
  }
}