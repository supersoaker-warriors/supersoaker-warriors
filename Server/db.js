var mongoose = require('mongoose');
var mongodb = require('mongodb');


mongoose.connect('mongodb://localhost/my_database');



// define schema
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;


var User = new Schema ({
  username: ObjectId,
  first: String,
  last: String,
  email: String
  password: String,
  age: Number,
  description: String 
  profile_doodle: Object,
  backup_doodle: Object,
  date: Date



});



// define User mdel


// create an example (user1) - instance of a user

// call save method with callbacks