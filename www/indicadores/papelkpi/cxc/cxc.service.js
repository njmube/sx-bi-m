(function() {
  'use strict';

  angular
    .module('sx-bi')
    .factory('papelKpiCxCService',papelKpiCxCService);

  papelKpiCxCService.$inject = ['$http', '$q', '$log','ClienteAtrasoMax', 'ApiEndpoint'];

  function papelKpiCxCService($http, $q, $log, ClienteAtrasoMax, ApiEndpoint) {
    var service = {
      buildPdf:buildPdf
    };

    return service;

    function buildPdf(calendario){
      
      
      return $q(function(resolve, reject) {
        
        var endpoint = ApiEndpoint.url+'bi/clienteAtrasoMax'
        $http.get(endpoint,{params: {calendarioId:calendario.id}})
          .then(function(response) {
            $log.info('Response: '+response.data);
            var dd = createDocumentDefinition(calendario,response.data);
            var pdf = pdfMake.createPdf(dd);

            pdf.getBase64(function (output) {
                //$log.info('Generando pdf para PapelKpiCxC .....'+output);
                resolve(base64ToUint8Array(output));
            });
          });
      });
    }
  }

  function base64ToUint8Array(base64) {  
      var raw = atob(base64);
      var uint8Array = new Uint8Array(raw.length);
      for (var i = 0; i < raw.length; i++) {
      uint8Array[i] = raw.charCodeAt(i);
      }
      return uint8Array;
  }

  function createDocumentDefinition(calendario,rows) {
      
      var items = rows.map(function(item) {
               return [
                item.clave, 
                item.nombre,
                item.plazo.toString(),
                item.lineaCredito.toString(),
                item.facturas.toString(),
                item.atrasoMax.toString(),
                item.saldo.toString(),
                item.porVencer.toString(),
                item.vencido.toString(),
                item.atraso1a30.toString(),
                item.atraso31a60.toString(),
                item.atraso61a90.toString(),
                item.atrasomas91.toString()
               ];
            });
      var fecha = new Date(calendario.fechaFinal).addDays(-1);
      var dd = {
          pageSize: 'LETTER',
          pageOrientation: 'landscape',
          pageMargins: [ 10, 10, 10, 10 ],
          content: [
              { text: 'PAPEL S.A. de C.V', style: 'header'},
              {
                columns: [
                  {
                    fontSize: 16,
                    alignment: 'left',
                    text: fecha.toLocaleDateString('es-MX',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                  },
                  {
                    fontSize: 16,
                    alignment: 'left',
                    text: 'Semana '+calendario.semana
                  }
                ]
              },
              {
                  style: 'itemsTable',
                  table: {
                      widths: ['auto','*','auto','auto','auto','auto','auto','auto','auto','auto','auto','auto','auto'
                        //75, 75, 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' 
                      ],
                      body: [
                          [ 
                              { text: 'Clave', style: 'itemsTableHeader' },
                              { text: 'Nombre', style: 'itemsTableHeader' },
                              { text: 'Pzo', style: 'itemsTableHeader' },
                              { text: 'Línea', style: 'itemsTableHeader' },
                              { text: 'Facs', style: 'itemsTableHeader' },
                              { text: 'A. Max', style: 'itemsTableHeader' },
                              { text: 'Saldo', style: 'itemsTableHeader' },
                              { text: 'X Venc', style: 'itemsTableHeader' },
                              { text: 'Vdo', style: 'itemsTableHeader' },
                              { text: '1 a 30 ', style: 'itemsTableHeader' },
                              { text: '31 a 60', style: 'itemsTableHeader' },
                              { text: '61 a 90', style: 'itemsTableHeader' },
                              { text: ' 90 +', style: 'itemsTableHeader' }
                              
                          ]
                      ].concat(items)
                  }
              },
              
          ],
          styles: {
              header: {
                  fontSize: 18,
                  bold: true,
                  margin: [0, 0, 0, 5],
                  alignment: 'right'
              },
              subheader: {
                  fontSize: 10,
                  bold: true,
                  margin: [0, 20, 0, 5]
              },
              itemsTable: {
                  margin: [0, 5, 0, 10],
                  fontSize:8
              },
              itemsTableHeader: {
                  bold: true,
                  fontSize: 10,
                  color: 'black'
              },
              totalsTable: {
                  bold: true,
                  margin: [0, 30, 0, 0]
              }
          },
          defaultStyle: {
          }
      }

      return dd;
  }

})();