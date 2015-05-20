angular.module('visuo.services', [])
/*
.factory('WeatherLists',function($http){
     var weatherLists = [];
     var deviceID = [1,2,3];

     for ( i in deviceID){
        $http.get("js/"+deviceID[i]+"/test.json").success(function(data){
                  weatherLists.push({
                        sysTime:data[0].sysTime,
                        photo:data[0].photoSrc,
                        temp:data[0].temperature,
                        hum:data[0].humidity,
                        dewP:data[0].dewPoint,
                        windS:data[0].windSpeed,
                   });
               })
     }
     return {
        getWeatherList: function(){
            return weatherLists;
        }
     }
})*/

.factory('WeatherList_1',function($http){
     var weatherLists = [];
        $http.get("js/1/test.json").success(function(data){
                  weatherLists.push({
                        sysTime:data[0].sysTime,
                        photo:data[0].photoSrc,
                        temp:data[0].temperature,
                        hum:data[0].humidity,
                        dewP:data[0].dewPoint,
                        windS:data[0].windSpeed,
                   });
               })

     return {
        getWeatherList: function(){
            return weatherLists;
        }
     }
})

.factory('WeatherList_2',function($http){
     var weatherLists = [];
        $http.get("js/2/test.json").success(function(data){
                  weatherLists.push({
                        sysTime:data[0].sysTime,
                        photo:data[0].photoSrc,
                        temp:data[0].temperature,
                        hum:data[0].humidity,
                        dewP:data[0].dewPoint,
                        windS:data[0].windSpeed,
                   });
               })

     return {
        getWeatherList: function(){
            return weatherLists;
        }
     }
})

.factory('WeatherList_3',function($http){
     var weatherLists = [];
        $http.get("js/3/test.json").success(function(data){
                  weatherLists.push({
                        sysTime:data[0].sysTime,
                        photo:data[0].photoSrc,
                        temp:data[0].temperature,
                        hum:data[0].humidity,
                        dewP:data[0].dewPoint,
                        windS:data[0].windSpeed,
                   });
               })

     return {
        getWeatherList: function(){
            return weatherLists;
        }
     }
});