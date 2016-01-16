angular.module('app.suggestionsService', [])

.factory('suggestionsService', ['$http', function ($http) {
  var getHashtagSuggestions = function (partial) {
    return $http.get("/api/hashtag/" + partial); // WARNING: unsanitary string concatonation
  }

  return {
    getHashtagSuggestions: getHashtagSuggestions,
  }
}]);
