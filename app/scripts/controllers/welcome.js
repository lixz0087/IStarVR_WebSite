'use strict';

/**
 * @ngdoc function
 * @name istarVrWebSiteApp.controller:HomepageCtrl
 * @description
 * # HomepageCtrl
 * Controller of the istarVrWebSiteApp
 */
angular.module('istarVrWebSiteApp')
  .controller('WelcomeCtrl',  function ($scope, OauthBearerService,$cookies,$location ) {

    var getparams = $location.search();
    console.log(getparams);



    OauthBearerService.getData('/users/'+getparams.username, function(data, err){

      if(err)
      {
        $location.path('/');
      }

      $scope.username = data.username;
      $scope.fullname = data.firstname + " " +data.lastname;
      $scope.firstname = data.firstname;
      $scope.lastname = data.lastname;
      $scope.email = data.email;
      $scope.phone = data.phone;
      $scope.birthday = data.birthday;
      $scope.occupation = data.occupation;
      $scope.country = data.country;
      $scope.area = data.area;
      $scope.work = data.work;
      $scope.introduction = data.introduction;


    });
    





    //
    // };

    // fetching oauth token and storing in cookie (both operations done by service)
    //console.log($cookies.getObject("oauth2"));
  });
