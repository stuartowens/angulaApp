var mongoose = require('mongoose');
var User = require('./userSchema');

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

exports.findOneUser = findOneUser;
