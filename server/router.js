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

module.exports = router;
