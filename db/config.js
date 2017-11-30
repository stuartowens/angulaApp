var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/angulaApp');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('mongo is running')
});
