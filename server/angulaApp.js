var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname.slice(0, __dirname.length - 6)));
app.use(bodyParser.json())

app.use('/*', function(req, res) {
  res.sendFile(__dirname.slice(0, __dirname.length - 6) + 'index.html');
})

module.exports = app;
