angular.module('visuo.controllers', [])
 .config(function($compileProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|chrome-extension|cdvfile|content):|data:image\//);
        })

.controller("WeatherCtrl",function ($scope, $http, $stateParams, $ionicSlideBoxDelegate){
     $scope.weather= {};
     $scope.weather.devices =[];
  /*        $http.get("https://www.visuo.adsc.com.sg/api/app/?format=json").success(function(data){
                 $scope.weather.devices = data.imagers;
                 for ( i in $scope.weather.devices){
                        getDeviceData(i);
                 }
                 $ionicSlideBoxDelegate.update();
            })*/

                    $http({
                        method: 'GET',
                        url: 'https://www.visuo.adsc.com.sg/api/app/?format=json',
                    }).success(function(data) {
                         $scope.weather.devices = data.imagers;
                         for ( i in $scope.weather.devices){
                               getDeviceData(i);
                         }
                         $ionicSlideBoxDelegate.update();
                    }).error(function(data, status,config,headers) {
                         alert(headers);
                    });

     var getDeviceData = function (i){
          $http.get("https://www.visuo.adsc.com.sg/api/app/"+$scope.weather.devices[i].id+"/?format=json").success(function(data){
              $.extend($scope.weather.devices[i], data, {photo:"https://www.visuo.adsc.com.sg/api/app/"+$scope.weather.devices[i].id+"/image/"});
          })
     }



     $scope.setActive = function(i){
       $scope.myActiveSlide = i;
       console.log("SetActive:"+$scope.myActiveSlide);

     }

               $scope.Swipe = function(i){
                 $scope.myActiveSlide = i;
                 console.log("Swipe:"+$scope.myActiveSlide);
               }



})

.controller("DeviceCtrl",function ($scope, $http, $stateParams){
     $scope.myActiveSlide= $stateParams.imagerId;
});