(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('PapelKpiResumenController',PapelKpiResumenController);

  PapelKpiResumenController.$inject = ['$log','calendario','PapelKpi','PapelKpiInventario','ClienteAtrasoMax'];

  function PapelKpiResumenController($log, calendario, PapelKpi,PapelKpiInventario,ClienteAtrasoMax) {
    var vm = this;
    vm.calendario = calendario;

    activate();

    function activate(){
      $log.info('Activando controlador: PapelKpiResumenController.....');
      vm.kpi = PapelKpi.findByCalendario({calendarioId:calendario.id});
      vm.kpiInventario = PapelKpiInventario.findByCalendario({calendarioId:calendario.id});
      vm.kpiAtrasoMax = ClienteAtrasoMax
        .findByCalendario({
          calendarioId:calendario.id,
          clave: 'TOTAL'
        });
    }
  }

})();