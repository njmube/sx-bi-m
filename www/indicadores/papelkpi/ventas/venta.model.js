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

})();