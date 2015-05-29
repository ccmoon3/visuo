angular.module('visuo.controllers', [])
 .config(function($compileProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|chrome-extension|cdvfile|content):|data:image\//);
        })

.controller("WeatherCtrl",function ($scope, $http,$ionicSlideBoxDelegate, $timeout,$ionicLoading){

     $scope.weather= {};
     $scope.weather.devices =[];
     var flag;
     $scope.doRefresh = function() {
            $ionicLoading.show({
                    animation:'fade-in',
                    showBackdrop:true,
                    maxWidth: 0,
                    showDelay: 0
            });

           $http({
             method: 'GET',
             url: 'https://www.visuo.adsc.com.sg/api/app/?format=json',
           }).success(function(data,err) {
                $scope.weather.devices = data.imagers;
                for ( i in $scope.weather.devices){
                     getDeviceData(i);
                }
                 $ionicSlideBoxDelegate.update();

                }).error(function(data, err) {
                //     $scope.templateUrl
                }).finally(function() {
                     $scope.$broadcast('scroll.refreshComplete');
                     $ionicSlideBoxDelegate.update();
                     $timeout(function(){
                         $ionicLoading.hide();
                     },500);
                });

     };


           $http({
               method: 'GET',
               url: 'https://www.visuo.adsc.com.sg/api/app/?format=json',
           }).success(function(data) {
               $scope.weather.devices = data.imagers;
               flag = 0;
               for ( i in $scope.weather.devices){
                   getDeviceData(i,$scope.weather.devices.length);
               }
           }).error(function(data, status,config,headers) {
               //Oops! Check your Internet and pull to refresh.
               $scope.weather.devices =[{
                                            photo:"./img/fail.png"
                                         }];
               $ionicSlideBoxDelegate.update();
               $timeout(function(){
                    $ionicLoading.hide();
               },500);
           });





     var getDeviceData = function (i,total){
          $http.get("https://www.visuo.adsc.com.sg/api/app/"+$scope.weather.devices[i].id+"/?format=json").success(function(data){
              $.extend($scope.weather.devices[i], data, {photo:"https://www.visuo.adsc.com.sg/api/app/"+$scope.weather.devices[i].id+"/image/"});
          }).error(function(data) {
                $.extend($scope.weather.devices[i], data, {photo:"./img/fail.png"});
                //Oops! Try this device later..
                $ionicSlideBoxDelegate.update();
                $timeout(function(){
                    $ionicLoading.hide();
                },500);
          }).finally(function(){
             flag++;
             if(flag == total){
                 $ionicSlideBoxDelegate.update();
                 $timeout(function(){
                       $ionicLoading.hide();
                 },2000);
             }
          });
      }



     $scope.setActive = function(i){
       $scope.myActiveSlide = i;
       console.log("SetActive:"+$scope.myActiveSlide);

     }

});