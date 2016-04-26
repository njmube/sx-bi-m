(function() {
  'use strict';

  angular
    .module('sx-bi')
    .config(configBlock);

  configBlock.$inject = ['$stateProvider','$urlRouterProvider'];

  function configBlock($stateProvider, $urlRouterProvider){
    $stateProvider
      // Indicadores
      .state('app.indicadores', {
        url: '/indicadores',
        views: {
          'indicadores': {
            templateUrl:'indicadores/indicadores.list.html'
          }
        }
      })
      // Papel KPI Inicio
      .state('papelkpi', {
        parent: 'app',
        url: '/papelkpi',
        views: {
          'indicadores': {
            templateUrl: 'indicadores/papelkpi/papelkpi.home.html',
            controller: 'PapelKpiHomeController',
            controllerAs: 'vm'
          }
        }
      })

      // Parent state for PapelKpi's child states DUI resolve calendar
      .state('papelkpiParent', {
        parent: 'app',
        url: '/papelkpi',
        abstract: true,
        resolve: {
          calendario: ['calendarioService', function(calendarioService){
            return calendarioService.getCurrent();
          }]
        },
      })

      .state('papelKpiResumen', {
        parent: 'papelkpiParent',
        url: '/resumen',
        views: {
          'indicadores@app': {
            templateUrl: 'indicadores/papelkpi/resumen/papelkpi.resumen.html',
            controller: 'PapelKpiResumenController',
            controllerAs: 'vm'
          }
        }
      })

      .state('kpiResumenToneladas', {
        parent: 'papelkpiParent',
        url: '/resumen',
        views: {
          'indicadores@app': {
            templateUrl: 'indicadores/papelkpi/resumen/toneladas.html',
            controller: 'PapelKpiResumenToneladasController',
            controllerAs: 'vm'
          }
        }
      })

      .state('kpiResumenMargen', {
        parent: 'papelkpiParent',
        url: '/resumen',
        views: {
          'indicadores@app': {
            templateUrl: 'indicadores/papelkpi/resumen/margen.html',
            controller: 'PapelKpiResumenMargenController',
            controllerAs: 'vm'
          }
        }
      })

      .state('kpiResumenPrecio', {
        parent: 'papelkpiParent',
        url: '/resumen',
        views: {
          'indicadores@app': {
            templateUrl: 'indicadores/papelkpi/resumen/precio.html',
            controller: 'PapelKpiResumenPrecioController',
            controllerAs: 'vm'
          }
        }
      })

      .state('kpiResumenTickets', {
        parent: 'papelkpiParent',
        url: '/resumen',
        views: {
          'indicadores@app': {
            templateUrl: 'indicadores/papelkpi/resumen/tickets.html',
            controller: 'PapelKpiResumenTicketsController',
            controllerAs: 'vm'
          }
        }
      })

      .state('kpiResumenInventarios', {
        parent: 'papelkpiParent',
        url: '/resumen',
        views: {
          'indicadores@app': {
            templateUrl: 'indicadores/papelkpi/resumen/inventarios.html',
            controller: 'PapelKpiResumenInventariosController',
            controllerAs: 'vm'
          }
        }
      })

      .state('kpiResumenCxC', {
        parent: 'papelkpiParent',
        url: '/resumen',
        views: {
          'indicadores@app': {
            templateUrl: 'indicadores/papelkpi/resumen/cxc.html',
            controller: 'PapelKpiResumenCxCController',
            controllerAs: 'vm'
          }
        }
      });

      //$urlRouterProvider.when('/  papelkpis','/papelkpis/list')
  }

})();