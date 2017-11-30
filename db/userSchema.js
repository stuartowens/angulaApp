var mongoose = require('mongoose');

var User = mongoose.Schema({
  // unique id syntax: _id
  google_id: { type: String, required: true, unique: true },
  displayName: { type: String },
  image: { type: String },
  email: { type: String },
  created_sessions: []
});

module.exports = mongoose.model('User', User);
