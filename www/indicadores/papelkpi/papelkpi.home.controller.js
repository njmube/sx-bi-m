(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('PapelKpiHomeController',PapelKpiHomeController);

  PapelKpiHomeController.$inject = ['$log','$ionicModal','$scope','calendarioService'];

  function PapelKpiHomeController($log,$ionicModal,$scope,calendarioService) {
    var vm = this;
    vm.selector;
    activate();

    vm.openSelector = function() {
      vm.selector.show();
    };
    vm.closeSelector = function() {
      vm.selector.hide();
    }
    
    $scope.$on('$destroy', function() {
      vm.selector.remove();
    });

    vm.setCalendario = function(cal) {
      vm.calendario = cal;
      calendarioService.setCurrent(cal);
      vm.closeSelector();
    }

    vm.cargarCalendarios = function() {
     cargarCalendarios();
    }

    function activate(){
      $log.info('Activando controller: PapelKpiHomeController');
      vm.calendario = calendarioService.getCurrent();
      $ionicModal.fromTemplateUrl(
        'indicadores/papelkpi/calendario/calendario.selector.html', 
        {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal){
          vm.selector = modal;
          
        });
      cargarCalendarios();
    }

    function cargarCalendarios() {
      calendarioService.getCalendarios()
         .then(function (response) {
           vm.calendarios = response.data;
           $scope.$broadcast('scroll.refreshComplete');
           $log.info('Calendarios cargados: '+vm.calendarios.length);
         }, function(response) {
           $log.error('Http error status: '+response.status);
           $log.error(response.statusText);
           $scope.$broadcast('scroll.refreshComplete');
         });
    }

  }
})();