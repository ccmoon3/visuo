angular.module('visuo.controllers', [])

.controller("WeatherCtrl",function ($scope,$http){
     $scope.weather = [];
          $scope.devices = [
           {id:1,name:"Device 1"},
           {id:2,name:"Device 2"},
           {id:3,name:"Device 3"},
          ];

     $http.get("js/"+$scope.devices[0].id+"/test.json").success(function(data){
          $scope.weather = data[0];
     })

})

.controller("DeviceSelectCtrl",function ($scope,$http,$stateParams){
     $scope.weather = [];
     $http.get("js/"+$stateParams.deviceId+"/test.json").success(function(data){
         $scope.weather = data[0];
     })

});