(function () {
  'use strict';

  angular
    .module('app')
    .controller('Shell', Shell);

  Shell.$inject = ['auth'];

  function Shell(auth) {
    var vm = this;
    vm.auth = auth;
  }

})();
