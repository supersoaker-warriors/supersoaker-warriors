//app.js
angular.module('okdoodle', [

  'okdoodle.profile',
  'okdoodle.draw',
  'okdoodle.signin',
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
