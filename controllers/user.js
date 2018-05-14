const User = require('../models/User');
const Track = require('../models/Track');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Playlist = require('../models/Playlist');
const auth = require('../lib/auth');

const bad_request = {
  error: 'Bad Request',
}
const not_authorized = {
  error: 'Not authorized',
}
const token_expired = {
  error: 'Token expired',
}
const incorrect_credentials = {
  error: 'The username/email or password is incorrect',
}
const user_not_found = {
  error: 'User not found',
}
const artist_not_found = {
  error: 'Artist doesn\'t exist',
}
const album_not_found = {
  error: 'Album doesn\'t exist',
}
const track_not_found = {
  error: 'Track doesn\'t exist',
}
const internal_server_error = {
  error: 'Internal Server Error',
}

// POST /register
exports.register = (req, res) => {
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
  }).catch((err) => {
    res.status(500).json(internal_server_error);
    console.error(err);
  });
}

// POST /login
exports.login = (req, res) => {
  const info = {
    password: req.body.password,
  }
  if (req.body.username) {
    info.username = req.body.username;
  } else if (req.body.email) {
    info.email = req.body.email;
  }
  if (!info.username && !info.email) {
    res.status(401).json(not_authorized);
  } else {
    User.read(info).then(user => {
      if (!user) {
        res.status(401).json(incorrect_credentials);
      } else {
        return auth.authorize(user._id);
      }
    }).then(result => {
      if (result !== undefined) {
        res.status(200).json({
          username: user.username,
          email: user.email,
          token: result.token,
        });
      }
    }).catch(err => {
      res.status(500).json(internal_server_error);
      console.error(err);
    });
  }
}

// DELETE /signout
exports.signOut = (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).json(not_authorized);
  } else {
    const authorization = req.headers.authorization.split(' ');
    if (authorizaiton[0] !== 'Bearer') {
      res.status(401).json(not_authorized);
    } else if (!authorization[1]) {
      res.status(401).json(not_authorized);
    } else if (!req.body.token) {
      res.status(400).json(bad_request);
    } else {
      auth.delete(req.body.token).then(result => {
        if (!result) {
          res.status(204).json({
            message: 'Signed out',
          });
        }
      }).catch(err => {
        res.status(500).json(internal_server_error);
        console.error(err);
      });
    }
  }
}

// GET /u/available
exports.available = (req, res) => {
  if (req.body.email) {
    const email = req.body.email;
    User.read({ email: email }).then(user => {
      res.status(200).json({
        status: 200,
        message: user === null ? 'Email available' : 'Email alreday exists!',
      });
    }).catch(err => {
      res.status(500).json(internal_server_error);
    });
  } else if (req.body.username) {
    const username = req.body.username;
    User.read({ username: username }).then(user => {
      res.status(200).json({
        status: 200,
        message: username + (user === null ? ' is available' : ' is already taken'),
      });
    }).catch((err) => {
      res.status(500).json(internal_server_error);
    });
  } else {
    res.status(400).json(bad_request);
  }
}

// GET /u/:username
exports.getProfile = (req, res) => {
  const username = req.params.username;
  if (!username) {
    res.status(400).json(bad_request);
  } else {
    User.read({ username: username }).then((user) => {
      if (user) {
        res.status(200).json({
          username: user.username,
          email: user.email,
        });
      } else {
        res.status(404).json(user_not_found);
      }
    }).catch((err) => {
      res.status(500).json(internal_server_error);
    });
  }
}

// PATCH /u/:username
exports.updateProfile = (req, res) => {
  const username = req.params.username;
  if (!username) {
    res.status(400).json(bad_request);
  } else {
    if (!req.headers.authorization) {
      res.status(401).json(not_authorized);
    } else {
      const authorization = req.headers.authorization.split(' ');
      if (authorization[0] === 'Bearer') {
        const token = authorization[1];
        auth.authenticate(token).then((result) => {
          if (!result) {
            res.status(401).json(token_expired);
          } else {
            return User.update({ username: username }, req.body);
          }
        }).then(user => {
          if (user !== undefined) {
            if (!user) {
              res.status(404).json(user_not_found);
            } else {
              res.status(201).json(user); // 可能有bug
            }
          }
        }).catch((err) => {
          res.status(500).json(internal_server_error);
          console.error(err);
        });
      } else {
        res.status(401).json(not_authorized);
      }
    }
  }
}

// GET /u/:username/playlists
exports.getPlaylists = (req, res) => {
  const username = req.params.username;
  if (!username) {
    res.status(400).json(bad_request);
  } else {
    User.read({ username: username }).then(user => {
      if (!user) {
        res.status(404).json(user_not_found);
      } else {
        return Playlist.readManyByOwner(user._id);
      }
    }).then(playlists => {
      if (playlists !== undefined) {
        res.status(200).json({
          items: playlists,
        });
      }
    }).catch(err => {
      res.status(500).json(internal_server_error);
      console.error(err);
    });
  }
}

// GET /u/:username/artists
exports.getArtists = (req, res) => {
  const username = req.params.username;
  if (!username) {
    res.status(400).json(bad_request);
  } else {
    User.getArtists(username).then(user => {
      if (!user) {
        res.status(404).json(user_not_found);
      } else {
        return Artist.readManyById(user.artists);
      }
    }).then(artists => {
      if (artists !== undefined) {
        res.status(200).json({
          items: artists,
        });
      }
    }).catch(err => {
      res.status(500).json(internal_server_error);
      console.error(err);
    });
  }
}

// GET /u/:username/albums
exports.getAlbums = (req, res) => {
  const username = req.params.username;
  if (!username) {
    res.status(400).json(bad_request);
  } else {
    User.getAlbums(username).then(user => {
      if (!user) {
        res.status(404).json(user_not_found);
      } else {
        return Album.readManyById(user.albums);
      }
    }).then(albums => {
      if (albums !== undefined) {
        res.status(200).json({
          items: albums,
        });
      }
    }).catch(err => {
      res.status(500).json(internal_server_error);
      console.error(err);
    });
  }
}

// GET /u/:username/tracks
exports.getTracks = (req, res) => {
  const username = req.params.username;
  if (!username) {
    res.status(400).json(bad_request);
  } else {
    User.getTracks(username).then(user => {
      if (!user) {
        res.status(404).json(user_not_found);
      } else {
        return Track.readManyById(user.tracks);
      }
    }).then(tracks => {
      if (tracks !== undefined) {
        res.status(200).json({
          items: tracks,
        });
      }
    }).catch(err => {
      res.status(500).json(internal_server_error);
      console.error(err);
    });
  }
}

// POST /me/artists/:id
exports.addToArtists = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json(bad_request);
  } else if (!req.headers.authorization) {
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
          return User.addToArtists(result.user_id, id);
        }
      }).then(user => {
        if (user !== undefined) {
          res.status(201).json(user);
        }
      }).catch(err => {
        res.status(500).json(internal_server_error);
        console.error(err);
      });
    }
  }
}

// POST /me/albums/:id
exports.addToAlbums = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json(bad_request);
  } else if (!req.headers.authorization) {
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
          return User.addToAlbums(result.user_id, id);
        }
      }).then(user => {
        if (user !== undefined) {
          res.status(201).json(user);
        }
      }).catch(err => {
        res.status(500).json(internal_server_error);
        console.error(err);
      });
    }
  }
}

// POST /me/tracks/:id
exports.addToTracks = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json(bad_request);
  } else if (!req.headers.authorization) {
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
          return User.addToTracks(result.user_id, id);
        }
      }).then(user => {
        if (user !== undefined) {
          res.status(201).json(user);
        }
      }).catch(err => {
        res.status(500).json(internal_server_error);
        console.error(err);
      });
    }
  }
}

// DELETE /me/artists/:id
exports.deleteFromArtists = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json(bad_request);
  } else if (!req.headers.authorization) {
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
          return User.deleteFromArtists(result.user_id, id);
        }
      }).then(user => {
        if (user !== undefined) {
          res.status(204).json(user);
        }
      }).catch(err => {
        res.status(500).json(internal_server_error);
        console.error(err);
      });
    }
  }
}

// DELETE /me/albums/:id
exports.deleteFromAlbums = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json(bad_request);
  } else if (!req.headers.authorization) {
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
          return User.deleteFromAlbums(result.user_id, id);
        }
      }).then(user => {
        if (user !== undefined) {
          res.status(204).json(user);
        }
      }).catch(err => {
        res.status(500).json(internal_server_error);
        console.error(err);
      });
    }
  }
}

// DELETE /me/tracks/:id
exports.deleteFromTracks = (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json(bad_request);
  } else if (!req.headers.authorization) {
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
          return User.deleteFromTracks(result.user_id, id);
        }
      }).then(user => {
        if (user !== undefined) {
          res.status(204).json(user);
        }
      }).catch(err => {
        res.status(500).json(internal_server_error);
        console.error(err);
      });
    }
  }
}