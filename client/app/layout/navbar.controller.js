(function () {
  'use strict';


  angular
    .module('app')
    .controller('Navbar', Navbar);

  Navbar.$inject = ['auth', 'store', '$location'];

  function Navbar(auth, store, $location) {
    var vm = this;

    vm.isLoggedIn = function () {
      return auth.isAuthenticated;
    };

    vm.logout = function () {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $location.path('/');
    };
  }

})();
