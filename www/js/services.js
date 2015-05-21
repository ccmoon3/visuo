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

.factory('ImagerLists',function($http){
     var ImagerLists = [];

   $http.get("https://www.visuo.adsc.com.sg/api/app/").success(function(data, status, headers, config){
          console.log(data);
     })

   return {
        ImagerLists: function(){
            return ImagerLists;
        }
    }


});