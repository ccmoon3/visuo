angular.module('visuo.controllers', [])

.controller("WeatherCtrl",function ($scope, $http, $stateParams){
     $scope.weather= {};
    // console.log(DeviceFct.getID());
     $scope.weather.devices = [
  /*              {id:1,name:"Device 1"},
                {id:2,name:"Device 2"},
                {id:3,name:"Device 3"},*/
     ];


     var getDeviceID  = function (){
          $http.get("https://www.visuo.adsc.com.sg/api/app/?format=json").success(function(data){

           for (i in data.imagers){
              var dev;

           console.log(Object.keys(data.imagers[i]));
           console.log(data.imagers[i]);

           $http.get("https://www.visuo.adsc.com.sg/api/app/"+data.imagers[i]+"/?format=json").success(function(data){
              dev = data;
              console.log(dev);
           })


          /*    for (var key in data.imagers[i]){
                  $scope.weather.devices.push({
                      id: key,
                      location: data.imagers[i][key]
                  });
               }*/
          //     getDeviceData(i);
            }
        //     console.log($scope.weather.devices);
          })
     };
     getDeviceID();


     var getDeviceData = function (i){
       //   $http.get("js/"+$scope.weather.devices[i].id+"/test.json").success(function(data){
          $http.get("https://www.visuo.adsc.com.sg/api/app/"+$scope.weather.devices[i].id+"/?format=json").success(function(data){
              console.log($scope.weather.devices[i]);
              $scope.weather.devices[i] = data;
          //    $.merge($scope.weather.devices[i],data)
              console.log($scope.weather.devices[i]);
          })
     }





 /*    $http.get("https://www.visuo.adsc.com.sg/api/app/wahrsis1/?format=json").success(function(data){
          $scope.weather = data;
     })*/

})

.controller("DeviceCtrl",function ($scope, $http, $stateParams){
     $scope.myActiveSlide= $stateParams.imagerId - 1;
});