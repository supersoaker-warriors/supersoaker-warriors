// signin.js
angular.module('okdoodle.signin', ['ui.router'])

.controller('AuthController', function (UserService) {
  // Your code here
  // this.header = 'signin';
  this.post = function(){
  	console.log("username: ", this.username);
  	UserService.post({username: this.username, password: this.password});
  };
});
