(function () {
  'use strict';

  angular
    .module('sx-bi')
    .controller('CxcJuridicoController' ,CxcJuridicoController);

    CxcJuridicoController.$inject = ['$log', 'calendario', 'juridicoService'];

    function CxcJuridicoController ($log, calendario, juridicoService) {
      var vm = this;
      vm.calendario = calendario;

      activate();

      function activate () {
        $log.info('Activando controlador:  CxcJuridicoController...');
        juridicoService.getClientes(vm.calendario)
        .then( function(data) {
          vm.clientes = data;
          //vm.total = getTotal(data);
        })
        .catch( function(response) {
          $log.error('Http error status: '+response.status);
          $log.error(response.statusText);
          $log.info('Error cargando clientes con atraso maximo....');
          
        });
      }

      
    }

})();