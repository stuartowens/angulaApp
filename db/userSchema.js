var mongoose = require('mongoose');

var User = mongoose.Schema({
  // unique id syntax: _id
  google_id: { type: String, required: true, unique: true },
  displayName: { type: String },
  isUnpaidUser: { type: Boolean },
  isPaidUser: { type: Boolean },
  isAdmin: { type: Boolean },
  image: { type: String },
  email: { type: String },
  alt_email: { type: String },
  participant_profiles: [{
    displayName: { type: String },
    profile_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile' }
    }],
  non_participant_profile: { type: Array },
  amt_paid: { type: Number }
});

module.exports = mongoose.model('User', User);
