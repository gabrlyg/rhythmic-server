const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Artist = mongoose.model('Artist', new Schema({
  name: String,
  image: String,
  bio: String,
  genres: [String],
}));

exports.create = (artstInfo) => {
  return Artist.create(artstInfo);
}

exports.update = (id, update) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Artist.findByIdAndUpdate(id, update, { new: true }).select('-__v').exec();
  }
  return Promise.resolve(null);
}

exports.readById = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Artist.findById(id).select('-__v').exec();
  }
  return Promise.resolve(null);
}

exports.readOneByName = (name) => {
  return Artist.findOne({ name: name }).select('-__v').exec();
}

exports.readManyById = (ids) => {
  return Artist.find().where('_id').in(ids).select('-__v').exec();
}

exports.search = (keywords) => {
  return Artist.find({ name: keywords}).select('-__v').exec();
}

exports.delete = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Artist.findByIdAndRemove(id).exec(); 
  }
  return Promise.resolve(null);
}
