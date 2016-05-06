(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('PapelKpiAlcanceController',PapelKpiAlcanceController);

  PapelKpiAlcanceController.$inject = ['calendario','papelKpiAlcance','$log'];
  
  function PapelKpiAlcanceController(calendario,papelKpiAlcance,$log,VentaKpiRow) {
    var vm = this;
    vm.calendario = calendario;
    
    activate();

    function activate() {
      $log.info('Inicializando controlador PapelKpiAlcanceController');
      papelKpiAlcance.getAlcance(vm.calendario)
      .then( function(data) {
        vm.alcance = data;
        vm.totales = getTotales(data);
        $log.info('Totales: '+angular.toJson(vm.totales));

      })
      .catch( function(response) {
        $log.error('Http error status: '+response.status);
        $log.error(response.statusText);
        $log.info('Error cargando inventarios....');
        
      });
      papelKpiAlcance.getAlcance(vm.calendario,false)
      .then( function(data) {
        vm.alcanceEspecial = data;
        vm.totalEspecial = getTotales(data);
        $log.info('Totales: '+angular.toJson(vm.totales));

      })
      .catch( function(response) {
        $log.error('Http error status: '+response.status);
        $log.error(response.statusText);
        $log.info('Error cargando inventarios....');
        
      });

      papelKpiAlcance.getMargen(vm.calendario)
      .then( function(data) {
        vm.margen = data;
        //$log.info('Marge: '+angular.toJson(data));
      })
      .catch( function(response) {
        $log.error('Http error status: '+response.status);
        $log.error(response.statusText);
        $log.info('Error cargando datos....');
        
      });

      
    }

    function getTotales(data) {
      var res = {
        mayorToneladas: data.sum(function (n) { return n.mayorToneladas; }),
        mayorProductos: data.sum(function (n) { return n.mayorProductos; }),
        mayorParticipacion: 100,
        mayorCosto:data.sum(function (n) { return n.mayorCosto; }) 
      };
      return res;
    }



    

    
  }
})();