const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  artists: {
    type: [String],
    required: true,
  },
  albums: {
    type: [String],
    required: true,
  },
  tracks: {
    type: [String],
    required: true,
  },
}));

exports.create = (userInfo) => {
  return User.create({
    ...userInfo,
    artists: [],
    albums: [],
    tracks: [],
  });
}

exports.update = (conditions, update) => {
  return User.findOneAndUpdate(conditions, update, { new: true }).exec();
}

exports.readById = (id) => {
  return User.findById(id).exec();
}

exports.read = (conditions) => {
  return User.findOne(conditions).exec();
}

exports.delete = (conditions) => {
  return User.findOneAndRemove(conditions).exec();
}

exports.deleteByUsername = (username) => {
  return User.findOneAndRemove({ username: username }).exec();
}

exports.getArtists = (username) => {
  return User.findOne({ username: username }).select('artists').exec();
}

exports.addToArtists = (id, artist_id) => {
  return User.findByIdAndUpdate(id, { '$push': { artists: artist_id } }, { new: true }).select('artists -_id').exec();
}

exports.deleteFromArtists = (id, artist_id) => {
  return User.findByIdAndUpdate(id, { '$pull': { artists: artist_id } }, { new: true }).exec();
}

exports.getAlbums = (username) => {
  return User.findOne({ username: username }).select('albums').exec();
}

exports.addToAlbums = (id, album_id) => {
  return User.findByIdAndUpdate(id, { '$push': { albums: album_id } }, { new: true }).select('albums').exec();
}

exports.deleteFromAlbums = (id, album_id) => {
  return User.findByIdAndUpdate(id, { '$pull': { albums: album_id } }, { new: true }).exec();
}

exports.getTracks = (username) => {
  return User.findOne({ username: username }).select('tracks').exec();
}

exports.addToTracks = (id, track_id) => {
  return User.findByIdAndUpdate(id, { '$push': { tracks: track_id } }, { new: true }).select('tracks').exec();
}

exports.deleteFromTracks = (id, track_id) => {
  return User.findByIdAndUpdate(id, { '$pull': { tracks: track_id } }, { new: true }).exec();
}