const User = require('../models/User');
const Track = require('../models/Track');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Playlist = require('../models/Playlist');
const auth = require('../lib/auth');

// POST /register
exports.register = (req, res, next) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).then((user) => {
    return auth.authorize(user._id);
  }).then((result) => {
    res.status(200).json({
      username: req.body.username,
      email: req.body.email,
      token: result.token,
    });
  }).catch((error) => {
    let err = new Error('Internal Server Error');
    err.status = 500;
    console.error(error);
    next(err);
  });
}

// POST /login
exports.login = (req, res, next) => {
  const info = {
    password: req.body.password,
  }
  if (req.body.username) {
    info.username = req.body.username;
  } else if (req.body.email) {
    info.email = req.body.email;
  }
  if (!info.username && !info.email) {
    let err = new Error('Not Authorized');
    err.status = 401;
    next(err);
  } else {
    User.read(info).then(user => {
      if (!user) {
        let err = new Error('Not Authorized');
        err.status = 401;
        next(err);
      } else {
        auth.authorize(user._id).then(result => {
          res.status(200).json({
            username: user.username,
            email: user.email,
            token: result.token,
          });
        }).catch(err => { throw err });
      }
    }).catch(error => {
      let err = new Error('Internal Server Error');
      err.status = 500;
      next(err);
      console.error(error);
    });
  }
}

// DELETE /signout
exports.signOut = (req, res, next) => {
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
    } else if (!authorization[1]) {
      let err = new Error('Not Authorized');
      err.status = 401;
      next(err);
    } else {
      auth.authenticate(authorization[1]).then(result => {
        if (!result) {
          let err = new Error('Not Authorized');
          err.status = 401;
          next(err);
        } else {
          return auth.delete(authorization[1]);
        }
      }).then(result => {
        if (result !== undefined) {
          res.status(204);
        }
      }).catch(error => {
        let err = new Error('Internal Server Error');
        err.status = 500;
        console.error(error);
        next(err);
      });
    }
  }
}

// GET /u/available
exports.available = (req, res, next) => {
  if (req.body.email) {
    const email = req.body.email;
    User.read({ email: email }).then(user => {
      res.status(200).json({
        status: 200,
        message: user === null ? 'Email available' : 'Email alreday exists!',
      });
    }).catch(error => {
      let err = new Error('Internal Server Error');
      err.status = 500;
      next(err);
      console.log(error);
    });
  } else if (req.body.username) {
    const username = req.body.username;
    User.read({ username: username }).then(user => {
      res.status(200).json({
        status: 200,
        message: username + (user === null ? ' is available' : ' is already taken'),
      });
    }).catch((error) => {
      let err = new Error('Internal Server Error');
      err.status = 500;
      next(err);
      console.log(error);
    });
  } else {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  }
}

// GET /u/:username
exports.getProfile = (req, res, next) => {
  const username = req.params.username;
  if (!username) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else {
    User.read({ username: username }).then((user) => {
      if (user) {
        res.status(200).json({
          username: user.username,
          email: user.email,
        });
      } else {
        let err = new Error('User not found');
        err.status = 404;
        next(err);
      }
    }).catch((error) => {
      let err = new Error('Internal Server Error');
      err.status = 500;
      next(err);
      console.log(error);
    });
  }
}

// PATCH /u/:username
exports.updateProfile = (req, res, next) => {
  const username = req.params.username;
  if (!username) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else {
    if (!req.headers.authorization) {
      let err = new Error('Not Authorized');
      err.status = 401;
      next(err);
    } else {
      const authorization = req.headers.authorization.split(' ');
      if (authorization[0] === 'Bearer') {
        const token = authorization[1];
        auth.authenticate(token).then((result) => {
          if (!result) {
            let err = new Error('Token Expired');
            err.status = 401;
            next(err);
          } else {
            return User.update({ username: username }, req.body);
          }
        }).then(user => {
          if (user !== undefined) {
            if (!user) {
              let err = new Error('User not found');
              err.status = 404;
              next(err);
            } else {
              res.status(201).json(user); // 可能有bug
            }
          }
        }).catch((error) => {
          let err = new Error('Internal Server Error');
          err.status = 500;
          next(err);
          console.error(error);
        });
      } else {
        let err = new Error('Not Authorized');
        err.status = 401;
        next(err);
      }
    }
  }
}

// GET /u/:username/playlists
exports.getPlaylists = (req, res, next) => {
  const username = req.params.username;
  if (!username) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else {
    User.read({ username: username }).then(user => {
      if (!user) {
        let err = new Error('User not found');
        err.status = 404;
        next(err);
      } else {
        return Playlist.readManyByOwner(user._id);
      }
    }).then(playlists => {
      if (playlists !== undefined) {
        res.status(200).json({
          items: playlists,
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

// GET /u/:username/artists
exports.getArtists = (req, res, next) => {
  const username = req.params.username;
  if (!username) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else {
    User.getArtists(username).then(user => {
      if (!user) {
        let err = new Error('User not found');
        err.status = 404;
        next(err);
      } else {
        return Artist.readManyById(user.artists);
      }
    }).then(artists => {
      if (artists !== undefined) {
        res.status(200).json({
          items: artists,
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

// GET /u/:username/albums
exports.getAlbums = (req, res, next) => {
  const username = req.params.username;
  if (!username) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else {
    User.getAlbums(username).then(user => {
      if (!user) {
        let err = new Error('User not found');
        err.status = 404;
        next(err);
      } else {
        return Album.readManyById(user.albums);
      }
    }).then(albums => {
      if (albums !== undefined) {
        res.status(200).json({
          items: albums,
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

// GET /u/:username/tracks
exports.getTracks = (req, res, next) => {
  const username = req.params.username;
  if (!username) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else {
    User.getTracks(username).then(user => {
      if (!user) {
        let err = new Error('User not found');
        err.status = 404;
        next(err);
      } else {
        return Track.readManyById(user.tracks);
      }
    }).then(tracks => {
      if (tracks !== undefined) {
        res.status(200).json({
          items: tracks,
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

// POST /me/artists/:id
exports.addToArtists = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else if (!req.headers.authorization) {
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
          return User.addToArtists(result.user_id, id);
        }
      }).then(user => {
        if (user !== undefined) {
          res.status(201).json(user);
        }
      }).catch(error => {
        let err = new Error('Internal Server Error');
        err.status = 401;
        next(err);
        console.error(error);
      });
    }
  }
}

// POST /me/albums/:id
exports.addToAlbums = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else if (!req.headers.authorization) {
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
          return User.addToAlbums(result.user_id, id);
        }
      }).then(user => {
        if (user !== undefined) {
          res.status(201).json(user);
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

// POST /me/tracks/:id
exports.addToTracks = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else if (!req.headers.authorization) {
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
          return User.addToTracks(result.user_id, id);
        }
      }).then(user => {
        if (user !== undefined) {
          res.status(201).json(user);
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

// DELETE /me/artists/:id
exports.deleteFromArtists = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else if (!req.headers.authorization) {
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
          return User.deleteFromArtists(result.user_id, id);
        }
      }).then(user => {
        if (user !== undefined) {
          res.status(204).json(user);
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

// DELETE /me/albums/:id
exports.deleteFromAlbums = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else if (!req.headers.authorization) {
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
          return User.deleteFromAlbums(result.user_id, id);
        }
      }).then(user => {
        if (user !== undefined) {
          res.status(204).json(user);
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

// DELETE /me/tracks/:id
exports.deleteFromTracks = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    let err = new Error('Bad Request');
    err.status = 400;
    next(err);
  } else if (!req.headers.authorization) {
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
          return User.deleteFromTracks(result.user_id, id);
        }
      }).then(user => {
        if (user !== undefined) {
          res.status(204).json(user);
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