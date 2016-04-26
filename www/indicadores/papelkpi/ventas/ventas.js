(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('PapelKpiVentasController', PapelKpiVentasController);

  PapelKpiVentasController.$inject = ['calendario','papelKpiVenta','$log'];

  function PapelKpiVentasController(calendario,papelKpiVenta,$log) {
    var vm = this;
    vm.calendario = calendario;
    vm.getVentasPorTipoDePago = getVentasPorTipoDePago;

    activate();

    function activate() {
      $log.info('Inicializando controlador PapelKpiVentasController');
      papelKpiVenta.getVentas(vm.calendario)
      .then( function(response) {
        $log.info('Ventas obtenidas: '+response.data.length);
        vm.ventas = response.data;
        vm.ventaSemCre = getVentasPorTipoDePago(vm.ventas,'SEM');
      }, function(response) {
        $log.error('Http error status: '+response.status);
        $log.error(response.statusText);
        
      });
    }

    function getVentasPorTipoDePago(ventas,tipo){
      var res = [];
      var cre = {tipo:'CRE', toneladas:0.0, venta:0.0, participacion:0.0, precio:0.0,tota:0.0};
      var con = {tipo:'CON', toneladas:0.0, venta:0.0, participacion:0.0, precio:0.0,total:0.0}; 
      var total = {tipo:'Total', toneladas:0.0, venta:0.0, participacion:100, precio:0.0,total:0.0}; 
      var toneladas = 0.0
      for (var i = ventas.length - 1; i >= 0; i--) {
        

        if(ventas[i].tipo === tipo ){
          toneladas += ventas[i].toneladas;
          cre.toneladas += ventas[i].toneladasCre;
          cre.venta += ventas[i].ventaCre
          con.toneladas += ventas[i].toneladasCon;
          con.venta += ventas[i].ventaCon;
          
          total.toneladas += ventas[i].toneladas;
          total.venta += ventas[i].venta;
        }
      }
      cre.total = toneladas;
      cre.participacion = (cre.toneladas / toneladas) * 100;
      cre.precio = cre.venta/cre.toneladas
      con.total = toneladas;
      con.participacion = (con.toneladas / toneladas) * 100;
      con.precio = con.venta/con.toneladas
      total.precio = total.venta/total.toneladas


      res.push(cre);
      res.push(con);
      res.push(total);

      return res;
    }
  }

})();