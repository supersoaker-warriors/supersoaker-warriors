// profile.js
angular.module('okdoodle.profile', ['ui.router'])

.controller('ProfileController', function (DrawingService, UserService) {
  // Your code here
  // this property is more or less meaningless, for testing purposes
  this.welcome = 'okdoodle';
  this.selected = DrawingService.selected;
  this.changeSelect = function(clickedPhoto){
    DrawingService.changeSelected(clickedPhoto);
    console.log("changed! with ", clickedPhoto);
  }
  this.user = UserService.userObj.username;
});
