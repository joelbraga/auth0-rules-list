(function () {
  'use strict';

  function NavbarController(auth, store, $location) {
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

  angular
    .module('app')
    .controller('NavbarCtrl', NavbarController);

})();
