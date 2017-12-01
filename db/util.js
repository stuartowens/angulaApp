var mongoose = require('mongoose');
var User = require('./userSchema');
var Profile = require('./profileSchema');


// search for user
function findOneUser(req, res) {
  var id = req.query.id;
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      console.log('error in findUser', err)
    } else {
      console.log('user', user)
      res.json(user);
    }
  })
}

// search for a profile
function findOneProfile(req, res) {
  var id = req.query.id;
  Profile.findOne({ _id: id }, (err, profile) => {
    if (err) {
      console.log('error in findProfile', err)
    } else {
      console.log('user', profile)
      res.json(profile);
    }
  })
}

// search for many profile
function findManyProfiles(req, res) {
  var id = req.query.id;
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      console.log('error in findProfile', err)
    } else {
      console.log('user', user)
      Profile.find({})
      res.json(profile);
    }
  })
}

// create a new profile add the user id, and add the profile id to the user profiles array

function createProfile(req, res) {
  var user_id = req.body.user_id;
  var displayName = req.body.displayName;
  var participant_profile = req.body.participant_profile;
  var minor = req.body.minor;
  var camping_type = req.body.camping_type;

  Profile.create({
    user_id: user_id,
    displayName: displayName,
    participant_profile: participant_profile,
    minor: minor,
    camping_type: camping_type,
    email: '',
    image: '',
    alt_email: '',
    paid: false,
    age: 0,
    release_form: false,
    chaperone: false,
    chaperone_name: '',
    exp_level: 0,
    address: {},
    phone: '',
    dietary_restrictions: '',
    allergies: '',
    emergency_contact: {},
    band_info: {},
    total_paid: 0
  }, (err, profile) => {
    if (err) {
      console.log("error with creating profile", err)
    } else {
      profile.save(function(error) {
        if (!error) {
          Profile.find({})
            .populate('participant_profile')
            .exec(function(error, profiles) {
              console.log(JSON.stringify(profiles, null, "\t"))
            })
          User.find({ _id: user_id }, (err, user) => {
            if(err) {
              console.log("error in createProfile", err)
            } else {
              if(profile.participant_profile) {
                user.participant_profiles.push({ displayName: profile.displayName, profile_id: profile._id })
                user.save(function(error) {
                  if(!error) {
                    User.find({})
                    .populate(participant_profiles.profile_id)
                    .exec(function(error, users) {
                      console.log(JSON.stringify(users, null, "\t"))
                    })
                  }
                })
              } else {
                user.non_participant_profiles.push({ displayName: profile.displayName, profile_id: profile._id })
                user.save(function(error) {
                  if(!error) {
                    User.find({})
                    .populate(non_participant_profiles.profile_id)
                    .exec(function(error, users) {
                      console.log(JSON.stringify(users, null, "\t"))
                    })
                  }
                })
              }
            }
          })
        }
      })
    }
  })
}



exports.findOneUser = findOneUser;
exports.findOneProfile = findOneProfile;
exports.findManyProfiles = findManyProfiles;
exports.createProfile = createProfile;
