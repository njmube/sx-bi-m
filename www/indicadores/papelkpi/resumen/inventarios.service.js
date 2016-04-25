(function() {
  'use strict';

  angular
    .module('sx-bi')
    .factory('PapelKpiInventario',PapelKpiInventario);

  PapelKpiInventario.$inject = ['$resource'];

  function PapelKpiInventario($resource) {
    var res = $resource('http://localhost:8080/api/bi/papelKpiInventarios',
      null,
      {
        'findByCalendario': { method: 'GET',isArray:false}
      });
    return res;
    
  }

})();