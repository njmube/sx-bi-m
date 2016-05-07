(function() {
  'use strict';

  angular
    .module('sx-bi')
    .factory('cxcAtrasoMaximo',cxcAtrasoMaximo);

  cxcAtrasoMaximo.$inject = ['$http', '$log', 'ApiEndpoint'];

  function cxcAtrasoMaximo($http, $log, ApiEndpoint) {
    
    var ventas = [];
    var service = {
      getClientes: getClientes
    }

    return service;
   
    function getClientes (calendario,deLinea) {
      var endpoint = ApiEndpoint.url + 'bi/clienteAtrasoMax';
      return $http.get(endpoint, {params: {calendarioId:calendario.id, deLinea:deLinea }})
        .then( function (response) {
          return response.data;
        });
    }

    

    

    

  }
})();