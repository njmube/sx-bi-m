(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('PapelKpiResumenToneladasController',PapelKpiResumenToneladasController);

  PapelKpiResumenToneladasController.$inject = ['$log','calendario','PapelKpi'];

  function PapelKpiResumenToneladasController($log,calendario,PapelKpi) {
    var vm = this;
    vm.calendario = calendario;
    
    activate();

    function activate(){
      $log.info('Activando controlador: PapelKpiResumenToneladasController..');
      vm.indicador = PapelKpi.findByCalendario({calendarioId:calendario.id});
    }
  }

})();