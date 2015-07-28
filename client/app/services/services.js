// services.js
// contains factories, with two main purposes:
// a UserService factory that stores things about the user's session (username, firebasepointers)
// use factories or services? idc to be honest.
//TODO: figure out whether to use factories or services

angular.module('okdoodle.services', [])

.factory('UserService', function($http, $state, $rootScope) {

  var userObj = {};
  var all = {};
  var browse= function() {
    return $http({
      method: 'GET',
      url: '/api/browse'
    })
    .then(function(resp) {
      all.drawings = resp.data;
    });
  };

  var post = function(data) { //data
    return $http({
      method: 'POST',
      url: '/api/login',
      data: JSON.stringify(data)
    })
    .then(function(resp) {
      // console.log(resp);
      //if !error
      userObj.username = resp.data.username;
      userObj.doodles = resp.data.doodleArray;
      $rootScope.currentUser = userObj.username;
      $rootScope.loggedIn = true;
      $state.go('profile.draw');
      browse();
      // console.log(userObj);
    });
  };
  var postNew= function(data) {
    return $http({
      method: 'POST',
      url: '/api/new',
      data: JSON.stringify(data)
    })
    .then(function(resp) {
      console.log(resp);
      userObj.username = resp.data.username;
      userObj.doodles = resp.data.doodleArray;
      $rootScope.currentUser = userObj.username;
      $rootScope.loggedIn = true;
      $state.go('signin');
      browse();
    });
  };
  var postChange = function(data) {
    return $http({
      method: 'POST',
      url: '/api/update',
      data: JSON.stringify(
      {
        username: userObj.username,
        updates: {
          doodles: data
        }
      })
    })
    .then(function(resp) {
//      console.log(resp);
    });
  };
  var isLoggedIn = function() {
    return true;
  };
  return {
    userObj: userObj,
    all: all,
    browse: browse,
    post: post,
    postNew: postNew,
    postChange: postChange,
    isLoggedIn: isLoggedIn
  };
});
