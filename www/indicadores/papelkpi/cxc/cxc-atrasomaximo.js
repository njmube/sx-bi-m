(function () {
  'use strict';

  angular
    .module('sx-bi')
    .controller('CxcAtrasoMaximoController' ,CxcAtrasoMaximoController);

    CxcAtrasoMaximoController.$inject = ['$log', 'calendario', 'cxcAtrasoMaximo'];

    function CxcAtrasoMaximoController ($log, calendario, cxcAtrasoMaximo) {
      var vm = this;
      vm.calendario = calendario;

      activate();

      function activate () {
        $log.info('Activando controlador:  CxcAtrasoMaximoController...');
        cxcAtrasoMaximo.getClientes(vm.calendario)
        .then( function(data) {
          vm.clientes = data;
        })
        .catch( function(response) {
          $log.error('Http error status: '+response.status);
          $log.error(response.statusText);
          $log.info('Error cargando clientes con atraso maximo....');
          
        });
      }
    }

})();