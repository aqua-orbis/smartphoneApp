angular.module('app.signup', [])

  .controller('SignupCtrl', function($scope, $http, $ionicLoading) {
      console.log("signup");
      $scope.signupData={
          email: "",
          password: "",
          userAgent: "app"
      };
    $scope.doSignup = function() {
        console.log("signup");
      $http({
          url: urlapi + 'signup',
          method: "POST",
          data: $scope.signupData
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
