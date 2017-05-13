angular.module('app.login', [])

  .controller('LoginCtrl', function($scope, $http, $ionicLoading) {
      console.log("login");
      $scope.loginData={
          email: "",
          password: "",
          userAgent: "app"
      };
    $scope.doLogin = function() {
        console.log("login");
      $http({
          url: urlapi + 'login',
          method: "POST",
          data: $scope.loginData
        })
        .then(function(response) {
            // success
            console.log("response: ");
            console.log(response.data);
            if (response.data.success == true) {
              localStorage.setItem("water_app_token", response.data.token);
              localStorage.setItem("water_app_userdata", JSON.stringify(response.data.user));
              window.location.reload();
            } else {
              console.log("login failed");
              $ionicLoading.show({
                template: 'Login failed, user or password error.',
                noBackdrop: true,
                duration: 2000
              });
            }
          },
          function(response) { // optional
            // failed
            console.log(response);
          });
    };
  });
