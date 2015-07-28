var express = require("express");
var bodyParser = require('body-parser');
var db = require('./db.js');
var path = require('path');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('client'));

module.exports = app;
var PORT = 3000;


app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.get('/api/browse', function (req, res) {
  // return all doodles
  var returnObj = {};
  var query = {doodleArray: {$exists: true, $ne: null}};
  db.find(query)
  .limit(10)
  .sort({date: -1})
  .exec(function (err, data) {
    if (err) {
      console.log("error: ", err);
    }
    res.send(data);
  });


});

app.post('/api/new', function (req, res) {
  //create new user
  var newUser = db({
      username: req.body.username,
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      description: req.body.description
  });
  newUser.save(function (err, userObj) {
    if (err) {
      console.log("error creating user: ", err);
    }
    else {
      res.send(userObj);
    }

  });
});

app.post('/api/update', function (req, res) {
  //updates will contain all fields, including doogles, that we want to change
  var updates = req.body.updates;
  // query is the criteria to find user we want to update
  var query = { username: req.body.username };

  //find the actual user
  db.findOne(query, function (err, user) {
    if (err) {
      console.log(err);
    }
    if (Object.keys(user).length === 0) {
      res.send("You are not logged in!");
      return;
    }
    // store what is updated to be sent in a response message
    var sendMsg = ['updated: '];

    for (var key in updates) {


      // if key is not undefined, we want to change it
      if (updates[key] !== undefined) {
        if (key !== 'doodles') {
          user[key] = updates[key];
          sendMsg.push(key);
        }
        // handle doodles a bit differently...
        else if (key === 'doodles') {
          sendMsg.push('doodles');
          // create an empy object inside doodle array if the array is empty

          if (user['doodleArray'].length === 0 ) {
            user.doodleArray.push({});
          }
          //for each doodle:
          for (var doodle in updates[key]) {
            // if block below allows for a new doodle to be created
            if (user.doodleArray[doodle] === undefined || user.doodleArray[doodle] === null) {
              user.doodleArray.doodle = {};
            }
            // first, handle deletions:
            if ("deletions" in updates[key][doodle]) {

              // if special key 'all' is true, wipe out that object -- useful for clear option
              if (updates[key][doodle]["deletions"]["all"] === true ) {
                user.doodleArray[doodle] = {};
                sendMsg.push("---deletions---");
              }

              else if (Object.keys(updates[key][doodle]['deletions']).length > 1) {
                sendMsg.push("---deletions---");
                for (var loc in updates[key][doodle]["deletions"]) {
                  if (user.doodleArray[doodle][loc] !== undefined) {                    
                    delete user.doodleArray[doodle][loc];
                  }
                }
              }
            }
            // then handle additions
            if ("changes" in updates[key][doodle]) {
              if (user.doodleArray[doodle] === null) {
                user.doodleArray[doodle] =  updates[key][doodle]["changes"];
              }
              sendMsg.push("---changes---");
              for (var loc in updates[key][doodle]["changes"]) {

                if (typeof user.doodleArray[doodle] === "object" && user.doodleArray[doodle] !== null) {
                  user.doodleArray[doodle][loc] = updates[key][doodle]["changes"][loc];
                }
              }
            }
          }
        } //that are a lot of curly braces, aren't there?
      }
    }
    user.save(function (err, user) {
      if (err) {
        console.log(err);
      }
      console.log('saved successfully!!!!:', user);
      db.findOneAndUpdate(query, user, {upsert: true}, function (err, user) {
        if (err) {
          console.log(err);
        }
      });
    });
    sendMsg = sendMsg.join(' ');
    res.send(user, sendMsg);
   });
});


app.post('/api/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  db.findOne({
          username: username
          },
    function (err, user) {
      if (err) {
        console.log(err);
      }
      else if (Object.keys(user).length === 0) {
        res.send("User doesn't exist!");
      }
      else if (user.password !== password) {
        res.send("Password is incorrect!");
      }
      else {
        //sends user object to client
        res.send(user);
      }
    });
});

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;


});

// call this function if you want to print out all the data
var findAllUsers = function () {

  db.find({}, function (err, docs) {
    if (err) {
      console.log(err);
    }
    for (var i = 0; i < docs.length; i++ ) {
      console.log(docs[i]);
    }
  });
};

