angular.module('visuo.controllers', [])

.controller("WeatherCtrl",function ($scope, $http, $stateParams, WeatherLists){
     $scope.weather= {};
     $scope.weather.devices = [
                {id:1,name:"Device 1"},
                {id:2,name:"Device 2"},
                {id:3,name:"Device 3"},
     ];
          $scope.devices = [
           {id:1,name:"Device 1"},
           {id:2,name:"Device 2"},
           {id:3,name:"Device 3"},
          ];


     var getDeviceID;

     var getDeviceData = function (i){
          $http.get("js/"+$scope.weather.devices[i].id+"/test.json").success(function(data){
              $scope.weather.devices[i] = data[0];
          })
     }

     for (i in $scope.devices){
         getDeviceData(i);
     }



 /*    $http.get("https://www.visuo.adsc.com.sg/api/app/wahrsis1/?format=json").success(function(data){
          $scope.weather = data;
     })*/

})

.controller("DeviceCtrl",function ($scope, $http, $stateParams){
     $scope.myActiveSlide= $stateParams.imagerId - 1;
});