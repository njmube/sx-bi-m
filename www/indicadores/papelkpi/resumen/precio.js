(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('PapelKpiResumenPrecioController',PapelKpiResumenPrecioController);

  PapelKpiResumenPrecioController.$inject = ['$log','calendario','PapelKpi'];

  function PapelKpiResumenPrecioController($log,calendario,PapelKpi) {
    var vm = this;
    vm.calendario = calendario;
    
    activate();

    function activate(){
      $log.info('Activando controlador: PapelKpiResumenPrecioController..');
      vm.indicador = PapelKpi.findByCalendario({calendarioId:calendario.id});
    }
  }

})();