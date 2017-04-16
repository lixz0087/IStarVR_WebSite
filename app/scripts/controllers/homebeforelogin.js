'use strict';

/**
 * @ngdoc function
 * @name istarVrWebSiteApp.controller:HomebeforeloginCtrl
 * @description
 * # HomebeforeloginCtrl
 * Controller of the istarVrWebSiteApp
 */
angular.module('istarVrWebSiteApp')
  .controller('HomebeforeloginCtrl', function ($scope, $http, Upload, $resource, $httpParamSerializer, $cookies) {
    
    // requesting for access token, this block of code should appear after login/signup flow
    // hardcoding the username and password for now
    $scope.postParams = {
      username: "ninja",
      password: "ninja",
      grant_type: "password"
    }
    $scope.encoded = btoa("Z3DPC10bCAdNgy2o:F3vZQoTE2vg6R8I2FO4gCcTp"); //clientid:clientsecret

    var req = {
      method: "POST",
      url: "http://localhost:8086/api/0.1/oauth/token",
      headers: {
        "Authorization": "Basic " + $scope.encoded,
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      data: $httpParamSerializer($scope.postParams)
    };

    $http(req).then(function(data){
      // getting the oauth token's here
      // setting the http header to use the access token and pushing it into cookie
      $cookies.putObject('oauth2', data.data);
    }, function(error){
      console.log(error);
    });

  });
