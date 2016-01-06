(function () {
    'use strict';

    angular
        .module('app', [
            'auth0',
            'ngRoute',
            'angular-storage',
            'angular-jwt',
            'ngAnimate',
            'ui.bootstrap'
        ])
        .config(config)
        .run(run);

    function config($routeProvider, $locationProvider, authProvider, $httpProvider, jwtInterceptorProvider) {
        $routeProvider
            .when('/', {
                controller: 'AppCtrl',
                controllerAs: 'vm',
                templateUrl: 'partials/index'
            })
            /*
            .when('/login', {
                controller: 'LoginCtrl',
                controllerAs: 'vm',
                templateUrl: 'partials/login'
            })
            */
            .when('/profile', {
                controller: 'ProfileCtrl',
                controllerAs: 'vm',
                templateUrl: 'partials/profile'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);

        authProvider.init({
            domain: AUTH0_DOMAIN,
            clientID: AUTH0_CLIENT_ID,
            loginUrl: '/login'
        });

        jwtInterceptorProvider.tokenGetter = ['store', function (store) {
            return store.get('token');
        }];

        $httpProvider.interceptors.push('jwtInterceptor');
    }

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
                    // Either show the login page or use the refresh token to get a new idToken
                    $location.path('/');
                }
            }
        });
    }

})();
