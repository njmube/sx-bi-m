(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('PapelKpiInventariosController',PapelKpiInventariosController);

  PapelKpiInventariosController.$inject = ['calendario','papelKpiInventario','$log'];
  
  function PapelKpiInventariosController(calendario,papelKpiInventario,$log,VentaKpiRow) {
    var vm = this;
    vm.calendario = calendario;
    
    activate();

    function activate() {
      $log.info('Inicializando controlador PapelKpiInventariosController');
      papelKpiInventario.getInventarios(vm.calendario)
      .then( function(data) {
        vm.inventarios = data;
        vm.totales = getTotales(data);  
        $log.info('Totales: '+vm.totales.toneladas);      
      })
      .catch( function(response) {
        $log.error('Http error status: '+response.status);
        $log.error(response.statusText);
        $log.info('Error cargando inventarios....');
        
      });

      papelKpiInventario.getPedidosPendientes(vm.calendario)
      .then( function(data) {
        vm.pendientes = data;
        vm.pedidosTotales = getTotalesPendientes(data);        
      })
      .catch( function(response) {
        $log.error('Http error status: '+response.status);
        $log.error(response.statusText);
        $log.info('Error cargando pedidos pendientes por llegar....');
        
      });

      papelKpiInventario.getComprobacion(vm.calendario)
      .then( function(data) {
        vm.comprobacion = data;
      })
      .catch( function(response) {
        $log.error('Http error status: '+response.status);
        $log.error(response.statusText);
        $log.info('Error cargando pedidos pendientes por llegar....');
        
      });
    }

    function getTotales(data) {
      var res = {
        toneladas:data.sum(function (n) { return n.toneladas; }),
        participacion: 100,
        costo:data.sum(function (n) { return n.costo; }) 
      };
      return res;
    }

    function getTotalesPendientes(data){
      var res = {
        toneladas:data.sum(function (n) { return n.toneladas; }),
        pedidos:data.sum(function (n) { return n.pedidos; }) 
      };
      return res;

    }

    
  }
})();