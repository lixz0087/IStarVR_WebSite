'use strict';

/**
 * @ngdoc function
 * @name istarVrWebSiteApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the istarVrWebSiteApp
 */
angular.module('istarVrWebSiteApp')
  .controller('UploadCtrl', function ($scope, $http) {

    $scope.lengthOfTextArea = 0;
  
    $scope.lengthOfFile = function(file) {
      if (file === undefined) {
        $scope.lengthOfTextArea = 0;
      } else {
        $scope.lengthOfTextArea = file.length;
      }
    };

    $scope.uploadContent = function() {
      console.log($scope.uploadForm);
    };
});
