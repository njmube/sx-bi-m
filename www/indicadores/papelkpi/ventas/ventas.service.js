(function() {
  'use strict';

  angular
    .module('sx-bi')
    .factory('papelKpiVenta',papelKpiVenta);

  papelKpiVenta.$inject = ['$http', '$localStorage', 'VentaKpiRow','$log', 'ApiEndpoint'];

  function papelKpiVenta($http, $localStorage, VentaKpiRow,$log, ApiEndpoint) {
    
    var ventas = [];
    var service = {
      getVentas: getVentas,
      getCurrent: getCurrent,
      setCurrent: setCurrent 
    }

    return service;

   
    function getVentas(calendario) {
      
      var endpoint = ApiEndpoint.url+'bi/factVentasSemBi';
      return $http.get(endpoint,{params: {calendarioId:calendario.id}})
        .then(function(response) {
          return new VentasPorCalendario(calendario,response.data);
        });
    }

    function getCurrent() {
      return $localStorage.ventasKpi;
    }

    function setCurrent(kpi) {
      $localStorage.ventasKpi = kpi;
    }

    function VentasPorCalendario(calendario,ventas) {

      this.ventas = ventas;
      this.calendario = calendario;
      this.total = ventas.reduce(function(acu, val) { return acu+val.toneladas;},0);

      this.ventasPorSemana = getVentasPorSegmento(ventas,'SEM');
      this.resumenPorSemana = getVentasPorTipoDePago(ventas,'SEM');

      this.ventasPorMes = getVentasPorSegmento(ventas,'MES');
      this.resumenPorMes = getVentasPorTipoDePago(ventas,'MES');

      this.ventasPorAno = getVentasPorSegmento(ventas,'YEAR');
      this.resumenPorAno = getVentasPorTipoDePago(ventas,'YEAR');
    }

    function getVentasPorSegmento(ventas,segmento){
      var selected = ventas.filter(function(value) { return value.tipo === segmento });
      var totalSegmento = selected.reduce(function(acu, val) { return acu+val.toneladas;},0);
      selected.forEach(function(row) {
        row.total = totalSegmento;
        if(totalSegmento > 0){
          row.participacion = (row.toneladas/totalSegmento)*100;
        }
        if(row.toneladas > 0){
          row.precio = row.venta/row.toneladas;
        }

      });
      return selected ;
    }

    function getVentasPorTipoDePago(ventas,tipo){
      var res = [];
      var cre = new VentaKpiRow('CRE');
      var con = new VentaKpiRow('CON'); 
      var total = new VentaKpiRow('Total');
      
      var toneladas = 0.0;
      

      for (var i = ventas.length - 1; i >= 0; i--) {

        if(ventas[i].tipo === tipo ){
          
          toneladas += ventas[i].toneladas;
          
          cre.toneladas += ventas[i].toneladasCre;
          cre.venta += ventas[i].ventaCre;
          cre.costo += ventas[i].costoCre;
          cre.facturas += ventas[i].facturasCre;
          cre.devoluciones += ventas[i].devolucionesCre;
          cre.canceladas += ventas[i].canceladasCre;
          
          con.toneladas += ventas[i].toneladasCon;
          con.venta += ventas[i].ventaCon;
          con.costo += ventas[i].costoCon;
          con.facturas += ventas[i].facturasCon;
          con.devoluciones += ventas[i].devolucionesCon;
          con.canceladas += ventas[i].canceladasCon;
          
          total.toneladas += ventas[i].toneladas;
          total.venta += ventas[i].venta;
          total.costo += ventas[i].costo;
          total.facturas += ventas[i].facturas;
          total.devoluciones += ventas[i].devoluciones;
          total.canceladas += ventas[i].canceladas;
        }
      }

      cre.total = toneladas;
      con.total = toneladas;
      total.total = toneladas;

      res.push(cre);
      res.push(con);
      res.push(total);

      return res;
    }

    

  }

  

  

})();