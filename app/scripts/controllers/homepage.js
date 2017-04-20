'use strict';

/**
 * @ngdoc function
 * @name istarVrWebSiteApp.controller:HomepageCtrl
 * @description
 * # HomepageCtrl
 * Controller of the istarVrWebSiteApp
 */
angular.module('istarVrWebSiteApp')
  .controller('HomepageCtrl',  function ($scope, OauthBearerService,$cookies ) {

    OauthBearerService.getData('/users/'+$cookies.getObject("username"), function(data, err){

      if(err)
      {
        $location.path('/');
      }

      $scope.username = data.username;

    });






    //
    // };

    // fetching oauth token and storing in cookie (both operations done by service)
    //console.log($cookies.getObject("oauth2"));
  });
