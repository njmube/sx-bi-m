(function() {
  'use strict';

  angular
    .module('sx-bi')
    .factory('ClienteAtrasoMax',ClienteAtrasoMax);

  ClienteAtrasoMax.$inject = ['$resource', 'ApiEndpoint'];

  function ClienteAtrasoMax($resource, ApiEndpoint) {
    var url = ApiEndpoint.url+'bi/clienteAtrasoMax'
    var res = $resource(url,
      null,
      {
        'findByCalendario': { method: 'GET',isArray:false}
      });

    res.prototype.getKpi = function() {
      return 4.0;
    }

    res.prototype.getDesviacion = function(){
       var part = (this.atrasomas30/this.saldo ) * 100
       var desv = (this.getKpi()/part - 1)
       return desv * 100;
    };

    res.prototype.getCalifiacion = function() {
      var part = (this.atrasomas30/this.saldo ) * 100
      var desv = (this.getKpi()/part )
      return desv > 1 ? 2.5: desv*2.5;
    };

    return res;
    
  }

})();