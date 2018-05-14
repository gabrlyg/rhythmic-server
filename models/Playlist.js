const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Playlist = mongoose.model('Playlist', new Schema({
  owner: String,
  name: String,
  image: String,
  tracks: [String],
}).index({ owner: 1, name: 1 }, { unique: true }));

exports.create = (data) => {
  return Playlist.create({
    ...data,
    tracks: [],
  });
}

exports.update = (id, update) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Playlist.findByIdAndUpdate(id, update, { new: true}).exec();
  }
  return Promise.resolve(null);
}

exports.readById = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Playlist.findById(id).exec(); 
  }
  return Promise.resolve(null);
}

exports.readManyById = (ids) => {
  return Playlist.find().where('_id').in(ids).exec();
}

exports.readManyByOwner = (owner) => {
  return Playlist.find({ owner: owner }).exec();
}

exports.delete = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Playlist.findByIdAndRemove(id).exec();
  }
  return Promise.resolve(null);
}

exports.add = (id, track_id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Playlist.findByIdAndUpdate(id, { '$push': { tracks: track_id } }, { new: true }).exec();
  }
  return Promise.resolve(null);
}

exports.remove = (id, track_id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Playlist.findByIdAndUpdate(id, { '$pull': { tracks: track_id } }, { new: true }).exec();
  }
  return Promise.resolve(null);
}