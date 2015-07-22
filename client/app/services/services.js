// services.js
// contains factories, with two main purposes:
// a UserService factory that stores things about the user's session (username, firebasepointers)
// use factories or services? idc to be honest.
//TODO: figure out whether to use factories or services

angular
  .module('okdoodle')
  .factory('UserService', function ()/*TODO: does this 'require' anything? does it need to be required? */ {
  // this factory holds USER object and shares it between scopes.

  // the "test" variable will make some dummy data and instantiate it's own firebases
  // if we are testing. This can also be referenced from other factories
  var test = true;

  var user = {};
  // the "pics" object will store firebase urls pointing to
  user.pics = {};

  if(test){
    user.username = "Danky McThemes";
    // PSEUDO user.pics.profile = new firebase blah blah
  }
  // with props like: username, firebase url pointers to pics that can be dummied for now, but should really
  // be initialized with an object input from the server.

  return {user: user,
          test: test
  };

})

//TODO: find out if the second factory acts as a subfactory of the first (not ideal), or is the same as calling:
//angular
// .module('okdoodle') again.
.factory('AjaxService', function ($http){

   //this is to handle any GET and POST requests
   // this will also handle the firebase update logic (which are simplified "get" and "posts")
})


// on post for signin i want to get user
