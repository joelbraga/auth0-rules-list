(function () {
  'use strict';

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
    };
  }
  
  angular
    .module('app')
    .controller('LoginCtrl', LoginController);

})();
