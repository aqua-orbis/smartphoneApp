angular.module('app.user', [])

  .controller('UserCtrl', function($scope, $stateParams, $http, $ionicLoading) {
    $scope.user = {};
    $scope.doRefresh = function() {
      /* events refresh: */
      $http.get(urlapi + 'users/id/' + $stateParams.userid)
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

    $scope.doFollow = function() {
        $http({
            url: urlapi + 'users/follow/' + $stateParams.userid,
            method: "POST",
            data: "{}"
          })
        .then(function(data) {
          console.log('data success events');
          console.log(data); // for browser console

          localStorage.setItem("water_app_userdata", JSON.stringify(data.data));
          $scope.storageuser = JSON.parse(localStorage.getItem("water_web_userdata"));

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
    $scope.doUnfollow = function() {
        $http({
            url: urlapi + 'users/unfollow/' + $stateParams.userid,
            method: "POST",
            data: "{}"
          })
        .then(function(data) {
          console.log('data success events');
          console.log(data); // for browser console

          localStorage.setItem("water_app_userdata", JSON.stringify(data.data));
          $scope.storageuser = JSON.parse(localStorage.getItem("water_web_userdata"));

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

    //chart
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{
        yAxisID: 'y-axis-1'
    }, {
        yAxisID: 'y-axis-2'
    }];
    $scope.options = {
        scales: {
            yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }
            ]
        }
    };


    //publications functions
    $scope.publications=[];
    $scope.page=0;

    $scope.doRefresh = function() {
        $http({
            url: urlapi + 'publications/user/id/' + $stateParams.userid,
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
