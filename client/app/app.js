//app.js
angular.module('okdoodle', [
  'okdoodle.profile',
  'okdoodle.draw',
  'okdoodle.signin',
  'okdoodle.signup',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/draw');
  $stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: './app/auth/signin.html',
      controller: 'AuthController as auth'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: './app/auth/signup.html',
      controller: 'SignUpController as signup'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: './app/profile/profile.html',
      controller: "ProfileController as profile"
    })
    .state('draw', {
      url: '/draw',
      templateUrl: './app/draw/draw.html',
      controller: 'DrawController as draw'
    });
});
