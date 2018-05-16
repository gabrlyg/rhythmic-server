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
    return Album.findByIdAndUpdate(id, update, { new: true }).select('-__v -artists._id').exec();
  }
  return Promise.resolve(null);
}

exports.readOneById = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Album.findById(id).select('-__v -artists._id').exec();
  }
  return Promise.resolve(null);
}

exports.readOneByName = (name) => {
  return Album.findOne({ name: name }).select('-__v -artists._id').exec();
}

exports.readManyById = (ids) => {
  return Album.find().where('_id').in(ids).select('-__v -artists._id').exec();
}

exports.readByArtist = (artist_name) => {
  return Album.find({ artists: { $elemMatch: { name: artist_name } } }).select('-__v -artists._id').exec();
}

exports.readAll = () => {
  return Album.find().select('-__v -artists._id').exec();
}

exports.search = (keywords) => {
  return Album.find().or([
    { name: keywords },
    { artists: { $elemMatch: { name: keywords } } }
  ]).select('-__v -artists._id').exec();
}

exports.delete = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Album.findByIdAndRemove(id).exec();
  }
  return Promise.resolve(null);
}