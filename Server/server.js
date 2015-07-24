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
  console.log(__dirname);
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.post('/api/new', function (req, res) {
  console.log("post request received");
  console.log("body:",  req.body);
  res.send('post worked');
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
      res.send('user saved successfully');
    }
    else {
      console.log('user saved successfully: ', userObj);
    }

  });
});


// var update_obj=
// {
//   username: 'bobbarker',
//   updates: {email: 'new@email.com',
//             age: 6,
//             doodles: {0: {
//                 all: "true",
//                 deletions: { },
//                 changes: { }

//                         },
//                       1: {
//                       all: "false",
//                       deletions: { },
//                       changes: { }
//                     }
//             }
//           }
// };


app.post('/api/update', function (req, res) {
  console.log(req.body);
  //updates will contain all fields, including doogles, that we want to change
  var updates = req.body.updates;
  console.log("updates: ", updates);
  // query is the criteria to find user we want to update
  var query = { username: req.body.username };
  console.log("QUERY ", query);

  //find the actual user
  db.findOne(query, function (err, user) {
    if (err) {
      console.log(err);
    }
    console.log("user: ", user);
    if (Object.keys(user).length === 0) {
      console.log("user is not logged in or does not exist!");
      res.send("You are not logged in!");
      return;
    }
    // store what is updated to be sent in a response message
    var sendMsg = ['updated: '];
    console.log("updates: ", updates);

    for (var key in updates) {


      // if key is not undefined, we want to change it
      if (updates[key] !== undefined) {
        if (key !== 'doodles') {
          user[key] = updates[key];
          console.log("key: ", key, updates[key]);
          sendMsg.push(key);
        }
        // handle doodles a bit differently...
        else if (key === 'doodles') {
          sendMsg.push('doodles');
          console.log("USER HERE: ", user);
          // create an empy object inside doodle array if the array is empty
          console.log(user['doodleArray']);

          if (user['doodleArray'].length === 0 ) {
            user.doodleArray.push({});
          }
          //for each doodle:
          for (var doodle in updates[key]) {
            // if block below allows for a new doodle to be created
            if (user.doodleArray[doodle] === undefined) {
              user.doodleArray.push({});
            }
            console.log("updates[key][doodle] ", updates[key][doodle]);
            // first, handle deletions:
            if ("deletions" in updates[key][doodle]) {
              sendMsg.push("---deletions---");
              // if special key 'all' is true, wipe out that object
              if (updates[key][doodle]["deletions"]["all"] === true ) {
                user.doodleArray[doodle] = {};
              }
              else {
                for (var loc in updates[key][doodle]["deletions"]) {
                  delete user.doodleArray[doodle][loc];
                }
              }
            }
            // then handle additions
            if ("changes" in updates[key][doodle]) {
              sendMsg.push("---changes---");
              for (var loc in updates[key][doodle]["changes"]) {
                console.log("!!! loc HERE", loc);
                user.doodleArray[doodle][loc] = updates[key][doodle]["changes"][loc];
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
        console.log("FINAL USER: ", user);
      });
    });
    sendMsg = sendMsg.join(' ');
    console.log(user);
    res.send(user, sendMsg);


   });
});


app.post('/api/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log("called!");
  db.findOne({
          username: username
          },
    function (err, user) {
      console.log("user", user);
      console.log("password ", password, user.password);
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
        res.send(user);
      }
    });
});



var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Server listening at http://%s:%s", host, port);



});


// var saveUser = function () {
//   console.log("saveUser called");
//   var user2 = new db({username: 'lisasimpson',
//                       first: 'Lisa',
//                       last: 'Simpson'
//                     });
//   user2.save(function (err, userObj) {
//     if (err) {
//       console.log('error: ', err);
//     }
//     else {
//       console.log('saved successfully:', userObj);
//     }

//   });

// };
//saveUser();

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
findAllUsers();
