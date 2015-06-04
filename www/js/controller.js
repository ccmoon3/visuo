angular.module('visuo.controllers', [])
 .config(function($compileProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|chrome-extension|cdvfile|content):|data:image\//);
        })

.controller("WeatherCtrl",function ($scope, $state, $http, $ionicSlideBoxDelegate, $timeout,$ionicLoading){

     $scope.weather= {};
     $scope.weather.devices =[];
     $scope.fail = false;
     $scope.full = true;

     var flag;


     $scope.doRefresh = function() {
           $ionicLoading.show({
                         animation:'fade-in',
                         showBackdrop:false,
                         maxWidth: 0,
                         showDelay: 0
                 });

           if($scope.weather.devices.length == 0){
              getDeviceInitial();
           }else{
              flag =0;
              for ( i in $scope.weather.devices){
                    getDeviceData(i,$scope.weather.devices.length);
              }
           }
     };


     var getDeviceInitial = function(){
         $http({
          method: 'GET',
          url: 'https://www.visuo.adsc.com.sg/api/app/?format=json',
         }).success(function(data) {
             $scope.weather.devices = data;
             $ionicSlideBoxDelegate.update();
             if(data){
                flag = 0;
                for ( i in $scope.weather.devices){
                   getDeviceData(i,$scope.weather.devices.length);
                }
                $scope.fail = false;
                $scope.$root.full = true;
             }
             else{
                $scope.errorInfo = 'No Imagers Available...';
                $scope.$root.full = false;
                $scope.fail = true;
             }
         }).error(function(data, status) {
            $scope.errorInfo = 'Internet Failed...';
            $scope.$root.full = false;
            $scope.fail = true;

                if (status==0){
                    $scope.errorInfo = 'Whoops, No Internet...';
                }
                else if((status >= 400) && (status < 500))
                {
                    $scope.errorInfo = 'Client Request Failed...';
                }
                else if( (status >= 500) && (status < 600) ) {
                    $scope.errorInfo = 'Server Connection Failed...';
                }
                else{
                    $scope.errorInfo = 'Something wrong :( '+status;
            //        console.log(status);
                }

            $ionicSlideBoxDelegate.update();
            $scope.$broadcast('scroll.refreshComplete');
            $timeout(function(){
                $ionicLoading.hide();
            },1300);
         });
      }




     var getDeviceData = function (i,total){

          $http.get("https://www.visuo.adsc.com.sg/api/app/"+$scope.weather.devices[i].id+"/?format=json").success(function(data){
              $scope.weather.devices[i].photo = "https://www.visuo.adsc.com.sg/api/app/"+$scope.weather.devices[i].id+"/image/";
              $scope.weather.devices[i].date = data.date;
              $scope.weather.devices[i].wind_speed = data.wind_speed;
              $scope.weather.devices[i].pressure = data.pressure;
              $scope.weather.devices[i].temperature = data.temperature;
              $scope.weather.devices[i].humidity = data.humidity;
              flag++;
              if(flag == total){
                  $scope.$root.full = true;
                  $scope.fail = false;
              }

          }).error(function(data,status) {
              flag++;
                $scope.fail = true;
                if (status==0){
                    $scope.errorInfo = 'Whoops, No Internet...';
                }
                else if((status >= 400) && (status < 500))
                {
                    $scope.errorInfo = 'Client Request Failed...';
                }
                else if( (status >= 500) && (status < 600) ) {
                    $scope.errorInfo = 'Server Connection Failed...';
                }
                else{
                    $scope.errorInfo = 'Something wrong :( '+status;
            //        console.log(status);
                }
          }).finally(function(){
             $ionicSlideBoxDelegate.update();
             if(flag == total){
                 $scope.$broadcast('scroll.refreshComplete');
                 $timeout(function(){
                       $ionicLoading.hide();
                 },1300);
             }
          });
      }


     $scope.setActive = function(i){
       $scope.myActiveSlide = i;
       console.log("SetActive:"+$scope.myActiveSlide);
       if($scope.fail == true){
         $scope.doRefresh();
       }

     }

     $scope.Swipe = function(i){
        $scope.myActiveSlide = i;
        console.log("SwipeFrom:"+$scope.myActiveSlide);;
      }

     getDeviceInitial();
});