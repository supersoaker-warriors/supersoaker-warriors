var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');


// define schema
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;


var UserSchema = new Schema ({
  id: ObjectId,
  username: {type: String, unique: true, required: true },
  first: String,
  last: String,
  email: String,
  password: {type: String, required: true },
  age: Number,
  description: String,
  doodleArray: Array,
  date: {type: Date, default: Date.now }

});

// define User mdel
var User = mongoose.model('User', UserSchema);

module.exports = User;
