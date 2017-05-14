angular.module('app.edituser', [])

  .controller('EdituserCtrl', function($scope, $stateParams, $http, $ionicLoading) {
    $scope.user = {};
    $scope.doRefresh = function() {
      /* events refresh: */
      $http.get(urlapi + 'users/id/' + $scope.storageuser._id)
        .then(function(data) {
          console.log('data success events');
          console.log(data); // for browser console
          $scope.user = data.data;
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


    $scope.updateUser = function() {
        $http({
            url: urlapi + 'users/update',
            method: "PUT",
            data: $scope.user
        })
        .then(function(data){
            console.log('data success events');
            console.log(data); // for browser console
            //$scope.events = data.data; // for UI
            //$scope.publications=data.data;
            window.location.href="#/app/user/" + $scope.user._id;

        }, function(data){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
            $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

        });
    };

  });
