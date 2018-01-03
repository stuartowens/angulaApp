var mongoose = require('mongoose');

var Profile = mongoose.Schema({
  displayName: { type: String },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  minor: { type: Boolean },
  camping_type: { type: String },
  email: { type: String },
  image: { type: String },
  alt_email: { type: String },
  age: { type: Number },
  release_form: { type: Boolean },
  chaperone_name: { type: String },
  chaperone: { type: Boolean },
  bio: { type: String },
  instruments: { type: String },
  singer: { type: Boolean },
  instrumentalist: { type: Boolean },
  genres: { type: String },
  exp_level: { type: String },
  phone: { type: String },
  dietary_restrictions: { type: String },
  allergies: { type: String },
  emergency_contact: { type: Object },
  band_info: { type: Object },
});

module.exports = mongoose.model('Profile', Profile);
