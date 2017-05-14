angular.module('app.newpublication', [])

.controller('NewpublicationCtrl', function($scope, $http, $ionicModal,
            $timeout, $ionicLoading, $filter, $cordovaCamera) {


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
                $scope.newpublication.img = "data:image/jpeg;base64," + imageData;
                }, function(err) {
                console.log(err);
            });
    };
});
