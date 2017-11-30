var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session')
var request = require('request')
var mongoose = require('mongoose');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GOOGLE_CLIENT_ID = require('../authConfig.js').GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = require('../authConfig.js').GOOGLE_CLIENT_SECRET;
var router = require('./router')


app.use(bodyParser.json())

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

passport.serializeUser(function(id, done) {
  console.log('serialize', id)
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
      User.create({google_id: profile.id, displayName: profile.displayName, image: profile._json.image.url, email: profile.emails[0].value, created_sessions: []}, (err, user) => {
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

//GET /auth/google

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}));

//GET /auth/google/callback

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login'}),
  function(req, res) {
    console.log('req.user in google callback auth function', req.user);
    console.log('req.session.passport.user', req.session.passport.user);
    res.redirect('home', 200, req.user);
  });

  // send user ot front end based on session

  app.get('/getUser', function(req, res) {
    User.find({ _id: req.session.passport.user }, (err, user) => {
      if (err) {
        console.log('error in getUser route', err);
      } else {
        console.log('get user success', user)
        res.json(user)
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


module.exports = app;
