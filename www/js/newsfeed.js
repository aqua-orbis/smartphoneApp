angular.module('app.newsfeed', [])

.controller('NewsfeedCtrl', function($scope, $http, $ionicModal,
            $timeout, $ionicLoading, $filter) {


    $scope.publications=[];
    $scope.page=0;

    $scope.doRefresh = function() {
        $http({
            url: urlapi + 'newsfeed',
            method: "GET"
        })
        .then(function(data){
            console.log('data success events');
            console.log(data); // for browser console
            //$scope.events = data.data; // for UI
            $scope.publications=data.data;
            $scope.$broadcast('scroll.refreshComplete');//refresher stop

        }, function(data){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
            $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

        });
    };
    $scope.doRefresh();
});
