(function () {
  'use strict';

  angular
    .module('app')
    .controller('Shell', Shell);

  Shell.$inject = ['auth', '$location'];

  function Shell(auth, $location) {
    var vm = this;
    vm.auth = auth;
    if (!auth.isAuthenticated) {
      $location.path('/login');
    }
  }

})();
