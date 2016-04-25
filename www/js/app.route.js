(function() {
  'use strict';

  angular
    .module('sx-bi')
    .config(configBlock);

  configBlock.$inject = ['$stateProvider','$urlRouterProvider'];

  function configBlock($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'main/tabs.html',
        controller: 'MainController'
      })

      

    $urlRouterProvider.otherwise('/app/indicadores');
  }
})();