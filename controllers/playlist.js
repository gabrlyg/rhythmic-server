const Playlist = require('../models/Playlist');
const Track = require('../models/Track');
const auth = require('../lib/auth');

// GET /playlist/:id
exports.get = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else {
    const result = {
      owner: '',
      name: '',
      image: '',
      items: [],
    }
    Playlist.readById(id).then(playlist => {
      if (!playlist) {
        let err = new Error('Playlist not found');
        err.status = 404;
        next(err);
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
    }).catch(error => {
      let err = new Error('Internal Server Error');
      err.status = 500;
      next(err);
      console.log(error);
    });
  }
}

exports.create = (req, res, next) => {
  if (!req.headers.authorization) {
    let err = new Error('Not Authorized');
    err.status = 401;
    next(err);
  } else {
    const authorization = req.headers.authorization.split(' ');
    if (authorization[0] !== 'Bearer') {
      let err = new Error('Not Authorized');
      err.status = 401;
      next(err);
    } else {
      const token = authorization[1];
      auth.authenticate(token).then(result => {
        if (!result) {
          let err = new Error('Token Expired');
          err.status = 401;
          next(err);
        } else {
          const owner = result.user_id;
          const { name, image } = req.body;
          if (!name || !image) {
            let err = new Error('Bad Request');
            err.status = 400;
            next(err);
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
      }).catch(error => {
        let err = new Error('Internal Server Error');
        err.status = 500;
        next(err);
        console.log(error);
      });
    }
  }
}

exports.delete = (req, res, next) => {
  if (!req.headers.authorization) {
    let err = new Error('Not Authorized');
    err.status = 401;
    next(err);
  } else {
    const authorization = req.headers.authorization.split(' ');
    if (authorization[0] !== 'Bearer') {
      let err = new Error('Not Authorized');
      err.status = 401;
      next(err);
    } else {
      const token = authorization[1];
      auth.authenticate(token).then(result => {
        if (!result) {
          let err = new Error('Token Expired');
          err.status = 401;
          next(err);
        } else {
          return Playlist.delete(req.params.id);
        }
      }).then(playlist => {
        if (playlist === null) {
          res.status(204).json({
            message: 'Playlist deleted successfully',
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
}

exports.add = (req, res, next) => {
  if (!req.headers.authorization) {
    let err = new Error('Not Authorized');
    err.status = 401;
    next(err);
  } else {
    const authorization = req.headers.authorization.split(' ');
    if (authorization[0] !== 'Bearer') {
      let err = new Error('Not Authorized');
      err.status = 401;
      next(err);
    } else {
      const token = authorization[1];
      auth.authenticate(token).then(result => {
        if (!result) {
          let err = new Error('Token Expired');
          err.status = 401;
          next(err);
        } else {
          return Track.readOneById(req.params.track_id);
        }
      }).then(track => {
        if (track !== undefined) {
          if (!track) {
            let err = new Error('Track not found');
            err.status = 404;
            next(err);
          } else {
            return Playlist.add(req.params.id, req.params.track_id);
          }
        }
      }).then(nPlaylist => {
        if (nPlaylist !== undefined) {
          if (!nPlaylist) {
            let err = new Error('Playlist not found');
            err.status = 404;
            next(err);
          } else {
            res.status(201).json(nPlaylist);
          }
        }
      }).catch(error => {
        let err = new Error('Internal Server Error');
        err.status = 500;
        next(err);
        console.error(error);
      });
    }
  }
}

exports.remove = (req, res, next) => {
  if (!req.headers.authorization) {
    let err = new Error('Not Authorized');
    err.status = 401;
    next(err);
  } else {
    const authorization = req.headers.authorization.split(' ');
    if (authorization[0] !== 'Bearer') {
      let err = new Error('Not Authorized');
      err.status = 401;
      next(err);
    } else {
      const token = authorization[1];
      auth.authenticate(token).then(result => {
        if (!result) {
          let err = new Error('Token Expired');
          err.status = 401;
          next(err);
        } else {
          return Playlist.remove(req.params.id, req.params.track_id);
        }
      }).then(nPlaylist => {
        if (nPlaylist !== undefined) {
          if (!nPlaylist) {
            let err = new Error('Playlist not found');
            err.status = 404;
            next(err);
          } else {
            res.status(201).json(nPlaylist);
          }
        }
      }).catch(error => {
        let err = new Error('Internal Server Error');
        err.status = 500;
        next(err);
        console.error(error);
      });
    }
  }
}