angular.module('Visuo', ['ionic','visuo.controllers','visuo.services','ngRoute','ngCordova'])

.run(function($ionicPlatform, $ionicLoading) {
  $ionicPlatform.ready(function() {

    if(window.StatusBar) {
          if(ionic.Platform.isIOS()){
              ionic.Platform.fullScreen();
           }else{
               StatusBar.overlaysWebView(false);
    //           StatusBar.backgroundColorByName("black");
           }


       setTimeout(function() {
            navigator.splashscreen.hide();
      //      alert("Hide");
            $('.splash').fadeOut(1000);
       }, 1000);
    }
             var deviceHeight = $( window ).height();
             var deviceWidth = $( window ).width();
             $('.slider').css('height', deviceHeight);
             $('.slider-slide').css('height', deviceHeight);
    })
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
      })

      .state('app.main', {
        url: "/main",
        cache:false,
        views:{
           'menuContent':{
               templateUrl: "templates/main.html",
               cache:false,
           }
        }
      });

    $urlRouterProvider.otherwise('/app/main');

  });