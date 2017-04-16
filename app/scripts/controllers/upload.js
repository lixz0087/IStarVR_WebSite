'use strict';

/**
 * @ngdoc function
 * @name istarVrWebSiteApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the istarVrWebSiteApp
 */
//

angular.module('istarVrWebSiteApp')
  .controller('UploadCtrl', function ($scope, $http, Upload, $cookies, $httpParamSerializer) {

    $scope.requestTempS3Creds = function() {
        var postParams = {
          username: "ninja",
          bucket_type: "private"
        }

        var req = {
          method: "POST",
          url: "http://localhost:8086/api/0.1/get_temp_credentials",
          headers: {
            "Authorization": 'Bearer ' + $cookies.getObject('oauth2').access_token,
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
          },
          data: $httpParamSerializer(postParams)
        }

        $http(req).then(function (data) {
          $cookies.putObject('temp-s3-creds', data);
          
        }, function (error) {
          console.log(error);
        });
    }

    if ($cookies.getObject('oauth2') !== undefined) {
        // always check for expiry of token before accessing it
        // if expired, remove it and make a request to get the token again using refresh-token

        // make a request to get_temp_creds API to get temporary AWS credentials
        $scope.requestTempS3Creds();
    } else {
        console.log("Lost cookie");
    }

    $scope.lengthOfTextArea = 0;
  
    $scope.lengthOfFile = function(file) {
      if (file === undefined) {
        $scope.lengthOfTextArea = 0;
      } else {
        $scope.lengthOfTextArea = file.length;
      }
    };

    // helper function for uploading to S3
    function uploadContentHelper(file) {

      console.log();
    
      $scope.showProgressBar = true;
      $scope.erroredOut = false;
      $scope.successful = false;
      $scope.disableUploadBtn = true;

      var s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        accessKeyId: $cookies.getObject('temp-s3-creds').data.Credentials.AccessKeyId,
        secretAccessKey: $cookies.getObject('temp-s3-creds').data.Credentials.SecretAccessKey,
        sessionToken: $cookies.getObject('temp-s3-creds').data.Credentials.SessionToken
      });

        var params = {Bucket: 'istarvr', Key: 'ninja/'+file.name, ContentType: file.type , Body: file};
          s3.upload(params, function(err, data) {
            if (err) {
                console.log(err);
                $scope.$apply(function() {
                  $scope.showProgressBar = false;
                  $scope.erroredOut = true;
                  $scope.disableUploadBtn = false;
                });

            } else {
                console.log(data);
                // important piece of code - Angular doesent update data when async calls comeback
                // updating data happens only when an external event like a button click is performed
                // hence encapsulating it with $apply() which forces angular to update data
                $scope.$apply(function() {
                  $scope.showProgressBar = false;
                  $scope.successful = true;
                  $scope.disableUploadBtn = false;
                });
            }
      });
   }

    $scope.uploadContent = function() {
      if ($scope.file) {
        // call function to start uploading to S3
        uploadContentHelper($scope.file);
        //console.log($scope.file);
      } else {
        console.log("Something wrong with the input file");
      }
    };
});
