// services.js
// contains factories
// use factories or services? idc to be honest.
// the main tendency seems to be: use factories for presentation logic, use services
// for non-presentation logic like AJAX requests.
function UserService() {
  // this holds USER object and shares it between scopes
  // var user = {};
  // with props like: username, firebase url pointers to pics that can be dummied for now, but should really
  // be initialized with an object input from the server. 
}


function DrawingService() {
  //TODO: this should contain drawing-specific elements that aren't used anywhere else.
  // should have a variable that points to the selected drawing in "UserProperties".

  //The object itself shouldn't be stored here, but the RECENT CHANGES should be emitted 
  // as well as a function that calls a separate "AjaxService" (actually a service, not a factory)
  // that makes the required AJAX calls (as a placeholder, makes the required Firebase DB updates)
}

// this  ONLY puts DrawingService uhh somewhere yeah somewhere.
angular
  .module('okdoodle.draw')
  .factory('DrawingService', DrawingService);
