const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album');
const artistController = require('../controllers/artist');
const trackController = require('../controllers/track');
const userController = require('../controllers/user');
const playlistController = require('../controllers/playlist');
const searchController = require('../controllers/search');

// Get track info
router.get('/track/:id', trackController.get);

// Get album info
router.get('/album/:id', albumController.get);

// Get artist info
router.get('/artist/:id', artistController.get);

// Get playlist info
router.get('/playlist/:id', playlistController.get);

// Create playlist, requires authorization
router.post('/playlist', playlistController.create);

// Delete playlist, requires authorization
router.delete('/playlist/:id', playlistController.delete);

// Add track to playlist, requires authorization
router.post('/playlist/:id/track/:track_id', playlistController.add);

// Remove track from playlist, requires authorization
router.delete('/playlist/:id/track/:track_id', playlistController.remove);

// Get user profile
router.get('/u/:username', userController.getProfile);

// Update user profile
router.patch('/u/:username', userController.updateProfile);

// Get a user's playlists
router.get('/u/:username/playlists', userController.getPlaylists);

// Get a user's favorite tracks
router.get('/u/:username/tracks', userController.getTracks);

// Get a user's favorite albums
router.get('/u/:username/albums', userController.getAlbums);

// Get a user's favorite artists
router.get('/u/:username/artists', userController.getArtists);

// Add to a user's favorite tracks, requires authorization
router.post('/me/tracks/:id', userController.addToTracks);

// Add to a user's favorite albums, requires authorization
router.post('/me/albums/:id', userController.addToAlbums);

// Add to a user's favorite artists, requires authorization
router.post('/me/artists/:id', userController.addToArtists);

// Delete from a user's favorite tracks, requires authorization
router.delete('/me/tracks/:id', userController.deleteFromTracks);

// Delete from a user's favorite albums, requires authorization
router.delete('/me/albums/:id', userController.deleteFromAlbums);

// Delete from a user's favorite artists, requires authorization
router.delete('/me/artists/:id', userController.deleteFromArtists);

// Search
router.get('/search', searchController.get);

module.exports = router;