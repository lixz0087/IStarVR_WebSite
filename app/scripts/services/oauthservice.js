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

    var clientEncodedCred = btoa("Z3DPC10bCAdNgy2o:F3vZQoTE2vg6R8I2FO4gCcTp"); //clientid:clientsecret

    this.fetchOauthToken = function(username,password, callback) {
      // requesting for access token, this block of code should appear after login/signup flow
      // hardcoding the username and password for now
      var postParams = {
        username: username,
        password: password,
        grant_type: "password"
      }

      var req = {
        method: "POST",
        url: "http://localhost:8086/api/0.1/oauth/token",
        headers: {
          "Authorization": "Basic " + clientEncodedCred,
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },

        data: $httpParamSerializer(postParams)
      };
      $http.defaults.useXDomain = true;
      delete $http.defaults.headers.common['X-Requested-With'];

      $http(req).then(function(data){
        // getting the oauth token's here
        // setting the http header to use the access token and pushing it into cookie
        $cookies.putObject('access_token', data.data.access_token);
        $cookies.putObject('refresh_token', data.data.refresh_token);
        $cookies.putObject('expires_in', data.data.expires_in);
        $cookies.putObject("username", username);
        callback();
      }, function(error){
        console.log(error);
        return "error";
      });
    }

    // method to fetch new access-token once the old one expires
    this.fetchRefreshToken = function() {
      var postParams = {
        refresh_token: $cookies.getObject('refresh_token'),
        grant_type: 'refresh_token'
      };

      var req = {
        method: "POST",
        url: "http://localhost:8086/api/0.1/oauth/token",
        headers: {
          "Authorization": "Basic " + clientEncodedCred,
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        data: $httpParamSerializer(postParams)
      };

      $http(req).then(function(data){
        $cookies.putObject('access_token', data.data.access_token);
        $cookies.putObject('refresh_token', data.data.refresh_token);
        $cookies.putObject('expires_in', data.data.expires_in);
      });
    }

  });
