//app.js
angular.module('okdoodle', [
  'okdoodle.services',
  'okdoodle.profile',
  'okdoodle.draw',
  'okdoodle.signin',
  'okdoodle.signup',
  'ui.router'
])
.run(function($state, $rootScope, $timeout, UserService) {
  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    console.log('change state to ', toState.name);
    // shouldn't be able to access other pages if not signed in
    if(toState.name !== 'signin' && toState.name !== 'signup' && !$rootScope.loggedIn) {
      $timeout(function() {
        $state.go('signin');
      });
    }
    //   UserService.isLoggedIn()
    //   .then(function(auth) {
    //     console.log('auth: ', auth);
    //     if (auth) {
    //       $rootScope.loggedIn = true;
    //     } else {
    //       $rootScope.loggenIn = false;
    //     }
    //   });
    // } else
    if ($rootScope.loggedIn && (toState.name === 'signin' || toState.name === 'signup')) {
      $timeout(function() {
        $state.go('profile');
      });
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/profile');
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
    .state('profile.draw', {
      url: '/draw',
      templateUrl: './app/draw/draw.html',
      controller: 'DrawController as draw',
      data: {
        isLogin: true
      }
    });
});
