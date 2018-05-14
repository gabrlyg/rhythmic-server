const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Album = mongoose.model('Album', new Schema({
  name: String,
  artists: [{
    id: String,
    name: String,
  }],
  genres: [String],
  image: String,
  release_date: Date,
}));

exports.create = (data) => {
  return Album.create(data);
}

exports.update = (id, update) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Album.findByIdAndUpdate(id, update, { new: true }).exec();
  }
  return Promise.resolve(null);
}

exports.readOneById = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Album.findById(id).exec();
  }
  return Promise.resolve(null);
}

exports.readOneByName = (name) => {
  return Album.findOne({ name: name }).exec();
}

exports.readManyById = (ids) => {
  return Album.find().where('_id').in(ids).exec();
}

exports.readByArtist = (artist_name) => {
  return Album.find({ artists: { $elemMatch: { name: artist_name } } }).exec();
}

exports.readAll = () => {
  return Album.find().exec();
}

exports.search = (keywords) => {
  return Album.find().or([
    { name: keywords },
    { artists: { $elemMatch: { name: keywords } } }
  ]).exec();
}

exports.delete = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Album.findByIdAndRemove(id).exec();
  }
  return Promise.resolve(null);
}