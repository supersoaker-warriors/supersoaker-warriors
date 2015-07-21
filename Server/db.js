var mongoose = require('mongoose');
//var mongodb = require('mongodb');


mongoose.connect('mongodb://localhost/my_database');



// define schema
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

//to do: set defaults and boundaries for types
var UserSchema = new Schema ({
  id: ObjectId,
  username: String,
  first: String,
  last: String,
  email: String,
  password: String,
  age: Number,
  description: String ,
  profile_doodle: Object,
  backup_doodle: Object,
  date: Date


});



// define User mdel
var User = mongoose.model('User', UserSchema);


// create an example (user1) - instance of a user
var user1 = new User({username: 'bobbarker', 
                      first: 'bob',
                      last: 'barker'
                    });


// call save method with callbacks
// user1.save(function (err, userObj) {

//   if (err) {
//     console.log('error: ', err);
//   }
//   else {
//     console.log('saved successfully:', userObj);
//   }

// })

module.exports = User;