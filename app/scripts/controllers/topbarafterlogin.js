'use strict';

/**
 * @ngdoc function
 * @name istarVrWebSiteApp.controller:TopbarafterloginCtrl
 * @description
 * # TopbarafterloginCtrl
 * Controller of the istarVrWebSiteApp
 */
angular.module('istarVrWebSiteApp')
  .controller('TopbarafterloginCtrl', function($scope, $location) {
    $scope.$on('$locationChangeSuccess', function () {
      var path = $location.path();
      $scope.templateUrl = (path === '/login' || path === '/signup' || path === '/' ) ? 'views/topbarBeforeLogin.html' : 'views/topbarAfterLogin.html';
    });
  });


