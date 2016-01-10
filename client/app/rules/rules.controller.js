(function () {
  'use strict';

  angular
    .module('app')
    .controller('Rules', Rules);

  Rules.$inject = ['auth', '$http', 'apiUrl', 'rulesListCloseOthers'];

  function Rules(auth, $http, apiUrl, rulesListCloseOthers) {
    var vm = this;
    vm.auth = auth;
    vm.rulesListCloseOthers = rulesListCloseOthers;
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
