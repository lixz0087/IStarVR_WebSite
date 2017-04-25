'use strict';

/**
 * @ngdoc function
 * @name istarVrWebSiteApp.controller:VideosCtrl
 * @description
 * # VideosCtrl
 * Controller of the istarVrWebSiteApp
 */
angular.module('istarVrWebSiteApp')
  .controller('VideosCtrl', function (OauthService, OauthBearerService, $http, $httpParamSerializer, $cookies, $location, $scope) {

    var awsPublic = AWS;
    var awsPrivate = AWS;
    var s3Public, s3Private;

    var requestTempS3Creds = function(bucketType, callback) {

      var postParams = {
        username: $cookies.getObject("username"),
        bucket_type: bucketType
      };

      var req = {
        method: "POST",
        url: 'http://localhost:8086/api/0.1/get_temp_credentials',
        headers: {
          "Authorization": 'Bearer ' + $cookies.getObject("access_token"),
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        data: $httpParamSerializer(postParams)
      };

      $http(req).then(function (data) {
        bucketType === "private" ? $cookies.putObject('temp-s3-creds', data) : $cookies.putObject('temp-s3-creds-public', data);
        bucketType === "private" ? $cookies.putObject('temp-s3-creds-expires-in', data.Credentials.Expiration) : $cookies.putObject('temp-s3-creds-public-expires-in', data.Credentials.Expiration);
        callback()
      }, function (error) {
        callback(error)
      });
    }



    var requestAndGetUrl = function(bucket, key, type, callback) {
      requestTempS3Creds(type, function (err) {
        if(err) {}
        else {

          var temCredential = (type === "private") ? $cookies.getObject('temp-s3-creds') : $cookies.getObject('temp-s3-creds-public');

          awsPrivate.config.credentials = new aws.Credentials(temCredential.Credentials.AccessKeyId, temCredential.Credentials.SecretAccessKey,
            temCredential.Credentials.SessionToken);

          awsPrivate.config.update({
            signatureVersion: 'v4'
          });

          s3Private = new awsPrivate.S3({region: "us-west-1"});

          var preSignedURl = s3Private.getSignedUrl('getObject', {
            Bucket: bucket,
            Expires: 60 * 3600,
            Key: key
          });

          callback(preSignedURl);
        }

      });

    }


    var getPreSignedUrl = function(bucket,key,callback){

      if(bucket == 'istarvr') {

        if ($cookies.getObject("temp-s3-creds") !== undefined || $cookies.getObject("temp-s3-creds-expires-in") <= ((new Date().getTime()) - 1000)) {

          requestAndGetUrl(bucket,key,'private', function(url){
            callback(url)
          })

        }

        else {
          var url = s3Private.getSignedUrl('getObject', {
            Bucket: bucket,
            Expires: 60 * 3600,
            Key: key
          });
          callback(url)
        }

      }

      else {

        if ($cookies.getObject("temp-s3-creds-public") !== undefined || $cookies.getObject("temp-s3-creds-public-expires-in") <= ((new Date().getTime()) - 1000)) {

          requestAndGetUrl(bucket,key,'public', function(url){
            callback(url)
          })

        }

        else {
          var url = s3Public.getSignedUrl('getObject', {
            Bucket: bucket,
            Expires: 60 * 3600,
            Key: key
          });
          callback(url)
        }

      }

    }


    var changeVideos = function(callback) {

      /* Request backend to get json of all videos and replace the urls with presigned urls */
      OauthBearerService.getData('/get_all_content/' + $cookies.getObject('username'), function (data, err) {

        if (err) {
        }

        else {
          var totalvideos = data.length;
          var i = 1;
          var myvideos = [];

          data.Data.forEach(function (d) {
            getPreSignedUrl(d.bucket, d.thumbnail_key, function (data) {
              i++;
              d.thumbnailLocation = data;
              myvideos.push(d)
              if(i === totalvideos)
              {
                callback(myvideos);
              }
            });
          })

        }
      })

    }


    // check if oauth cookie is set and if it hasn't expired
    if ($cookies.getObject("access_token") !== undefined) {
      if ($cookies.getObject("expires_in") <= ((new Date().getTime()) - 1000)) {
        OauthService.fetchRefreshToken();
      }
    } else {
      $location.path('/login');
    }

    changeVideos(function(data){
      $scope.myvideos = data;
    });


  });
