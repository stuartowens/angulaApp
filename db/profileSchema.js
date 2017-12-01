var mongoose = require('mongoose');

var Profile = mongoose.Schema({
  // unique id syntax: _id
  google_id: { type: String},
  displayName: { type: String, required: true },
  participant_profile: { type: Boolean, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  minor: { type: Boolean, required: true },
  camping_type: { type: String, required: true },
  email: { type: String },
  image: { type: String },
  alt_email: { type: String },
  paid: { type: Boolean},
  age: { type: Number },
  release_form: { type: Boolean },
  chaperone: { type: Boolean },
  chaperone_name: { type: String },
  exp_level: { type: Number },
  address: { type: Object },
  phone: { type: String },
  dietary_restrictions: { type: String },
  allergies: { type: String },
  emergency_contact: { type: Object },
  band_info: { type: Object },
  total_paid: { type: Number }
});

module.exports = mongoose.model('Profile', Profile);
