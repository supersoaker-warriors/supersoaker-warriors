
// draw.js
angular.module('okdoodle.draw', [])
.controller('DrawController', function () {
  //THIS IS REPLACEABLE.
  // need an Alias for the canvas element, and unfortunately 
  //might need to use angular's jqlite in lieu of true two-way data binding.
  // other options: maybe store each 
  //this.currentCanvas = angular.element(??)
})


.factory('DrawingService', function(){
  //TODO: this should contain drawing-specific elements that aren't used anywhere else.
  // should have a variable that points to the selected drawing in "UserProperties".

  // The object containing x/y coordinates shouldn't be stored here. that should be stored in userService
  // (or elsewhere, or) in app.js or profile.js. Why? that object needs to be referenced both in the "draw" view and in the 
  // "profile" view (as a smaller thumbnail).
  // We should also call methods from a dedicated factory for routing here: making POST requests on saves, for instance.
});
