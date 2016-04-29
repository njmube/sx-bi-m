(function() {
  'use strict';

  angular
    .module('sx-bi')
    .controller('PapelKpiCxCController',PapelKpiCxCController);

  PapelKpiCxCController.$inject = ['$scope','$ionicModal','$log','papelKpiCxCService','calendarioService'];

  function PapelKpiCxCController($scope, $ionicModal, $log, papelKpiCxCService, calendarioService) {
    
    $scope.generateReport = generateReport;
    activate();

    // Initialize the modal view.
    $ionicModal.fromTemplateUrl('indicadores/papelkpi/cxc/cxc-pdf-viewer.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    function activate() {
      $log.info('Inicializando controlador: PapelKpiCxCController  ');

      //Defaults for PDF Viewer....
      $scope.scroll = 0;
      $scope.loading = 'loading';

      $scope.onError = function (error) {
          $log.error(error);
      };
      $scope.onLoad = function () {
          $scope.loading = 'Cargando datos...';
      };
      $scope.onProgress = function (progress) {
          $log.log(progress);
      };
    }

    function generateReport(calendarioId){
      var calendario = calendarioService.getCurrent();
      
      papelKpiCxCService.buildPdf(calendario)
      .then(function(pdf) {
        var blob = new Blob([pdf], {type: 'application/pdf'});
        $scope.pdfUrl = URL.createObjectURL(blob);
        $scope.modal.show();
      });
    }

    // Clean up the modal view.
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
  }

  

})();