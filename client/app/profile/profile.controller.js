(function () {
  'use strict';

  function ProfileController(auth) {
    var vm = this;
    vm.auth = auth;
  }

  angular
    .module('app')
    .controller('ProfileCtrl', ProfileController);

})();
