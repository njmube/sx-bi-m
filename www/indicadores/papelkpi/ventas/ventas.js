(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('PapelKpiVentasController', PapelKpiVentasController);

  PapelKpiVentasController.$inject = ['calendario','papelKpiVenta','$log'];

  function PapelKpiVentasController(calendario,papelKpiVenta,$log) {
    var vm = this;
    vm.calendario = calendario;

    activate();

    function activate() {
      $log.info('Inicializando controlador PapelKpiVentasController');
      papelKpiVenta.getVentas(vm.calendario)
      .then( function(response) {
        $log.info('Ventas obtenidas: '+response.data.length);
        vm.ventas = response.data;
      }, function(response) {
        $log.error('Http error status: '+response.status);
        $log.error(response.statusText);
        
      });
    }
  }

})();