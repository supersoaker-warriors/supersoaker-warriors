//app.js
angular.module('okdoodle', [
//'okdoodle.services',
  'okdoodle.profile',
//  'okdoodle.draw',
//  'okdoodle.signin',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/profile')
  // $routeProvider
  //   .when('/signin', {
  //     templateUrl: 'app/auth/signin.html',
  //     controller: 'AuthController'
  //   })
  //   // Your code here
  //   .when('/profile', {
  //     templateUrl: 'app/profile/profile.html',
  //     controller: 'ProfileController',
  //     authenticate: true,
  //   })
  //   .when('/draw', {
  //     templateUrl: 'app/draw/draw.html',
  //     controller: 'DrawController',
  //     authenticate: true,
  //   })
  //   .otherwise({
  //     redirectTo: '/profile'
  //   });

  $stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: './app/auth/signin.html',
      controller: 'AuthController'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: './app/profile/profile.html',
      controller: "ProfileController"
    })
    .state('profile.draw', {
      url: '/draw',
      templateUrl: './app/draw/draw.html',
      controller: 'DrawController'
    });



    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    //$httpProvider.interceptors.push('AttachTokens');
});
//
// .factory('AttachTokens', function ($window) {

// });
