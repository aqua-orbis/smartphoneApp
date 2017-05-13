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

    $scope.doLike = function(publication) {
        $http({
            url: urlapi + 'publications/like/id/' + publication._id,
            method: "POST",
            data: "{}"
          })
        .then(function(data) {
          console.log('data success events');
          console.log(data); // for browser console

          $scope.doRefresh();

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
    $scope.doUnlike = function(publication) {
        $http({
            url: urlapi + 'publications/unlike/id/' + publication._id,
            method: "POST",
            data: "{}"
          })
        .then(function(data) {
          console.log('data success events');
          console.log(data); // for browser console

          $scope.doRefresh();

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

    $scope.arrayObjectIndexOf = function(myArray, searchTerm) {
        console.log("array");
        console.log(myArray);
        console.log(searchTerm);
        if(myArray){
            for(var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i] === searchTerm){
                    return i;
                }
            }
        }
        return -1;
    };
});
