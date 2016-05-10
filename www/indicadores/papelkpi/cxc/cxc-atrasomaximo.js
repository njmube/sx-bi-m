(function () {
  'use strict';

  angular
    .module('sx-bi')
    .controller('CxcAtrasoMaximoController' ,CxcAtrasoMaximoController);

    CxcAtrasoMaximoController.$inject = ['$log', 'calendario', 'cxcAtrasoMaximo','ClienteAtrasoMax'];

    function CxcAtrasoMaximoController ($log, calendario, cxcAtrasoMaximo,ClienteAtrasoMax) {
      var vm = this;
      vm.calendario = calendario;

      activate();

      function activate () {
        $log.info('Activando controlador:  CxcAtrasoMaximoController...');
        cxcAtrasoMaximo.getClientes(vm.calendario)
        .then( function(data) {
          vm.clientes = data;
          vm.total = getTotal(data);
        })
        .catch( function(response) {
          $log.error('Http error status: '+response.status);
          $log.error(response.statusText);
          $log.info('Error cargando clientes con atraso maximo....');
          
        });

        vm.gtotal = ClienteAtrasoMax
        .findByCalendario({
          calendarioId:calendario.id,
          clave: 'TOTAL'
        });

      }

      function getTotal (rows) {
        
        var res = {
          facturas:0,
          saldo:0,
          porVencer: 0,
          vencido: 0,
          atraso1a30: 0,
          atraso31a60: 0,
          atraso61a90: 0,
          atrasomas91: 0
        };

        rows.forEach( function (item) {
          res.facturas+=item.facturas;
          res.saldo+= item.saldo;
          res.porVencer+= item.porVencer;
          res.vencido+= item.vencido;
          res.atraso1a30+= item.atraso1a30;
          res.atraso31a60+= item.atraso31a60;
          res.atraso61a90+= item.atraso61a90;
          res.atrasomas91+= item.atrasomas91;
        });
        return res;
      }
    }

})();