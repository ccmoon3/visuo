angular.module('visuo.controllers', [])

.controller("WeatherCtrl",function ($scope, $http, $stateParams,$ionicSlideBoxDelegate){
     $scope.weather= {};
     $scope.weather.devices = [];
     var myActiveSlide ;

          $http.get("https://www.visuo.adsc.com.sg/api/app/?format=json").success(function(data){
                 $scope.weather.devices = data.imagers;
                 for ( i in $scope.weather.devices){
                        getDeviceData(i);
                 }
                  $ionicSlideBoxDelegate.update();
            })

     var getDeviceData = function (i){
          $http.get("https://www.visuo.adsc.com.sg/api/app/"+$scope.weather.devices[i].id+"/?format=json").success(function(data){
              $.extend($scope.weather.devices[i], data, {photo:"https://www.visuo.adsc.com.sg/api/app/"+$scope.weather.devices[i].id+"/image/"});
          })
     }

     $scope.slideSwipe = function() {

        $scope.myActiveSlide=myActiveSlide;
        $ionicSlideBoxDelegate.update();
        console.log("SwipeFrom:"+ $scope.myActiveSlide);
     }

     $scope.slideHasChanged = function(index) {

             $scope.myActiveSlide= index;
             myActiveSlide= index;
             $ionicSlideBoxDelegate.update();
             console.log("ChangedTo:"+ $scope.myActiveSlide);
     }


})

.controller("DeviceCtrl",function ($scope, $http, $stateParams,$ionicSlideBoxDelegate){
  /*   $scope.myActiveSlide= $stateParams.imagerId;
     $ionicSlideBoxDelegate.update();
     console.log("DeviceCtrl:"+$scope.myActiveSlide);DirectChanged($index)*/

  /*    $scope.DirectChanged = function(index){
         $scope.myActiveSlide= index;
         $ionicSlideBoxDelegate.update();
         console.log("****DirectChanged:"+ $scope.myActiveSlide);
         }*/
   $scope.myActiveSlide= $stateParams.imagerId;
 //  console.log("****DirectChanged:"+ $scope.myActiveSlide);
   $ionicSlideBoxDelegate.update();
});