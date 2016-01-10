(function () {
  'use strict';

  angular
    .module('app')
    .controller('Rules', Rules);

  Rules.$inject = ['auth', '$http', 'apiUrl'];

  function Rules(auth, $http, apiUrl) {
    var vm = this;
    vm.auth = auth;

    vm.loading = true;
    vm.requestList = function () {
      vm.error = false;
      vm.list = undefined;
      $http({
        url: apiUrl + '/api/list',
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
