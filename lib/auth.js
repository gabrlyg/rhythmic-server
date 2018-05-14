const Auth = require('../models/Auth');
const AES = require('crypto-js/aes');
const secret = require('../config').secret;

exports.authenticate = (token) => {
  return Auth.read({ token: token });
}

exports.refresh = (token) => {
  return Auth.read({ token: token }).then(result => {
    if (result === null) {
      return Promise.resolve(null);
    } else {
      const currentTime = new Date();
      const refreshTime = result.issueTime;
      refreshTime.setDate(refreshTime.getDate() + 23);
      if (currentTime < refreshTime) {
        return Promise.resolve(result);
      } else {
        const newToken = genToken(result.user.id, currentTime);
        return Auth.update({ token: token },
          { token: newToken, issueTime: currentTime });
      }
    }
  }).catch(err => {
    return Promise.reject(err);
  });
}

exports.authorize = (user_id) => {
  const issueTime = new Date();
  const token = genToken(user_id, issueTime);
  return Auth.create({
    token: token,
    issueTime: issueTime,
    user_id: user_id,
  });
}

exports.delete = (token) => {
  return Auth.delete({ token: token });
}

const genToken = (user_id, issueTime) => {
  return AES.encrypt(issueTime.getTime().toString() +
    user_id, secret).toString();
}