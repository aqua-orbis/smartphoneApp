angular.module('app.newdevice', [])

.controller('NewdeviceCtrl', function($scope, $http, $ionicModal,
            $timeout, $ionicLoading, $filter) {


    $scope.newdevice={};
    $scope.page=0;

    $scope.doNewDevice = function() {
        $http({
            url: urlapi + 'devices',
            method: "POST",
            data: $scope.newdevice
        })
        .then(function(data){
            console.log('data success events');
            console.log(data); // for browser console
            //$scope.events = data.data; // for UI
            //$scope.publications=data.data;
            window.location.href="#/app/devices";
        }, function(data){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
            $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

        });
    };
});
