// signin.js
angular.module('okdoodle.signup', ['ui.router'])

.controller('SignUpController', function (UserService) {
  this.header = 'signup';
  this.postNew = function() {
  	UserService.postNew({username: this.username, password: this.password});
  };
});
