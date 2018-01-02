const express = require('express');
const mongoose = require('mongoose');
var bluebird = require('bluebird');
var config = require('../db/config');
var util = require('../db/util')

var router = express.Router();

router.route('/registration')
  .get(function(req. res) {
    res.redirect('/registration')
  })

router.route('/api/findUser')
  .get(function(req,res) {
    util.findOneUser(req, res);
  })

router.route('/api/findProfile')
  .get(function(req,res) {
    util.findOneProfile(req, res);
  })

//Adds a new Profile to the user
router.route('/api/createProfile')
  .post(function(req, res) {
    util.createProfile(req, res)
  })
  .get(function(req, res) {
    util.findOneProfile(req, res)
  })

module.exports = router;
