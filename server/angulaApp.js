var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session')
var request = require('request')
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../db/userSchema');
var Profile = require('../db/profileSchema');
var Util = require('../db/util');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GOOGLE_CLIENT_ID = require('../authConfig.js').GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = require('../authConfig.js').GOOGLE_CLIENT_SECRET;
var YAHOO_EMAIL = require('../authConfig.js').YAHOO_EMAIL;
var YAHOO_USERNAME = require('../authConfig.js').YAHOO_USERNAME;
var YAHOO_PASS = require('../authConfig.js').YAHOO_PASS;
var mailer = require('express-mailer');
// const keyPublishable = require('../stripeConfig').PUBLISHABLE_KEY
// const keySecret = require('../stripeConfig').SECRET_KEY

var router = require('./router');

var server = require('https').Server(app);

// const stripe = require("stripe")(keySecret);

// app.set("view engine", "pug")


//Setting the views for the express-mailer

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// This extends the express application to use the express-mailer
mailer.extend(app, {
  from: YAHOO_EMAIL,
  host: 'smtp.mail.yahoo.com',
  secureConnection: true,
  port: 465,
  transportMethod: 'SMTP',
  auth: {
    user: YAHOO_USERNAME,
    pass: YAHOO_PASS
  }
})

app.use(bodyParser.json());

app.get('/send', function (req, res, next) {
  app.mailer.send('email', {
    to: 'functionfiddler@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.
    subject: 'Band Camp Contact Form from ' + req.query.firstName + ' ' + req.query.lastName, // REQUIRED.
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    city: req.query.city,
    state: req.query.state,
    email: req.query.email,
    phone: req.query.phone,
    comments: req.query.comments // All additional properties are also passed to the template as local variables.
  }, function (err) {
    if (err) {
      // handle error
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    console.log(req.query, 'req.query')
    res.send('Email Sent');
  });
});


// app.use(bodyParser.urlencoded({ extended: false }))

// set headers to allow cross-origin requests

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

//initialize express-session and passport

app.use(session({ secret: 'downward dog'}));
app.use(passport.initialize());
app.use(passport.session());


// serialize and deserialize user

passport.serializeUser(function(user, done) {
  console.log('serialize', user)
  done(null, user._id)
})

passport.deserializeUser(function(id, done) {
  console.log('deserialize', id)
  User.findById(id, function(err, user){
    done(err, user)
  })
})

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
function(token, tokenSecret, profile, done) {
  User.find({ google_id: profile.id }, (err, user) => {
    if (user.length === 0) {
      User.create({
        google_id: profile.id,
        displayName: profile.displayName,
        isUnpaidUser: true,
        isPaidUser: false,
        isAdmin: false,
        image: profile._json.image.url,
        email: profile.emails[0].value,
        participant_profiles: [],
        non_participant_profile: [],
        groupTotal: 0,
        studentTotal: 0,
        rvCampers: 0,
        cabinCampers: 0,
        tentCampers: 0,
        chaperoneLunches: 0,
        total: 0,
        amt_paid: 0
      }, (err, user) => {
        if(err) {
          console.log('error in inserting the user', err);
        } else {
          console.log('user saved from google strategy', user);
          return done(err, user);
        }
      })
    } else {
      return done(err, user[0]);
    }
  })
}
));

// //GET stripe route to display paymnent form
//
// app.get("/", (req, res) =>
//   res.render("index.pug", {keyPublishable}));
//
// // POST stripe  route to recieve payment token ID and create charge
//
//
// app.post("/charge", (req, res) => {
//   let amount = 500;
//
//   stripe.customers.create({
//      email: req.body.stripeEmail,
//     source: req.body.stripeToken
//   })
//   .then(customer =>
//     stripe.charges.create({
//       amount,
//       description: "Sample Charge",
//          currency: "usd",
//          customer: customer.id
//     }))
//   .then(charge => res.render("charge.pug"));
// });

//GET /auth/google

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}));

//GET /auth/google/callback

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/unauthorizedAccess'}),
  function(req, res) {
    // console.log('req.user in google callback auth function', req.user);
    // console.log('req.session.passport.user', req.session.passport.user);
    res.redirect('/registration', 200, req.user);
  });

  // send user to front end based on session

  app.get('/getUser', function(req, res) {
    User.findOne({ _id: req.session.passport.user }, (err, user) => {
      if (err) {
        console.log('error in getUser route', err);
      } else {
        // console.log('get user success', user)
        res.json(user)
      }
    })
  })

  app.put('/updateUser', function(req, res){
    Util.updateUser(req, res)
  })
  // app.put('/updateUser', function(req, res) {
  //   User.findOne({ _id: req.session.passport.user }, (err, user) => {
  //     if (err) {
  //       console.log('error in getUser route', err);
  //     } else {
  //       console.log('get user success', user)
  //       res.json(user)
  //     }
  //   })
  // })

  // get profiles of user

  app.get('/getProfiles', function(req, res) {
    Profile.find({ user_id: req.session.passport.user }, (err, profile) => {
      if (err) {
        console.log('error in getUser route', err);
      } else {
        // console.log('get user success', profile)
        res.json(profile)
      }
    })
  })

  // check for session for react router

  app.get('/authenticate', function(req, res) {

    if(req.session.passport.user) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  })

  // logout route
  app.get('/logout', function(req, res){

    req.logout();
    res.redirect('/');
  });

  // implement express router

  app.use('/', router);

  app.use(express.static(__dirname.slice(0, __dirname.length - 6)));

  app.use('/*', function(req, res) {
    res.sendFile(__dirname.slice(0, __dirname.length - 6) + 'index.html');
  })


module.exports = server;
