//tweetsContoller.js
angular.module('app.tweets', [])
.controller('tweetsController',[
  '$scope', 
  'tweetMessageService', 
  function ($scope, tweetMessageService){
    $scope.data = {};
    $scope.data.show = false
    // taking advantage of references 
    // or making a horrible mistake
    var showMessage = function (message) {
      $scope.data.message = message;
      $scope.data.show = true;
      $scope.$apply();
    };

    $scope.hideMessage = function () {
      $scope.data.show = false;
    };

    tweetMessageService.addListener(showMessage);
  }
]);
