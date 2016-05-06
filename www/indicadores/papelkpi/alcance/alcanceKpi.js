(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('PapelKpiAlcanceController',PapelKpiAlcanceController);

  PapelKpiAlcanceController.$inject = ['calendario','papelKpiAlcance','$log'];
  
  function PapelKpiAlcanceController(calendario,papelKpiAlcance,$log,VentaKpiRow) {
    var vm = this;
    vm.calendario = calendario;
    vm.options = {
      loop: false,
      nextButton: 'Siguiente',
      prevButton: 'Anterior'
      // effect: 'fade',
      // speed: 500,
    };
    vm.data = {};
    
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
        mayorCosto:data.sum(function (n) { return n.mayorCosto; }),
        menorToneladas: data.sum(function (n) { return n.menorToneladas; }),
        menorProductos: data.sum(function (n) { return n.menorProductos; }),
        menorCosto:data.sum(function (n) { return n.menorCosto; }),
        menorDias1Nal:data.sum(function (n) { return n.menorDias1Nal; }),
        menorDias2Nal:data.sum(function (n) { return n.menorDias2Nal; }),
        menorDias1Imp:data.sum(function (n) { return n.menorDias1Imp; }),
        menorDias2Imp:data.sum(function (n) { return n.menorDias2Imp; }),

      };
      return res;
    }



    

    
  }
})();