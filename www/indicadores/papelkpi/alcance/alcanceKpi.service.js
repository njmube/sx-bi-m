(function() {
  'use strict';

  angular
    .module('sx-bi')
    .factory('papelKpiAlcance',papelKpiAlcance);

  papelKpiAlcance.$inject = ['$http', '$log', 'ApiEndpoint'];

  function papelKpiAlcance($http, $log, ApiEndpoint) {
    
    var ventas = [];
    var service = {
      getAlcance: getAlcance
    }

    return service;
   
    function getAlcance (calendario) {
      var endpoint = ApiEndpoint.url + 'bi/inventarioAlcance';
      return $http.get(endpoint, {params: {calendarioId:calendario.id}})
        .then( function (response) {
          return response.data;
        });
    }

    

  }
})();