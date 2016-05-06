(function() {
  'use strict';

  angular
    .module('sx-bi')
    .factory('papelKpiAlcance',papelKpiAlcance);

  papelKpiAlcance.$inject = ['$http', '$log', 'ApiEndpoint'];

  function papelKpiAlcance($http, $log, ApiEndpoint) {
    
    var ventas = [];
    var service = {
      getAlcance: getAlcance,
      getMargen: getMargen
    }

    return service;
   
    function getAlcance (calendario,deLinea) {
      var endpoint = ApiEndpoint.url + 'bi/inventarioAlcance';
      return $http.get(endpoint, {params: {calendarioId:calendario.id, deLinea:deLinea }})
        .then( function (response) {
          return response.data;
        });
    }

    function getMargen (calendario) {
      var endpoint = ApiEndpoint.url + 'bi/inventarioMargenSemanal';
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