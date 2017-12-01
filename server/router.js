const express = require('express');
const mongoose = require('mongoose');
var bluebird = require('bluebird');
var config = require('../db/config');
var util = require('../db/util')

var router = express.Router();

router.route('/findUser')
  .get(function(req,res) {
    util.findOneUser(req, res);
  })

router.route('/findProfile')
  .get(function(req,res) {
    util.findOneProfile(req, res);
  })

//Adds a new Profile to the user
router.route('/createProfile')
  .post(function(req, res) {
    util.createProfile(req, res)
  })
  .get(function(req, res) {
    util.findOneProfile(req, res)
  })

module.exports = router;
