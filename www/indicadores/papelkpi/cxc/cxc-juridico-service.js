(function() {
  'use strict';

  angular
    .module('sx-bi')
    .factory('juridicoService',juridicoService);

  juridicoService.$inject = ['$http', '$log', 'ApiEndpoint'];

  function juridicoService($http, $log, ApiEndpoint) {
    
    var ventas = [];
    var service = {
      getClientes: getClientes
    }

    return service;
   
    function getClientes (calendario,deLinea) {
      var endpoint = ApiEndpoint.url + 'bi/juridico';
      return $http.get(endpoint)
        .then( function (response) {
          return response.data;
        });
    }

    

    

    

  }
})();