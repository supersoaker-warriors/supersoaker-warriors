var express = require("express");
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var app = express();

app.use(express.static('Public'));

mongoose.connect('mongodb://localhost/my_database');

var PORT = 3000;

app.get('/', function (req, res) {
  res.send('Supersoaker Wariors!');
});

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Server listening at http://%s:%s", host, port);

});
