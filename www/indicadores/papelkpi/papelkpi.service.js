(function() {
  'use strict';

  angular
    .module('sx-bi')
    .factory('PapelKpi',PapelKpi);

  PapelKpi.$inject = ['$resource', 'ApiEndpoint'];

  function PapelKpi($resource, ApiEndpoint) {
    var uri = ApiEndpoint.url+'bi/papelKpis'
    var res = $resource(uri,
      null,
      {
        'findByCalendario': { method: 'GET',isArray:false}
      });

    res.prototype.getDiferenciaVentasTon = function(argument){
      switch (argument) {
        case 'semanal':
          return (this.ventaSemanalTon - this.ventaSemanalTonMeta);
          break;
        case 'mensual':
          return (this.ventaMensualTon - this.ventaMensualTonMeta);
          break;
        case 'anual':
          return (this.ventaAnualTon - this.ventaAnualTonMeta);
          break;
        default:
          return 0.0
          break;
      }
    };

    res.prototype.getDesviacionVentasTon = function(argument){
      switch (argument) {
        case 'semanal':
          return ( (this.getDiferenciaVentasTon(argument)/this.ventaSemanalTon) * 100);
          break;
        case 'mensual':
          return ( (this.getDiferenciaVentasTon(argument)/this.ventaMensualTon) * 100);
          break;
        case 'anual':
          return ( (this.getDiferenciaVentasTon(argument)/this.ventaAnualTon) * 100);
          break;
        default:
          return 0.0
          break;
      }
    };

    res.prototype.getUtilidad = function(argument){
      switch (argument) {
        case 'semanal':
          return (this.ventaSemanal - this.costoSemanal);
          break;
        case 'mensual':
          return (this.ventaMensual - this.costoMensual);
          break;
        case 'anual':
          return (this.ventaAnual - this.costoAnual);
          break;
        default:
          return 0.0
          break;
      }
    };

    res.prototype.getMargen = function(argument){
      switch (argument) {
        case 'semanal':
          return   ( this.getUtilidad(argument) / this.costoSemanal) * 100 ;
          break;
        case 'mensual':
          return   ( this.getUtilidad(argument) / this.costoMensual) * 100 ;
          break;
        case 'anual':
          return   ( this.getUtilidad(argument) / this.costoAnual) * 100 ;
          break;
        default:
          return 0.0
          break;
      }
    };

    res.prototype.getKpiMargen = function(argument){
      switch (argument) {
        case 'semanal':
          var ps = ( (1-(this.getDesviacionMargen(argument)*-1)/100) * this.kpiSemanal );
          return ps>this.kpiSemanal ? this.kpiSemanal :ps;
          break;
        case 'mensual':
          var pm = ( (1-(this.getDesviacionMargen(argument)*-1)/100) * this.kpiMensual );
          return pm>this.kpiMensual ? this.kpiMensual : pm;
          break;
        case 'anual':
          var pa = ( (1-(this.getDesviacionMargen(argument)*-1)/100) * this.kpiAnual );
          return pa>this.kpiAnual ? this.kpiAnual : pa;
          break;
        default:
          return 0.0
          break;
      }
    };

    res.prototype.getDesviacionMargen = function(argument){
      return  this.getMargen(argument) - 19;
    };

    res.prototype.getKpiTotalMargen = function(){
      return this.getKpiMargen('semanal') + this.getKpiMargen('mensual') + this.getKpiMargen('anual');
    };  

    res.prototype.getKpiVentas = function(argument){
      switch (argument) {
        case 'semanal':
          var ps = ( (1-(this.getDesviacionVentasTon(argument)*-1)/100) * this.kpiSemanal );
          return ps>this.kpiSemanal ? this.kpiSemanal :ps;
          break;
        case 'mensual':
          var pm = ( (1-(this.getDesviacionVentasTon(argument)*-1)/100) * this.kpiMensual );
          return pm>this.kpiMensual ? this.kpiMensual : pm;
          break;
        case 'anual':
          var pa = ( (1-(this.getDesviacionVentasTon(argument)*-1)/100) * this.kpiAnual );
          return pa>this.kpiAnual ? this.kpiAnual : pa;
          break;
        default:
          return 0.0
          break;
      }
    };

    res.prototype.getKpiTotalVentas = function(){
      return this.getKpiVentas('semanal') + this.getKpiVentas('mensual') + this.getKpiVentas('anual');
    };

    res.prototype.getCostoKg = function(argument){
      switch (argument) {
        case 'semanal':
          return  (this.costoSemanal / this.ventaSemanalTon ) / 1000
          break;
        case 'mensual':
          return  (this.costoMensual / this.ventaMensualTon ) / 1000
          break;
        case 'anual':
          return  (this.costoAnual / this.ventaAnualTon ) / 1000
          break;
        default:
          return 0.0
          break;
      }
    };

    res.prototype.getPrecioKg = function(argument){
      switch (argument) {
        case 'semanal':
          return  (this.ventaSemanal / this.ventaSemanalTon ) / 1000
          break;
        case 'mensual':
          return  (this.ventaMensual / this.ventaMensualTon ) / 1000
          break;
        case 'anual':
          return  (this.ventaAnual / this.ventaAnualTon ) / 1000
          break;
        default:
          return 0.0
          break;
      }
    };

    res.prototype.getMetaPrecioKg = function(argument){
      return 22.75
    };

    res.prototype.getDesviacionPrecio = function(argument){
      var dif = this.getPrecioKg(argument)/this.getMetaPrecioKg(argument) - 1 
      return dif * 100
    };


    return res;
    
  }

})();