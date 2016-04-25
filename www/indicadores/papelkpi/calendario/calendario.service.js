(function() {
  'use strict';

  angular
    .module('sx-bi')
    .factory('calendarioService',calendarioService);

  calendarioService.$inject = ['$http','$localStorage','$log'];

  function calendarioService($http, $localStorage, $log) {
    $localStorage.$default({calendarios:[],currentCalendario:{}});
    var calendarios = []; //$localStorage.calendarios;
    var service = {
      getCalendarios: getCalendarios,
      //cargarCalendarios: cargarCalendarios,
      getCurrent: getCurrent,
      setCurrent: setCurrent 
    }

    return service;

    function getCalendarios() {

      //return $localStorage.calendarios
      return $http.get('http://localhost:8080/api/bi/calendarios');
        // .then(function (response) {
        //   calendarios = response.data;
        //   $log.info('Calendarios cargados: '+calendarios.length);
        // }, function(response) {
        //   $log.error('Http error status: '+response.status);
        //   $log.error(response.statusText);
        // });
      //return calendarios;
    }

    /** Hacer que esto utilize promise $q */
    // function cargarCalendarios() {
      
    //   calendarios = [];

    //   // Leer calendarios de la nube y gardarlos en localStorage
    //   for (var i = 16; i >= 1; i--) {
    //     calendarios.push({'semana':i, year:2016});
    //   }
    //   $localStorage.calendarios = calendarios;
    // }

    function getCurrent() {
      return $localStorage.currentCalendario;
    }

    function setCurrent(cal) {
      $localStorage.currentCalendario = cal;
    }
  }

})();