var express = require("express");
var bodyParser = require('body-parser');
var db = require('./db.js');



var app = express();

app.use(express.static(__dirname+ '/../Public'));

app.use(bodyParser.json());  

var PORT = 3000;

app.get('/', function (req, res) {
  res.send('Supersoaker Wariors!');
});

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
saveUser();

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
findAllUsers();