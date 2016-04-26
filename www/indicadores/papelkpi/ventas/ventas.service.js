(function() {
  'use strict';

  angular
    .module('sx-bi')
    .factory('papelKpiVenta',papelKpiVenta);

  papelKpiVenta.$inject = ['$http','$localStorage','$log'];

  function papelKpiVenta($http, $localStorage, $log) {
    //$localStorage.$default({calendarios:[],currentCalendario:{}});
    var ventas = [];
    var service = {
      getVentas: getVentas,
      getCurrent: getCurrent,
      setCurrent: setCurrent 
    }

    return service;

    function getVentas(calendario) {
      return $http.get('http://localhost:8080/api/bi/factVentasSemBi',
        {
          params: {calendarioId:calendario.id} 
        }
      );
    }

    function getCurrent() {
      return $localStorage.ventasKpi;
    }

    function setCurrent(kpi) {
      $localStorage.ventasKpi = kpi;
    }
  }

})();