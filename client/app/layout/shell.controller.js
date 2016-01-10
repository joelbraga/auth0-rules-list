(function () {
  'use strict';

  angular
    .module('app')
    .controller('ShellCtrl', Shell);

  Shell.$inject = ['auth', '$http'];

  function Shell(auth, $http) {
    var vm = this;
    vm.auth = auth;

    vm.loading = true;
    vm.requestList = function () {
      vm.error = false;
      vm.list = undefined;
      $http({
        url: API_URL + '/api/list',
        method: 'GET',
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

})();
