angular.module('Visuo', ['ionic','visuo.controllers','visuo.services'])

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

 .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;

    $httpProvider.defaults.headers.put['Content-Type'] = 'X-Requested-With';
    $httpProvider.defaults.headers.post['Content-Type'] = 'X-Requested-With';

    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'WeatherCtrl'
      })

      .state('app.main', {
        url: "/main",
        views:{
           'menuContent':{
               templateUrl: "templates/main.html",
               controller: 'WeatherCtrl'
           }
        }
      })


      .state('app.device', {
         url: "/main/:deviceId",
         views:{
            'menuContent':{
                templateUrl: "templates/main.html",
                controller: 'WeatherSelectCtrl'
            }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/main');

  });