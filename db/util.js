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
      // console.log('user', user)
      res.json(user);
    }
  })
}

function updateUser(req, res) {
  // console.log(req.session.passport.user, 'req.session~~~~~~upon update$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
  // console.log(req.body, 'req.body~~~~~~upon update$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

  var id = req.id;
  User.findOne({ _id: req.session.passport.user }, (err, user) => {
    if (err) {
      // console.log('~~~~~~~~~~~~~~~~~~~~~~~~error in updateUser~~~~~~~~~~~~~~~~~~~~~~~~~~~````', err)
    } else {
      // console.log(user, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!user~~~~in updateuser")
      user.isPaidUser = true;
      user.groupTotal = user.groupTotal + req.body.groupTotal;
      user.studentTotal = user.studentTotal + req.body.studentTotal;
      user.rvCampers = user.rvCampers + req.body.rvCampers;
      user.cabinCampers = user.cabinCampers + req.body.cabinCampers;
      user.tentCampers = user.tentCampers + req.body.tentCampers;
      user.chaperoneLunches = user.chaperoneLunches + req.body.chaperoneLunches;
      user.total = 0;
      user.address = req.body.address;
      user.token = req.body.token;
      user.amt_paid = user.amt_paid + req.body.total;
      for (var i = 0; i < req.body.studentTotal; i++) {
        createProfile(req.session.passport.user, i)
      }
      // console.log('user before save', user)
      user.save(function (err) {
        if(err) {
          return handleError(err)
        } else {
          // console.log('user after save', user)
          res.json(user);
        }
      })

    }
  })
}

function updateProfile(req, res) {
  console.log(req.session.passport.user, 'req.session~~~~~~upon update$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
  console.log(req.body, 'req.body~~~~~~upon update$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

  // var id = req.id;
  Profile.findOne({ _id: req._id, user_id: req.session.passport.user }, (err, profile) => {
    if (err) {
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~error in updateProfile~~~~~~~~~~~~~~~~~~~~~~~~~~~````', err)
    } else {
      console.log(profile, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!user~~~~in updateProfile")
      profile.displayName = req.body.displayName
      profile.minor = req.body.minor
      profile.camping_type = req.body.camping_type
      profile.email = req.body.email
      profile.image = req.body.image
      profile.alt_email = req.body.alt_email
      profile.age = req.body.age
      profile.release_form = req.body.release_form
      profile.chaperone_name = req.body.chaperone_name
      profile.bio = req.body.bio
      profile.instruments = req.body.instruments
      profile.singer = req.body.singer
      profile.genres = req.body.genres
      profile.exp_level = req.body.exp_level
      profile.phone = req.body.phone
      profile.dietary_restrictions = req.body.dietary_restrictions
      profile.allergies = req.body.allergies
      profile.emergency_contact.name = req.body.emergency_contact.name
      profile.emergency_contact.phone = req.body.emergency_contact.phone
      profile.band_info.band = req.body.band_info.band
      profile.band_info.name = req.body.band_info.name
      profile.band_info.otherMembers = req.body.band_info.otherMembers
      console.log('profile before save', profile)
      profile.save(function (err) {
        if(err) {
          return handleError(err)
        } else {
          console.log('profile after save', profile)
          res.json(profile);
        }
      })

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
      console.log('profile', profile)
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
      // console.log('user', user)
      Profile.find({})
      res.json(profile);
    }
  })
}

// create a new profile add the user id, and add the profile id to the user profiles array

function createProfile(user_id, i) {
  var user_id = user_id;
  var number = i + 1
  var displayName = 'Camper '+ number.toString()
  // var displayName = req.body.displayName;
  // var participant_profile = req.body.participant_profile;
  // var minor = req.body.minor;
  // var camping_type = req.body.camping_type;

  Profile.create({
    user_id: user_id,
    displayName: displayName,
    minor: false,
    camping_type: 'none',
    email: '',
    image: '',
    alt_email: '',
    age: 0,
    release_form: false,
    chaperone_name: '',
    bio: '',
    instruments: '',
    singer: false,
    instrumentalist: false,
    genres: '',
    exp_level: '',
    phone: '',
    dietary_restrictions: '',
    allergies: '',
    emergency_contact: { name: '', phone: '' },
    band_info: { band: false, name: '', otherMembers: '' },
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
          User.findOne({ _id: user_id }, (err, user) => {
            if(err) {
              console.log("error in createProfile", err)
            } else {
              // if(profile.participant_profile) {
                user.participant_profiles.push({ displayName: profile.displayName, profile_id: profile._id })
                // console.log(user, "this is the user!!!!!")
                user.save()
                // user.save(function(error) {
                //   if(!error) {
                //     User.find({})
                //     .populate(participant_profiles.profile_id)
                //     .exec(function(error, users) {
                //       console.log(JSON.stringify(users, null, "\t"))
                //     })
                //   }
                // })
              // } else {
              //   user.non_participant_profiles.push({ displayName: profile.displayName, profile_id: profile._id })
              //   user.save()
                // user.save(function(error) {
                //   if(!error) {
                //     User.find({})
                //     .populate(non_participant_profiles.profile_id)
                //     .exec(function(error, users) {
                //       console.log(JSON.stringify(users, null, "\t"))
                //     })
                //   }
                // })
              // }
            }
          })
        }
      })
    }
  })
}



exports.findOneUser = findOneUser;
exports.updateUser = updateUser;
exports.updateProfile = updateProfile;
exports.findOneProfile = findOneProfile;
exports.findManyProfiles = findManyProfiles;
exports.createProfile = createProfile;
