(function() {
  'use strict';

  angular
    .module('sx-bi')
    .config(configBlock);

  configBlock.$inject = ['$stateProvider','$urlRouterProvider'];

  function configBlock($stateProvider){
    $stateProvider
      .state('papelKpiVentas', {
        parent: 'papelkpiParent',
        url: '/ventas',
        views: {
          'indicadores@app': {
            templateUrl: 'indicadores/papelkpi/ventas/ventas.html',
            controller: 'PapelKpiVentasController',
            controllerAs: 'vm'
          }
        }
      });
  }

})();