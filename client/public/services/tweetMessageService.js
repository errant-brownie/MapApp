//tweetMessageService.js
angular.module('app.tweetMessageService', [])

.factory('tweetMessageService', function () {
  var listener = function () {};

  return {
    addListener: function (callback) {
      listener = callback;
    },

    showMessageCallback: function (message) {
      return function () {
        // var myMessage = message; // attempt to speed up displaying the message
        listener(message);
      }
    },
  };
});
