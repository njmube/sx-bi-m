(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('PapelKpiResumenTicketsController',PapelKpiResumenTicketsController);

  PapelKpiResumenTicketsController.$inject = ['$log','calendario','PapelKpi'];

  function PapelKpiResumenTicketsController($log,calendario,PapelKpi) {
    var vm = this;
    vm.calendario = calendario;
    
    activate();

    function activate(){
      $log.info('Activando controlador: PapelKpiResumenTicketsController..');
      vm.indicador = PapelKpi.findByCalendario({calendarioId:calendario.id});
    }
  }

})();