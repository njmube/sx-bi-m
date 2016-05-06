(function() {
  'use strict';

  angular
    .module('sx-bi')
    .factory('papelKpiInventario',papelKpiInventario);

  papelKpiInventario.$inject = ['$http', '$log', 'ApiEndpoint'];

  function papelKpiInventario($http, $log, ApiEndpoint) {
    
    var ventas = [];
    var service = {
      getInventarios: getInventarios,
      getPedidosPendientes : getPedidosPendientes,
      getComprobacion: getComprobacion
    }

    return service;
   
    function getInventarios (calendario) {
      var endpoint = ApiEndpoint.url + 'bi/inventarioSucursal';
      return $http.get(endpoint, {params: {calendarioId:calendario.id}})
        .then( function (response) {
          return response.data;
        });
    }

    function getPedidosPendientes (calendario) {
      var endpoint = ApiEndpoint.url + 'bi/pedidoPorLlegar';
      return $http.get(endpoint, {params: {calendarioId:calendario.id}})
        .then( function (response) {
          return response.data;
        });
    }

    function getComprobacion (calendario) {
      var endpoint = ApiEndpoint.url + 'bi/comprobacionDeInventario';
      return $http.get(endpoint, 
          {
            params: {
              semana:calendario.semana, 
              ejercicio:calendario.year
            }
          })
        .then( function (response) {
          return response.data;
        });
    }

  }
})();