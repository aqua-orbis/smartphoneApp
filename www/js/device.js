angular.module('app.device', [])

  .controller('DeviceCtrl', function($scope, $stateParams, $http, $ionicLoading, utils) {
    $scope.device = {};
    $scope.doRefresh = function() {
      /* events refresh: */
      $http.get(urlapi + 'devices/id/' + $stateParams.deviceid)
        .then(function(data) {
          console.log('data success events');
          console.log(data); // for browser console
          $scope.device = data.data;
          $scope.chart = utils.deviceToChart($scope.device);
          $scope.labels = $scope.chart[1];
          $scope.data = $scope.chart[0];
          $scope.$broadcast('scroll.refreshComplete'); //refresher stop

        }, function(data) {
          console.log('data error');
          $scope.$broadcast('scroll.refreshComplete'); //refresher stop
          $ionicLoading.show({
            template: 'Error connecting server',
            noBackdrop: true,
            duration: 2000
          });

        });
    };
    $scope.doRefresh();


    //chart
    /*$scope.labels = $scope.chart[1];
    $scope.series = [];
    $scope.data = $scope.chart[0];*/
    /*$scope.deviceDataToChartData = function(device) {
        var registers = device.registers;
        for(var i=0; i<registers.length; i++) {
            $scope.data.push(registers[i].value);
            $scope.labels.push("a");
        }
    };*/
  });
