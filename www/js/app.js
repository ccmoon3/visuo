angular.module('Visuo', ['ionic','visuo.controllers','visuo.services','ngRoute'])

.run(function($ionicPlatform,$ionicLoading) {
  $ionicPlatform.ready(function() {

       $ionicLoading.show({
             template:'<div class="title">Visuo</div>'+
                         '<ion-spinner icon="spiral">'+
                         '</ion-spinner>',
             animation:'fade-in',
             showBackdrop:true,
             maxWidth: 0,
             showDelay: 0
       });

    if(window.StatusBar) {
           StatusBar.overlaysWebView(false);
           StatusBar.backgroundColorByName("black");
    }
             var deviceHeight = $( window ).height()-10;
             var deviceWidth = $( window ).width();
             var vh = deviceHeight/100;
             var vw = deviceWidth/100;
             var vwTime = 7.5*vw;
             var vhTime = 6*vh;
             $('.slider').css('height', deviceHeight);
             $('.slider-slide').css('height', deviceHeight);

    })
  })

  //    $('.time').css('marginTop',vh8);
  //    $('.top_container').css({'padding-top':'40px','height':'80px'});
  //    $('.time').css({'font-size': vwTime+'px','line-height':vhTime+'px'});
  //    $('.top_container').css('padding-top',vh8);




 .config(function ($stateProvider, $urlRouterProvider,$httpProvider) {


$httpProvider.defaults.useXDomain = true;
$httpProvider.defaults.withCredentials = true;
delete $httpProvider.defaults.headers.common["X-Requested-With"];
$httpProvider.defaults.headers.common["Accept"] = "application/json";
$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
/*
$httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show');
        return config;
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide');
        return response;
      }
    }
  });*/

    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
  //      controller:'WeatherCtrl',
      })

      .state('app.main', {
        url: "/main",
        views:{
           'menuContent':{
               templateUrl: "templates/main.html",
   //            controller:'WeatherCtrl',
           }
        }
      })


      .state('app.device', {
         url: "/Imager/:imagerId",
         views:{
            'menuContent':{
                templateUrl: "templates/main.html",
//               controller:"DeviceCtrl",
         //        controller:'WeatherCtrl',
            }
        }
      });

    $urlRouterProvider.otherwise('/app/main');

  });