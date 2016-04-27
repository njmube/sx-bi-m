(function() {
  'use strict';

  angular
    .module('sx-bi')
    .value('VentaKpiRow',VentaKpiRow);

    
  function VentaKpiRow(tipo,toneladas,venta,total){
    this.tipo = tipo
    this.toneladas = toneladas | 0;
    this.venta = venta | 0;
    this.total = total | 0;
    this.costo = 0;
    this.utilidad = 0;
    this.facturas = 0;
    this.canceladas = 0;
    this.devoluciones = 0;
    
  };

  VentaKpiRow.prototype.getParticipacion = function() {
    if(this.total > 0) {
      return (this.toneladas / this.total) * 100;
    }
    return 0;
  }
  VentaKpiRow.prototype.getPrecio = function() {
    if(this.toneladas > 0) {
      return this.venta/this.toneladas
    }
    return 0;
    
  }
  VentaKpiRow.prototype.getUtilidad = function() {
    return this.venta - this.costo;
  }
  VentaKpiRow.prototype.getMargen = function() {
    if(this.venta > 0) {
      return (this.getUtilidad() / this.venta) * 100;
    }
    return 0;
  }

})();