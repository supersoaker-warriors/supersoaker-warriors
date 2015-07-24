//app.js
angular.module('okdoodle', [
  'okdoodle.services',
  'okdoodle.profile',
  'okdoodle.draw',
  'okdoodle.signin',
  'okdoodle.signup',
  'ui.router'
])
// .run(function($state, $rootScope) {
//   $rootScope.$on('$stateChangeStart', function(e, to) {
//     if(to.data && to.data.isLogin) {

//     }
//   })
// })
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/draw');
  $stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: './app/auth/signin.html',
      controller: 'AuthController as auth',
      data: {
        isLogin: false
      }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: './app/auth/signup.html',
      controller: 'SignUpController as signup',
      data: {
        isLogin: false
      }
    })
    .state('profile', {
      url: '/profile',
      templateUrl: './app/profile/profile.html',
      controller: "ProfileController as profile",
      data: {
        isLogin: true
      }
    })
    .state('draw', {
      url: '/draw',
      templateUrl: './app/draw/draw.html',
      controller: 'DrawController as draw',
      data: {
        isLogin: true
      }
    });
});
