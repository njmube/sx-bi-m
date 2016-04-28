(function() {
  'use strict';

  angular
    .module('sx-bi')
    .config(configBlock);

  configBlock.$inject = ['$stateProvider','$urlRouterProvider'];

  function configBlock($stateProvider){
    $stateProvider

      .state('papelKpiCxc', {
        parent: 'papelkpiParent',
        url: '/ventas',
        views: {
          'indicadores@app': {
            templateUrl: 'indicadores/papelkpi/cxc/cxckpi.home.html',
            controller: ['calendario',function(calendario) {
              var vm = this;
              vm.calendario = calendario;
            }],
            controllerAs: 'vm'
          }
        }
      });
      
  }

})();