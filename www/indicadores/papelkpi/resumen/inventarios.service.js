(function() {
  'use strict';

  angular
    .module('sx-bi')
    .factory('PapelKpiInventario',PapelKpiInventario);

  PapelKpiInventario.$inject = ['$resource', 'ApiEndpoint'];

  function PapelKpiInventario($resource,ApiEndpoint) {
    var url = ApiEndpoint.url+'bi/papelKpiInventarios'
    var res = $resource(url,
      null,
      {
        'findByCalendario': { method: 'GET',isArray:false}
      });
    return res;
    
  }

})();