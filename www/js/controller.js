angular.module('visuo.controllers', [])

.controller("WeatherCtrl",function ($scope,$http){
     $scope.weather = [];
     $scope.devices = [
      {id:1,name:"Device 1"},
      {id:2,name:"Device 2"},
      {id:3,name:"Device 3"},
     ];
     $scope.deviceID = 1;


               $http.get("js/1/test.json").success(function(data){
               console.log("js/1/test.json");
                    $scope.weather = data[0];
                    console.log($scope.weather);
                })

})

.controller("WeatherSelectCtrl",function ($scope,$http){
     $scope.weather = [];

               $http.get("js/"+$scope.device.id+"/test.json").success(function(data){
               console.log("js/"+$scope.device.id+"/test.json");
                    $scope.weather = data[0];
                    console.log($scope.weather);
                })

});