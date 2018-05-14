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
    return Track.findByIdAndUpdate(id, update, { new: true }).exec();
  }
  return Promise.resolve(null);
}

exports.readOneById = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Track.findById(id).exec();
  }
  return Promise.resolve(null);
}

exports.readOneByName = (name) => {
  return Track.findOne({ name: name }).exec();
}

exports.readManyById = (ids) => {
  return Track.find().where('_id').in(ids).exec();
}

exports.readMany = (conditions) => {
  return Track.find(conditions).exec();
}

exports.readByArtist = (artist_name) => {
  return Track.find({ artists: { $elemMatch: { name: artist_name } } }).exec();
}

exports.search = (keywords) => {
  return Track.find().or([
    { name: keywords },
    { artists: { $elemMatch: { name: keywords } } },
  ]).exec();
}

exports.delete = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Track.findByIdAndRemove(id).exec();
  }
  return Promise.resolve(null);
}
