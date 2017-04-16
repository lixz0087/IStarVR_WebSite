'use strict';

/**
 * @ngdoc service
 * @name istarVrWebSiteApp.OauthService
 * @description
 * # OauthService
 * Service in the istarVrWebSiteApp.
 */
angular.module('istarVrWebSiteApp')
  .service('OauthService', function ($http, $httpParamSerializer, $cookies, $resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    // ---------------------------- on log-out, the cookies have to be removed --------------------------------
    
    this.fetchOauthToken = function() {

      // requesting for access token, this block of code should appear after login/signup flow
      // hardcoding the username and password for now
      var postParams = {
        username: "ninja",
        password: "ninja",
        grant_type: "password"
      }
      var encoded = btoa("Z3DPC10bCAdNgy2o:F3vZQoTE2vg6R8I2FO4gCcTp"); //clientid:clientsecret

      var req = {
        method: "POST",
        url: "http://localhost:8086/api/0.1/oauth/token",
        headers: {
          "Authorization": "Basic " + encoded,
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        data: $httpParamSerializer(postParams)
      };
      $http(req).then(function(data){
        // getting the oauth token's here
        // setting the http header to use the access token and pushing it into cookie
        $cookies.putObject('oauth2', data.data);
      }, function(error){
        console.log(error);
      });

    }

  });
