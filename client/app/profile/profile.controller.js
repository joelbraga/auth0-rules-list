(function () {
  'use strict';

  angular
    .module('app')
    .controller('Profile', Profile);

  Profile.$inject = ['auth'];

  function Profile(auth) {
    var vm = this;
    vm.auth = auth;
  }

})();
