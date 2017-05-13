angular.module('app.users', [])

  .controller('UsersCtrl', function($scope, $http, $ionicLoading) {
      $scope.users = {};
      $scope.doRefresh = function() {
        /* events refresh: */
        $http.get(urlapi + "users")
          .then(function(data) {
            console.log('data success events');
            console.log(data); // for browser console
            $scope.users = data.data;
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
