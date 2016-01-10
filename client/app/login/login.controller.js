(function () {
  'use strict';

  angular
    .module('app')
    .controller('Login', Login);

  Login.$inject = ['auth', 'store', '$location'];

  function Login(auth, store, $location) {
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
    };
  }

})();
