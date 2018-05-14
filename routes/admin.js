const express = require('express');
const path = require('path');
const router = express.Router();
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Track = require('../models/Track');
const playlist = require('../models/Playlist');
const rootPath = path.join(__dirname, '../views');

router.get('/artist', (req, res) => {
  res.sendFile(path.join(rootPath, 'artist.html'));
})

router.post('/artist', (req, res) => {
  res.status(201).send(req.body);
});

router.get('/album', (req, res) => {
  res.sendFile(path.join(rootPath, 'album.html'));
})

router.post('/album', (req, res) => {
  
})

router.post('/track', (req, res) => {

})

router.post('/playlist', (req, res) => {

})

module.exports = router;