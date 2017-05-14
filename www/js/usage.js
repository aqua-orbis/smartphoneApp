angular.module('app.usage', [])

  .controller('UsageCtrl', function($scope, $stateParams, $http, $ionicLoading, utils) {
    $scope.contract = {};
    $http.get(urlapi + 'users/id/' + $scope.storageuser._id)
      .then(function(data) {
        console.log('data success events');
        console.log(data); // for browser console
        $scope.user = data.data;
        localStorage.setItem("water_app_userdata", JSON.stringify(data.data));
        $scope.storageuser = JSON.parse(localStorage.getItem("water_app_userdata"));
        $scope.doRefresh();
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
    $scope.doRefresh = function() {
      /* events refresh: */
      $http.get(urlapi + 'contracts/contractcod/' + $scope.storageuser.contratocod)
        .then(function(data) {
          console.log('data success events');
          console.log(data); // for browser console
          $scope.contract = data.data;
          $scope.chart = utils.contractToChart($scope.contract);
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
