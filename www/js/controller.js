angular.module('visuo.controllers', [])
 .config(function($compileProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|chrome-extension|cdvfile|content):|data:image\//);
        })

.controller("WeatherCtrl",function ($scope, $state, $http,$ionicSlideBoxDelegate, $timeout,$ionicLoading){

     $scope.weather= {};
     $scope.weather.devices =[];
     $scope.fail = false;

     var flag;

     $scope.doRefresh = function() {
           $ionicLoading.show({
                         animation:'fade-in',
                         showBackdrop:false,
                         maxWidth: 0,
                         showDelay: 0
                 });
          var k = $ionicSlideBoxDelegate.currentIndex();

          $http.get("https://www.visuo.adsc.com.sg/api/app/"+$scope.weather.devices[k].id+"/?format=json").success(function(data){
              $scope.weather.devices[k].photo = "https://www.visuo.adsc.com.sg/api/app/"+$scope.weather.devices[k].id+"/image/";
              $scope.weather.devices[k].date = data.date;
              $scope.weather.devices[k].wind_speed = data.wind_speed;
              $scope.weather.devices[k].pressure = data.pressure;
              $scope.weather.devices[k].temperature = data.temperature;
              $scope.weather.devices[k].humidity = data.humidity;
              $scope.fail = false;
          }).error(function(data) {

                $scope.fail = true;
                $scope.$broadcast('scroll.refreshComplete');
                $timeout(function(){
                    $ionicLoading.hide();
                },500);

          }).finally(function(){
                 $ionicSlideBoxDelegate.update();
                 $scope.$broadcast('scroll.refreshComplete');
                 $timeout(function(){
                       $ionicLoading.hide();
                 },1000);
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
          $scope.fail = false;

          /**********Needed Update**********/
          $ionicSlideBoxDelegate.update();
     }).error(function(data, status,config,headers) {
                 $scope.fail = true;
                 $timeout(function(){
                     $ionicLoading.hide();
                 },500);
     });



     var getDeviceData = function (i,total){
          $http.get("https://www.visuo.adsc.com.sg/api/app/"+$scope.weather.devices[i].id+"/?format=json").success(function(data){
              $.extend($scope.weather.devices[i], data, {photo:"https://www.visuo.adsc.com.sg/api/app/"+$scope.weather.devices[i].id+"/image/"});
          }).error(function(data) {

                 $scope.fail = true;
                 $timeout(function(){
                     $ionicLoading.hide();
                 },500);

          }).finally(function(){
             flag++;
             if(flag == total){
                 $ionicSlideBoxDelegate.update();
                 $scope.fail = false;
                 $timeout(function(){
                       $ionicLoading.hide();
                 },1000);
             }
          });
      }



     $scope.setActive = function(i){
       $scope.myActiveSlide = i;
       console.log("SetActive:"+$scope.myActiveSlide);
       if($scope.fail == true){
         $scope.doRefresh();
       }
       $('#slider').fadeOut(50,function(){
           $('#slider').fadeIn(200);
       });

     }

     $scope.Swipe = function(i){
        $scope.myActiveSlide = i;
        console.log("SwipeFrom:"+$scope.myActiveSlide);;
      }

});