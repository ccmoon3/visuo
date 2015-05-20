angular.module('visuo.controllers', [])

.controller("WeatherCtrl",function ($scope, $http, WeatherList_1, WeatherList_2, WeatherList_3){
     $scope.weathers = [];
     $scope.devices = [
      {id:1,name:"Device 1"},
      {id:2,name:"Device 2"},
      {id:3,name:"Device 3"},
     ];

     $scope.setDevice = function(deviceId){
          deviceId = deviceId;
          console.log(deviceID);
          if(deviceId == '3'){
                    $scope.weathers = WeatherList_3.getWeatherList();
                    console.log($scope.weathers);
                    console.log("enter:3");
                 }
                 else if(deviceId == '2'){
                    $scope.weathers = WeatherList_2.getWeatherList();
                    console.log($scope.weathers);
                    console.log("enter:2");
                 }
                 else if(deviceId == '1'){
                    $scope.weathers = WeatherList_1.getWeatherList();
                    console.log($scope.weathers);
                    console.log("enter:1");
                 }
       }
       $scope.weathers = WeatherList_1.getWeatherList();
       console.log("enter:default");
});