// signin.js
angular.module('okdoodle.signin', ['ui.router'])

.controller('AuthController', function (UserService) {
  this.post = function(){
  	UserService.post({username: this.username, password: this.password});
  };
});
