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
  .controller('UploadCtrl', function ($scope, $http, Upload, $cookies, $httpParamSerializer, OauthService, $window) {

    // check if oauth cookie is set and if it hasn't expired
    if ($cookies.getObject("oauth2") !== undefined) {
      if ($cookies.getObject("oauth2").expires_in <= ((new Date().getTime()) - 1000)) {
        OauthService.fetchOauthToken();
        console.log("Requesting for oauth token IF");
      }
    } else {
      $window.location.href = "/login";
      console.log("Requesting for oauth token else");
    }

    // helper function to request temporary S3 cred's from server
    var requestTempS3Creds = function(cookieType) {
        var postParams = {
          username: "ninja",
          bucket_type: cookieType
        };

        var req = {
          method: "POST",
          url: "http://localhost:8086/api/0.1/get_temp_credentials",
          headers: {
            "Authorization": 'Bearer ' + $cookies.getObject('oauth2').access_token,
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
          },
          data: $httpParamSerializer(postParams)
        };

        $http(req).then(function (data) {
          cookieType === "private" ? $cookies.putObject('temp-s3-creds', data) : $cookies.putObject('temp-s3-creds-public', data);
           // call function to start uploading to S3
            uploadContentHelper($scope.file);
        }, function (error) {
          console.log(error);
        });
    };

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
      $scope.showProgressBar = true;
      $scope.erroredOut = false;
      $scope.successful = false;
      $scope.disableUploadBtn = true;

      var s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        accessKeyId: 
        $scope.privacy === "private" ? $cookies.getObject('temp-s3-creds').data.Credentials.AccessKeyId : $cookies.getObject('temp-s3-creds-public').data.Credentials.AccessKeyId,
        secretAccessKey: 
        $scope.privacy === "private" ? $cookies.getObject('temp-s3-creds').data.Credentials.SecretAccessKey : $cookies.getObject('temp-s3-creds-public').data.Credentials.SecretAccessKey,
        sessionToken: 
        $scope.privacy === "private" ? $cookies.getObject('temp-s3-creds').data.Credentials.SessionToken : $cookies.getObject('temp-s3-creds-public').data.Credentials.SessionToken
      });

        var params = {Bucket: $scope.privacy === "private" ? 'istarvr' : 'publicistarvr', Key: 'ninja/'+file.name, ContentType: file.type , Body: file};
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

   function validateTempS3Cookies(cookieType) {
     //check if temp-s3-creds cookie is already set, if set check for expiry
      if (cookieType === "private") {
         if ($cookies.getObject('temp-s3-creds') !== undefined) {
          if (Date.parse($cookies.getObject('temp-s3-creds').data.Credentials.Expiration) <= ((new Date().getTime()) - 1000)) {
              requestTempS3Creds(cookieType);
              console.log("Requesting for S3 token IF");
          } else {
             // call function to start uploading to S3
             uploadContentHelper($scope.file);
          }
        } else {
          requestTempS3Creds(cookieType);
          console.log("Requesting for S3 token else");
        }
      } else {   
        if ($cookies.getObject('temp-s3-creds-public') !== undefined) {
          if (Date.parse($cookies.getObject('temp-s3-creds-public').data.Credentials.Expiration) <= ((new Date().getTime()) - 1000)) {
              requestTempS3Creds(cookieType);
              console.log("Requesting for S3 token-public IF");
          } else {
             // call function to start uploading to S3
             uploadContentHelper($scope.file);
          }
        } else {
          requestTempS3Creds(cookieType);
          console.log("Requesting for S3 token-public else");
        }
      }
   }

    $scope.uploadContent = function() {
      if ($scope.file) {
        console.log($scope.privacy);
        // call functions to check if private/public s3-temp-creds cookies are set
        validateTempS3Cookies($scope.privacy);
      } else {
        console.log("Something wrong with the input file");
      }
    };
});