angular.module('app.menu', [])

  .controller('MenuCtrl', function($scope, $window) {
      if (localStorage.getItem("water_app_userdata")) {
            $scope.storageuser = JSON.parse(localStorage.getItem("water_app_userdata"));
            console.log($scope.storageuser);
          }

          $scope.logout = function() {
            localStorage.removeItem("water_app_token");
            localStorage.removeItem("water_app_userdata");
            $window.location.reload(true);
          };
  });
