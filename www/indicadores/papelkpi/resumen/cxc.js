(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('PapelKpiResumenCxCController',PapelKpiResumenCxCController);

  PapelKpiResumenCxCController.$inject = ['$log','calendario','ClienteAtrasoMax'];

  function PapelKpiResumenCxCController($log,calendario,ClienteAtrasoMax) {
    var vm = this;
    vm.calendario = calendario;
    
    activate();

    function activate(){
      $log.info('Activando controlador: PapelKpiResumenCxCController..');
      vm.indicador = ClienteAtrasoMax
        .findByCalendario({
          calendarioId:calendario.id,
          clave: 'TOTAL'
        });
    }
  }

})();