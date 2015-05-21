angular.module('visuo.controllers', [])

.controller("WeatherCtrl",function ($scope, $http, $stateParams, WeatherLists){
     $scope.weather= {};
          $scope.devices = [
           {id:1,name:"Device 1"},
           {id:2,name:"Device 2"},
           {id:3,name:"Device 3"},
          ];
     $scope.weather.devices = [
           {id:1,name:"Device 1"},
           {id:2,name:"Device 2"},
           {id:3,name:"Device 3"},
           ];

     var getDeviceID;
     $scope.myActiveSlide= $stateParams.deviceId;

     console.log($scope.myActiveSlide);

     var getDeviceData = function (i){
          $http.get("js/"+$scope.weather.devices[i].id+"/test.json").success(function(data){
              $scope.weather.devices[i] = data[0];
          })
     }

     for (i in $scope.devices){
         getDeviceData(i);
     }

  //   console.log($scope.weather.devices);
  /*   $http.get("js/1/test.json").success(function(data){
         $scope.imager1= data[0];
     })

  //   $scope.weather = WeatherLists.get(0);
 /*    $http.get("https://www.visuo.adsc.com.sg/api/app/wahrsis1/?format=json").success(function(data){
          $scope.weather = data;
     })*/

})

.controller("DeviceSelectCtrl",function ($scope, $http, $stateParams){
     $scope.weather.devices = [];

     $http.get("js/"+$stateParams.deviceId+"/test.json").success(function(data){
         $scope.weather.devices = data[0];
     })

});