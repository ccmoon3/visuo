angular.module('visuo.controllers', [])

.controller("WeatherCtrl",function ($scope, $http, WeatherLists){
     $scope.w= [];
          $scope.devices = [
           {id:1,name:"Device 1"},
           {id:2,name:"Device 2"},
           {id:3,name:"Device 3"},
          ];
     $scope.weathers = [];

     var getWeather = function (i){
          $http.get("js/"+$scope.devices[i].id+"/test.json").success(function(data){
              console.log("js/"+$scope.devices[i].id+"/test.json");
              return data[0];
          })
     }

     for (i in $scope.devices){
         getWeather(i);
     }
     $http.get("js/1/test.json").success(function(data){
         $scope.imager1= data[0];
     })

  //   $scope.weather = WeatherLists.get(0);
 /*    $http.get("https://www.visuo.adsc.com.sg/api/app/wahrsis1/?format=json").success(function(data){
          $scope.weather = data;
     })*/

})

.controller("DeviceSelectCtrl",function ($scope, $http, $stateParams){
     $scope.imager1 = [];

     $http.get("js/"+$stateParams.deviceId+"/test.json").success(function(data){
         $scope.imager1 = data[0];
     })

});