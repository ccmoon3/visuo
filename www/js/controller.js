angular.module('visuo.controllers', [])

.controller("WeatherCtrl",function ($scope,$http){
     $scope.weathers = [];
     $scope.devices = [
      {id:1,name:"Device 1"},
      {id:2,name:"Device 2"},
      {id:3,name:"Device 3"},
     ];
     $scope.deviceID = 1;

     var sysTime;

 //    Request.withoutAuth({url:'/data/weather_measurement'},function(data,status,headers,config){
 //click device_1:get (js/1/test.json)
 //click device_2:get (js/2/test.json)
 //click device_3:get (js/3/test.json)   ** get(js/$scope.deviceID/test.json)
      $http.get("js/"+$scope.deviceID+"/test.json").success(function(data){
      console.log("js/"+$scope.deviceID+"/test.json");
        sysTime = new Date(data.sysTime);
        for ( i in data){
           $scope.weathers.push({
                sysTime:data[i].sysTime,
                photo:data[i].photoSrc,
                temp:data[i].temperature,
                hum:data[i].humidity,
                dewP:data[i].dewPoint,
                windS:data[i].windSpeed,
           });
           console.log($scope.weathers);
        }
       })
});