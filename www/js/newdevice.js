angular.module('app.newdevice', [])

.controller('NewdeviceCtrl', function($scope, $http, $ionicModal,
            $timeout, $ionicLoading, $filter, $cordovaCamera) {


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

    //camera
    $scope.selectImg = function(){
        console.log("img");
        var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.sourceType,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.newdevice.icon = "data:image/jpeg;base64," + imageData;
                }, function(err) {
                console.log(err);
            });
    };
});
