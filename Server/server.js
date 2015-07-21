var express = require("express");
var bodyParser = require('body-parser');
var db = require('./db.js');
var path = require('path');

var app = express();

app.use(bodyParser.json());  

var PORT = 3000;

// var UserSchema = new Schema ({
//   id: ObjectId,
//   username: String,
//   first: String,
//   last: String,
//   email: String,
//   password: String,
//   age: Number,
//   description: String ,
//   profile_doodle: Object,
//   backup_doodle: Object,
//   date: Date


// });

app.get('/', function (req, res) {
  console.log(__dirname);
  res.sendFile(path.resolve(__dirname + '/../Public/index.html'));
});


app.post('/api/new', function (req, res) {
  console.log("post request received");
  console.log(req.body);
  var newUser = db({
      id: ObjectId,
      username: req.body.username,
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      description: req.body.description,
      profile_doodle: req.body.profile_doodle,
      backup_doodle: req.body.backup_doodle
  })
  newUser.save(function (err, userObj) {
    if (err) {
      console.log("error creating user: ", err);
      res.send('user saved successfully');
    }
    else {
      console.log('user saved successfully: ', userObj);
    }

  })
});
app.use(express.static(__dirname+ '/../Public'));

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Server listening at http://%s:%s", host, port);

});


var saveUser = function () {
  console.log("saveUser called");
  var user2 = new db({username: 'lisasimpson', 
                      first: 'Lisa',
                      last: 'Simpson'
                    });
  user2.save(function (err, userObj) {
    if (err) {
      console.log('error: ', err);
    }
    else {
      console.log('saved successfully:', userObj);
    }

  });

};
//saveUser();

var findAllUsers = function () {

  db.find({}, function (err, docs) {
    if (err) {
      console.log(err);
    }
    for (var i = 0; i < docs.length; i++ ) {
      console.log(docs[i]);
    }
  }



)};
// findAllUsers();