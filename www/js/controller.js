angular.module('visuo.controllers', [])

.controller("WeatherCtrl",function ($scope, $http,$ionicSlideBoxDelegate){
     $scope.weather= {};
     $scope.weather.devices = [];

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

     $scope.setActive = function(i){
       $ionicSlideBoxDelegate.slide(i);
    //   $scope.myActiveSlide = i;
   //    console.log($scope.myActiveSlide);
     }

})

.controller("DeviceCtrl",function ($scope, $http, $stateParams){
     $scope.myActiveSlide= $stateParams.imagerId;
});