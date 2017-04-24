'use strict';

/**
 * @ngdoc function
 * @name istarVrWebSiteApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the istarVrWebSiteApp
 */
angular.module('istarVrWebSiteApp')
  .controller('ProfileCtrl', function (OauthBearerService,$cookies,$location,$scope) {

      if(!$cookies.getObject('token')){
        $location.path('/login')
      }


      OauthBearerService.getData('/users/' + $cookies.getObject('username'), function (data, err) {

        if (err) {
        }

        else {

          $scope.username = data.username;
          $scope.fullname = data.firstname + " " + data.lastname;
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

        }
      });


  });
