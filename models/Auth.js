const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Auth = mongoose.model('Auth', new Schema({
  token: {
    type: String,
    unique: true,
  },
  issueTime: {
    type: Date,
    expires: '30d',
  },
  user_id: { type: String },
}));

exports.create = (auth) => {
  return Auth.create(auth);
}

exports.update = (conditions, update) => {
  return Auth.findOneAndUpdate(conditions, update, { new: true }).exec();
}

exports.read = (conditions) => {
  return Auth.findOne(conditions).exec();
}

exports.delete = (conditions) => {
  return Auth.findOneAndRemove(conditions).exec();
}