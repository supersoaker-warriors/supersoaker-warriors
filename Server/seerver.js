// testing testing one two three
var express = require("express");
var app = express();

var PORT = 3000;

app.get('/', function (req, res) {
  res.send('Supersoaker Wariors!');
});

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Server listening at http://%s:%s", host, port);

});