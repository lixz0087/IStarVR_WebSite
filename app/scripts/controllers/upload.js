'use strict';

/**
 * @ngdoc function
 * @name istarVrWebSiteApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the istarVrWebSiteApp
 */
angular.module('istarVrWebSiteApp')
  .controller('UploadCtrl', function ($scope, $http, Upload) {

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
        accessKeyId: "ASIAIP3LPKDSKXSTXDJA",
        secretAccessKey: "lYYFn0YwuKdVozt9AYgHC307neR5uTEQsgB7YmJe",
        sessionToken: "FQoDYXdzEPr//////////wEaDE9Z+HmJZhsfkk7xyCL5AzovGSCtI0mkHCXdW0F0VUpQA/C7yuV05btQsktGFSgsg7PvB0X9gIWzS9G48ySY1yWt/FNwC1qRcgK9+z9SG/oo17s6KXBuNlZdsFWR1rlpST/HmG9D+PPk4g2D9Hby7ULGNUofCLUyTObrd/y/ZPbrhLu1IMuhdH4ExDepLFPFf/B8KhnO/YZ5LIvuWnz3E/zUZEeVBe6s/8+ek/E/cNkTeRFQBaWXhNmIHlKpSy27FxM+V9Y1hcqtUvE3+P3kVMOdFi+CIVhzdjtajc3DlfXamzDxO0luVUi+zvsTaU49EZSiv/J9zQUiLgA/DkncAWT4aT9AWWrcOemT/HcwXqW1BV+2oR/oQ57ai68MhoVqddndU+nHvHhNr+EDHdElch9IuuXcJGUgNMo+jNK1FnV6qsTG8GolL4geJH95gRzYsffMhJFWQo252itEelW+fdaGo8HC49dCcK0QiD+IVNmUNXuVqKwCh2iXN4MJYFGuAO5KDR3uUgMkgWmRlyyz8pca8uGvHmUCBlBpMsJwlRdfImd//RnnpU9Uc8Yu/zHuxMK5vCe2DSuzmhn3FWiF+pDUFt2qRoN2sjUfNQ6ZU6EMpOM/bictwdS5oi0MgBdwdfbI45MBnbmWlVnMM2Skh6UEMuqDJMPJwo5njOd2Zwt1r/t4drd3b/0otYTLxwU="
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
