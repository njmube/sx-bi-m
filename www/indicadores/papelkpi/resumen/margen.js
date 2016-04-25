(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('PapelKpiResumenMargenController',PapelKpiResumenMargenController);

  PapelKpiResumenMargenController.$inject = ['$log','calendario','PapelKpi'];

  function PapelKpiResumenMargenController($log,calendario,PapelKpi) {
    var vm = this;
    vm.calendario = calendario;
    
    activate();

    function activate(){
      $log.info('Activando controlador: PapelKpiResumenMargenController..');
      vm.indicador = PapelKpi.findByCalendario({calendarioId:calendario.id});
    }
  }

})();