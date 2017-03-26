var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  profile: {
    username: {
      type: String,
      required: true,
      lowercase: true
    },
    picture: {
      type: String,
      required: false,
      match: /^http:\/\//i
    }
  },
  data: {
    oauth: { type: String, required: true }
  }
});

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });