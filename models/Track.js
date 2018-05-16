const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Track = mongoose.model('Track', new Schema({
  name: String,
  artists: [{
    id: String,
    name: String,
  }],
  album: {
    id: String,
    name: String,
  },
  image: String,
  track_number: Number,
  genres: [String],
  uri: String,
  lyrics: String,
}));

exports.create = (data) => {
  return Track.create(data);
}

exports.updateById = (id, update) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Track.findByIdAndUpdate(id, update, { new: true }).select('-__v -artists._id').exec();
  }
  return Promise.resolve(null);
}

exports.readOneById = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Track.findById(id).select('-__v -artists._id').exec();
  }
  return Promise.resolve(null);
}

exports.readOneByName = (name) => {
  return Track.findOne({ name: name }).select('-__v -artists._id').exec();
}

exports.readManyById = (ids) => {
  return Track.find().where('_id').in(ids).select('-__v -artists._id').exec();
}

exports.readMany = (conditions) => {
  return Track.find(conditions).select('-__v -artists._id').exec();
}

exports.readByArtist = (artist_name) => {
  return Track.find({ artists: { $elemMatch: { name: artist_name } } }).select('-__v -artists._id').exec();
}

exports.search = (keywords) => {
  return Track.find().or([
    { name: keywords },
    { 'album.name': keywords },
    { artists: { $elemMatch: { name: keywords } } },
  ]).select('-__v -artists._id').exec();
}

exports.delete = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Track.findByIdAndRemove(id).exec();
  }
  return Promise.resolve(null);
}
