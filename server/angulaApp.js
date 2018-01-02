var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// var session = require('cookie-session');
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
const keyPublishable = require('../stripeConfig').PUBLISHABLE_KEY
const keySecret = require('../stripeConfig').SECRET_KEY
// "sk_test_iAhMKuT8CzPLXiT125IzVj2n"
const stripe = require("stripe")("sk_test_iAhMKuT8CzPLXiT125IzVj2n");
// const stripe = require("stripe")(keySecret);

var router = require('./router');

var server = require('http').Server(app);

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
app.set('trust proxy', 'loopback, 54.177.210.89');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/api/send', function (req, res, next) {
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
  // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(function(req, res, next) {
  console.log(req.session, 'req.session~~~~~~~~~~~~~~')
  console.log(req.headers.host, 'req.headers.host')
  console.log(req.user, 'req.user')
  if (req.headers.hasOwnProperty('x-forwarded-for')) {
     // proxy in effect
     req.redirUrl = req.headers['x-forwarded-proto']
        + "://bandcamp.cc"
        // + req.headers.host
        // proxy
        // plus any proxy subdirs if needed
        // + "/"
        // + proxy_subdir
     ;

  } else {
     // direct requeset
     req.redirUrl =
     // req.protocol+
      "https://bandcamp.cc"
        // + req.headers.host
     ;
  }

  next();
});

//initialize express-session and passport

app.use(session({
  secret: 'downward dog',
  proxy: true,
  cookie: { secure: 'auto' },
  // store: new sessionStore()
}));
app.use(passport.initialize());
app.use(passport.session());

console.log(passport, 'passport')
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
  callbackURL: 'http://localhost:3010/api/auth/google/callback'
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
//GET stripe route to display paymnent form

// app.get("/", (req, res) =>
//   res.render("index.pug", {keyPublishable}));

// POST stripe  route to recieve payment token ID and create charge


app.post("/api/charge", (req, res) => {
  let amount = req.body.amount;
  console.log(req.body.amount,'req.body.amount')
  stripe.customers.create({
     email: req.body.email,
    source: req.body.stripeToken,
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Band Camp Dues",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => {
    res.json(charge);
    // res.render("charge.pug");
  });
});



//GET /auth/google

app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}));

//GET /auth/google/callback

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/unauthorizedAccess'}),
  function(req, res) {
    console.log('req.user in google callback auth function', req.user);
    console.log('req.session.passport.user', req.session.passport.user);
    console.log('req.session.passport', req.session.passport);
    console.log('req.session', req.session);
    res.redirect(req.redirUrl, 200, req.user);
  });

  // send user to front end based on session

  app.get('/api/getUser', function(req, res) {
    User.findOne({ _id: req.session.passport.user }, (err, user) => {
      if (err) {
        console.log('error in getUser route', err);
      } else {
        // console.log('get user success', user)
        res.json(user)
      }
    })
  })

  app.put('/api/updateUser', function(req, res){
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

  app.get('/api/getProfiles', function(req, res) {
    Profile.find({ user_id: req.session.passport.user }, (err, profile) => {
      if (err) {
        console.log('error in getUser route', err);
      } else {
        // console.log('get user success', profile)
        res.json(profile)
      }
    })
  })

  // check for session for angular router

  app.get('/api/authenticate', function(req, res) {

    if(req.session.passport.user) {
    // if(req.session.passport) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  })

  // logout route
  app.get('/api/logout', function(req, res){

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
