

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'visuo' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('visuo.controllers', [])

.controller("WeatherCtrl",function ($scope,$http){
     $scope.weathers = [];

     var sysTime;

 //    Request.withoutAuth({url:'/data/weather_measurement'},function(data,status,headers,config){
      $http.get("js/test.json").success(function(data){

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
        }
       })
})

.controller("SelectCtrl",function ($scope){
     $scope.devices = [
      {id:1,name:"Device 1"},
      {id:2,name:"Device 2"},
      {id:3,name:"Device 3"},
     ];

});