(function() {
  'use strict';

  angular
    .module('sx-bi')
    .factory('papelKpiCxCService',papelKpiCxCService);

  papelKpiCxCService.$inject = ['$http', '$q', '$log'];

  function papelKpiCxCService($http, $q, $log) {
    var service = {
      buildPdf:buildPdf
    };

    return service;

    function buildPdf(calendar){
      
      return $q(function(resolve, reject) {
        var dd = createDocumentDefinition(calendar);
        var pdf = pdfMake.createPdf(dd);

        pdf.getBase64(function (output) {
            //$log.info('Generando pdf para PapelKpiCxC .....'+output);
            resolve(base64ToUint8Array(output));
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

  function createDocumentDefinition(calendar) {

      var items = [];

      var dd = {
          pageSize: 'LETTER',
          pageOrientation: 'landscape',
          content: [
              { text: 'PAPEL S.A. de C.V', style: 'header'},
              {
                columns: [
                  {
                    fontSize: 16,
                    alignment: 'left',
                    text: 'Fecha final'
                  },
                  {
                    fontSize: 16,
                    alignment: 'left',
                    text: 'Semana 14'
                  }
                ]
              },
              {
                  style: 'itemsTable',
                  table: {
                      widths: ['*', 75, 75, 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
                      body: [
                          [ 
                              { text: 'Clave', style: 'itemsTableHeader' },
                              { text: 'Nombre', style: 'itemsTableHeader' },
                              { text: 'Pzo', style: 'itemsTableHeader' },
                              { text: 'Línea', style: 'itemsTableHeader' },
                              { text: 'Facs', style: 'itemsTableHeader' },
                              { text: 'Aso Max', style: 'itemsTableHeader' },
                              { text: 'Saldo', style: 'itemsTableHeader' },
                              { text: 'X Vencer', style: 'itemsTableHeader' },
                              { text: 'Vencido', style: 'itemsTableHeader' },
                              { text: '1 a 30 ', style: 'itemsTableHeader' },
                              { text: '31 a 60', style: 'itemsTableHeader' },
                              { text: '61 a 90', style: 'itemsTableHeader' },
                              { text: ' 90 +', style: 'itemsTableHeader' },
                              { text: 'Ult pago', style: 'itemsTableHeader' }
                              
                          ]
                      ].concat(items)
                  }
              },
              
          ],
          styles: {
              header: {
                  fontSize: 20,
                  bold: true,
                  margin: [0, 0, 0, 10],
                  alignment: 'right'
              },
              subheader: {
                  fontSize: 16,
                  bold: true,
                  margin: [0, 20, 0, 5]
              },
              itemsTable: {
                  margin: [0, 5, 0, 15]
              },
              itemsTableHeader: {
                  bold: true,
                  fontSize: 13,
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