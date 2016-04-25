(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('MainController',MainController);

  MainController.$inject = ['$rootScope', '$log'];

  function MainController($rootScope, $log) {
    var vm = this;

    activate();

    function activate(){
      //$log.info('Activando main controller');

      $rootScope.$on('$stateNotFound ',
        function(event, unfoundState, fromState, fromParams){ 
          $log.info(error);
        });

      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          $log.error(error);
      });

      // $rootScope.$on('$stateChangeStart',
      //   function(event, toState, toParams, fromState, fromParams, options){ 
      //       //event.preventDefault(); 
      //       $log.info('State change start....From: '+fromState.name + ' To:'+toState.name);
      //       $log.info(' from url: '+fromState.url+ ' To url: '+toState.url);
      //       $log.info(' To template : '+angular.toJson(toState));
      //       $log.info(' To template : '+toState.templateUrl);
      //   });
    }
    
  }
})();