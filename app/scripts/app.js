'use strict';

/**
 * @ngdoc overview
 * @name istarVrWebSiteApp
 * @description
 * # istarVrWebSiteApp
 *
 * Main module of the application.
 */
angular
  .module('istarVrWebSiteApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/homeBeforeLogin.html',
        controller: 'HomebeforeloginCtrl',
        controllerAs: 'homebeforelogin'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl',
        controllerAs: 'upload'
      })
      .when('/home', {
        templateUrl: 'views/homepage.html',
        controller: 'HomepageCtrl',
        controllerAs: 'homepage'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .when('/profile/editProfile', {
        templateUrl: 'views/editprofile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'editprofile'
      })
      .when('/myroute', {
        templateUrl: 'views/myroute.html',
        controller: 'MyrouteCtrl',
        controllerAs: 'myroute'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
