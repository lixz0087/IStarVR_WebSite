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




    this.fetchOauthToken = function(username,password, callback) {


      // requesting for access token, this block of code should appear after login/signup flow
      // hardcoding the username and password for now
      var postParams = {
        username: username,
        password: password,
        grant_type: "password"
      }
      var encoded = btoa("9nkMEet48vhNHnE0:BMIN9PcoZGd9qatPJsWhDhvW"); //clientid:clientsecret

      var req = {
        method: "POST",
        url: "http://localhost:8086/api/0.1/oauth/token",
        headers: {
          "Authorization": "Basic " + encoded,
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",

        },

        data: $httpParamSerializer(postParams)
      };
      $http.defaults.useXDomain = true;
      delete $http.defaults.headers.common['X-Requested-With'];

      $http(req).then(function(data){


        // getting the oauth token's here
        // setting the http header to use the access token and pushing it into cookie

        $cookies.putObject('token', data.data.access_token);
        $cookies.putObject("username", username);
        callback();
        console.log();

      }, function(error){
         callback(error)
        console.log(error);
        return "error";
      });

    }

  });
