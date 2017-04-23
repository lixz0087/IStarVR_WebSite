'use strict';

/**
 * @ngdoc function
 * @name istarVrWebSiteApp.controller:EditprofileCtrl
 * @description
 * # EditprofileCtrl
 * Controller of the istarVrWebSiteApp
 */



angular.module('istarVrWebSiteApp')
  .controller('EditprofileCtrl', function (OauthBearerService, $http, $httpParamSerializer,$scope, $cookies, $location) {

    $scope.submitForm = function(){

      if ($scope.firstname && $scope.lastname && $scope.email )  {

        if ($scope.password === $scope.confirmpassword) {
          var postParams = {
            email: $scope.email,
            firstname: $scope.firstname,
            lastname: $scope.lastname
          }

          OauthBearerService.postData('/users/'+$cookies.getObject('username'), postParams, function (data, err) {
            if (!err){
              $location.path('/profile')
            }
          })
        }
        else{
          alert("Password and Confirm Password Mismatch");
        }

      }
      else{
        alert("Please enter all the fields");
      }

    }

  });
