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
        //vm.totales = getTotales(data);  
      })
      .catch( function(response) {
        $log.error('Http error status: '+response.status);
        $log.error(response.statusText);
        $log.info('Error cargando inventarios....');
        
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

    

    
  }
})();