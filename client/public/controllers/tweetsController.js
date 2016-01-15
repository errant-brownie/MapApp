//tweetsContoller.js
angular.module('app.tweets', [])
.controller('tweetsController',[
  '$scope', 
  'tweetMessageService', 
  function ($scope, tweetMessageService){
    $scope.data = {};
    $scope.data.show = true

    var slide = function(){  
    if (! $scope.data.show){
      $( ".tweets" ).animate({
          width: 0,
          "margin-left": "-15px"
      }, 1000, function() {
        // Animation complete.
      });
    }else{
      $( ".tweets" ).animate({
          width: "230px",
          "margin-left": "5px"

      }, 1000, function() {
        // Animation complete.
      });
    }
    $scope.$apply();
    };


    var showMessage = function (message) {
      $scope.data.message = message;
      $scope.data.show = true;
      slide();
    };

    $scope.toggleMessage = function () {
      $scope.data.show = !$scope.data.show;
      slide();
    }

    tweetMessageService.addListener(showMessage);
  }
]);
