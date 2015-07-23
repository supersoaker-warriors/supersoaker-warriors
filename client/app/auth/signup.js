// signin.js
angular.module('okdoodle.signup', ['ui.router'])

.controller('SignUpController', function (UserService) {
  // Your code here
  this.header = 'signup';
  this.postNew = function() {
  	console.log("username: ", this.username);
  	console.log("password: ", this.password);
  	UserService.postNew({username: this.username, password: this.password});
  };
});
