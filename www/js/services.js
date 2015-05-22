angular.module('visuo.services', [])

.factory('WeatherLists',function($http){
     var weatherLists = [];
     var deviceLists = [
                          {id:1,name:"Device 1"},
                          {id:2,name:"Device 2"},
                          {id:3,name:"Device 3"},
                       ];

      function getData(){

                   for ( i in deviceLists){
                        $http.get("js/"+deviceLists[i].id+"/test.json").success(function(data){
                             weatherLists.push(data[0]);
                        })
                    }

      }
  //  console.log(weatherLists[1]);

   return {

      get: function(deviceId){
            return weatherLists[deviceId];
      },

      all: function(){
           return weatherLists;
      }
   }
})

.factory('DeviceFct',function($http){

   var devices;
   return {
      getID : function(callback){
          if(devices){
            callback();
          }
          else{
              $http.get("https://www.visuo.adsc.com.sg/api/app/?format=json").success(function(data, status, headers, config){
                 devices = data;
                 callback();
             })
          }
      }
   }

});