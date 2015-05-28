angular.module('visuo.controllers', [])
 .config(function($compileProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|chrome-extension|cdvfile|content):|data:image\//);
        })

.controller("WeatherCtrl",function ($scope, $http, $ionicSlideBoxDelegate, $timeout,$ionicLoading){

     $scope.weather= {};
     $scope.weather.devices =[];
     var flag;

     $ionicLoading.show({
      //    content:'<div class="ionic-logo"></div>',
          template:'<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',
          animation:'fade-in',
          showBackdrop:true,
          maxWidth: 0,
          showDelay: 0
     });


     $scope.doRefresh = function() {

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
                     alert(err);
                }).finally(function() {
                     $scope.$broadcast('scroll.refreshComplete');
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
               alert(headers);
           });





     var getDeviceData = function (i,total){
          $http.get("https://www.visuo.adsc.com.sg/api/app/"+$scope.weather.devices[i].id+"/?format=json").success(function(data){
              $.extend($scope.weather.devices[i], data, {photo:"https://www.visuo.adsc.com.sg/api/app/"+$scope.weather.devices[i].id+"/image/"});
          }).finally(function(){
             flag++;
             if(flag == total){
                 $timeout(function(){
                       $ionicSlideBoxDelegate.update();
                       $ionicLoading.hide();
                 },1000);
             }
          });
      }



     $scope.setActive = function(i){
       $scope.myActiveSlide = i;
       console.log("SetActive:"+$scope.myActiveSlide);

     }

});