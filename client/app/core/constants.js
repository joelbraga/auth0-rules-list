(function() {
  'use strict';

  angular
    .module('app')
    .constant('auth0Config', {
      clientId: '',
      domain: '',
    })
    .constant('apiUrl', 'http://localhost:3000');
})();