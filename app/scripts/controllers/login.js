'use strict';

/**
 * @ngdoc function
 * @name istarVrWebSiteApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the istarVrWebSiteApp
 */
angular.module('istarVrWebSiteApp')
  .controller('LoginCtrl', function (OauthService, $cookies) {
    
    // fetching oauth token and storing in cookie (both operations done by service)
    OauthService.fetchOauthToken();
    console.log($cookies.getObject("oauth2"));
  });
