var express = require("express");
var app = express();

app.use(express.static('client'));

var PORT = 3000;

app.get('/profile', function (req, res) {
});

module.exports = app;

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Server listening at http://%s:%s", host, port);

});

