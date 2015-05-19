controller.js// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'visuo' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('visuo.controllers', [])

.controller("WeatherCtrl",function ($scope,$http){
     $scope.weathers = [];

     var sysTime;

 //    Request.withoutAuth({url:'/data/weather_measurement'},function(data,status,headers,config){
      $http.get("js/test.json").success(function(data,status,headers,config){
        sysTime = new Date();
        for ( i in data.weather){
           $scope.weathers.push({
                photo:data.photoSrc;
                temp:data.temperature;
                hum:data.humidity;
                dewP:data.dewPoint;
                windS:data.windSpeed;
           });
        }
     })

});