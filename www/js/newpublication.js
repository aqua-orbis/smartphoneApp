angular.module('app.newpublication', [])

.controller('NewpublicationCtrl', function($scope, $http, $ionicModal,
            $timeout, $ionicLoading, $filter) {


    $scope.newpublication={};
    $scope.page=0;

    $scope.doNewPublication = function() {
        $http({
            url: urlapi + 'publications',
            method: "POST",
            data: $scope.newpublication
        })
        .then(function(data){
            console.log('data success events');
            console.log(data); // for browser console
            //$scope.events = data.data; // for UI
            //$scope.publications=data.data;
            window.location.href="#/app/newsfeed";
            $scope.$broadcast('scroll.refreshComplete');//refresher stop

        }, function(data){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
            $ionicLoading.show({ template: 'Error connecting server', noBackdrop: true, duration: 2000 });

        });
    };
});
