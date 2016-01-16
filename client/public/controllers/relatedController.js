angular.module('app.related', [])
.controller('relatedController', [
  '$scope',
  'tweetMessageService',
  function ($scope, tweetMessageService) {
    $scope.data = {};

    var showRelated = function(hashtags) {
      $scope.data.relatedHashtags = hashtags;
    };

    tweetMessageService.addListener(showRelated, 'showRelated');
  }
]);
