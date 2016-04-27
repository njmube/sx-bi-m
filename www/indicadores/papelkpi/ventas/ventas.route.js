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
            templateUrl: 'indicadores/papelkpi/ventas/ventaskpi.home.html',
          }
        }
      })
      .state('papelKpiVentasEnToneladas', {
        parent: 'papelkpiParent',
        url: '/ventas',
        views: {
          'indicadores@app': {
            templateUrl: 'indicadores/papelkpi/ventas/ventas.toneladas.html',
            controller: 'PapelKpiVentasController',
            controllerAs: 'vm'
          }
        }
      })

      .state('papelKpiVentasMargen', {
        parent: 'papelkpiParent',
        url: '/ventas',
        views: {
          'indicadores@app': {
            templateUrl: 'indicadores/papelkpi/ventas/ventaskpi.margen.html',
            controller: 'PapelKpiVentasController',
            controllerAs: 'vm'
          }
        }
      });
  }

})();