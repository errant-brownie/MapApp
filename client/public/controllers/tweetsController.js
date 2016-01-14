//tweetsContoller.js
angular.module('app.tweets', [])
.controller('tweetsController',[
  '$scope', 
  'tweetMessageService', 
  function ($scope, tweetMessageService){
    $scope.test = tweetMessageService.testdata;
  }
]);
