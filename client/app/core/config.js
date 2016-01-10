(function () {
  'use strict';

  angular
    .module('app')
    .config(config)
    .run(run);

  config.$inject = ['$routeProvider', '$locationProvider', 'authProvider', '$httpProvider',
    'jwtInterceptorProvider', 'auth0Config'];

  function config($routeProvider, $locationProvider, authProvider, $httpProvider,
                  jwtInterceptorProvider, auth0Config) {
    $routeProvider
      .when('/', {
        controller: 'Shell',
        controllerAs: 'vm',
        templateUrl: 'app/layout/shell.html',
      })
      .when('/profile', {
        controller: 'Profile',
        controllerAs: 'vm',
        templateUrl: 'app/profile/profile.html',
      })
      .otherwise({
        redirectTo: '/',
      });
    $locationProvider.html5Mode(true);

    authProvider.init({
      domain: auth0Config.domain,
      clientID: auth0Config.clientId,
      loginUrl: '/login',
    });

    jwtInterceptorProvider.tokenGetter = ['store', function (store) {
      return store.get('token');
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
  }

  run.$inject = ['$rootScope', 'auth', 'store', 'jwtHelper', '$location'];

  function run($rootScope, auth, store, jwtHelper, $location) {
    // This hooks al auth events to check everything as soon as the app starts
    auth.hookEvents();

    // This events gets triggered on refresh or URL change
    $rootScope.$on('$locationChangeStart', function () {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!auth.isAuthenticated) {
            auth.authenticate(store.get('profile'), token);
          }
        } else {
          $location.path('/');
        }
      }
    });
  }

})();
