(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('PapelKpiResumenInventariosController',PapelKpiResumenInventariosController);

  PapelKpiResumenInventariosController.$inject = ['$log','calendario','PapelKpiInventario'];

  function PapelKpiResumenInventariosController($log,calendario,PapelKpiInventario) {
    var vm = this;
    vm.calendario = calendario;
    
    activate();

    function activate(){
      $log.info('Activando controlador: PapelKpiResumenInventariosController..');
      vm.indicador = PapelKpiInventario.findByCalendario({calendarioId:calendario.id});
    }
  }

})();