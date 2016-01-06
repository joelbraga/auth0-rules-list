(function () {
    'use strict';

    angular
        .module('app')
        .controller('NavbarCtrl', NavbarController)
        .controller('AppCtrl', AppController)
        .controller('ProfileCtrl', ProfileController)
        .controller('LoginCtrl', LoginController);

    function NavbarController(auth, store, $location) {
        var vm = this;

        vm.isLoggedIn = function () {
            return auth.isAuthenticated;
        };

        /*
        vm.isActive = function (route) {
            return route === $location.path();
        };
        */

        vm.logout = function () {
            auth.signout();
            store.remove('profile');
            store.remove('token');
            $location.path('/');
        }
    }

    function AppController(auth, $http) {
        var vm = this;
        vm.auth = auth;

        vm.loading = true;
        vm.requestList = function () {
            vm.error = false;
            vm.list = undefined;
            $http({
                url: API_URL+'/api/list',
                method: 'GET'
            }).then(function (response) {
                vm.list = response.data;
                vm.loading = false;
            }, function (response) {
                vm.error = true;
            });
        };

        if (vm.auth.isAuthenticated) {
            vm.requestList();
        }
    }

    function ProfileController(auth, $location, store) {
        var vm = this;
        vm.auth = auth;
    }

    function LoginController(auth, store, $location) {
        var vm = this;
        vm.login = function () {
            auth.signin({}, function (profile, token) {
                // Success callback
                store.set('profile', profile);
                store.set('token', token);
                $location.path('/');
            }, function () {
                // Error callback
            });
        }
    }
})();