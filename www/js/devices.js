angular.module('app.devices', [])

  .controller('DevicesCtrl', function($scope, $http, $ionicLoading) {
      $scope.devices = {};
      $scope.doRefresh = function() {
        /* events refresh: */
        $http.get(urlapi + "mydevices")
          .then(function(data) {
            console.log('data success events');
            console.log(data); // for browser console
            $scope.devices = data.data;
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
  });
