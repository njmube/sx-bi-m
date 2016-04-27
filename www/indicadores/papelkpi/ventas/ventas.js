(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('PapelKpiVentasController', PapelKpiVentasController);

  PapelKpiVentasController.$inject = ['calendario','papelKpiVenta','$log','VentaKpiRow'];

  function PapelKpiVentasController(calendario,papelKpiVenta,$log,VentaKpiRow) {
    var vm = this;
    vm.calendario = calendario;
    vm.options = {
      // loop: false,
      // effect: 'fade',
      // speed: 500,
    };
    vm.data = {};
    
    activate();

    function activate() {
      $log.info('Inicializando controlador PapelKpiVentasController');
      papelKpiVenta.getVentas(vm.calendario)
      .then( function(data) {
        
        vm.ventasPorCalendario = data;
        //vm.ventas = data.ventas;
        vm.ventasPorSemana = data.ventasPorSemana;
        vm.resumenPorSemana = data.resumenPorSemana;
        
      })
      .catch( function(response) {
        $log.error('Http error status: '+response.status);
        $log.error(response.statusText);
        $log.info('Error cargando ventas....');
        
      });
    }

    
  }

})();