angular.module('Visuo', ['ionic','visuo.controllers','visuo.services','ngRoute'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

 .config(function ($stateProvider, $urlRouterProvider,$httpProvider) {

$httpProvider.defaults.useXDomain = true;
$httpProvider.defaults.withCredentials = true;
delete $httpProvider.defaults.headers.common["X-Requested-With"];
$httpProvider.defaults.headers.common["Accept"] = "application/json";
$httpProvider.defaults.headers.common["Content-Type"] = "application/json";

    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller:'WeatherCtrl',
      })

      .state('app.main', {
        url: "/main",
        views:{
           'menuContent':{
               templateUrl: "templates/main.html",
               controller:'WeatherCtrl',
           }
        }
      })


      .state('app.device', {
         url: "/Imager/:imagerId",
         views:{
            'menuContent':{
                templateUrl: "templates/main.html",
                controller:"DeviceCtrl",
            }
        }
      });

    $urlRouterProvider.otherwise('/app/main');

  });