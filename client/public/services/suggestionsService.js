angular.module('app.suggestionsService', [])

.factory('suggestionsService', ['$http', function ($http) {
  var getHashtagSuggestions = function (partial) {
    return $http.get("/api/users/" + partial) // WARNING: unsanitary string concatonation
  }
}]);
