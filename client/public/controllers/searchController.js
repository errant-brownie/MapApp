//searchController.js
angular.module('app.search', [])

.controller('searchController', ['$scope', 'httpService', 'suggestionsService', 'mapService', function ($scope, httpService, suggestionsService, mapService){

  $scope.data = {};
  
  $scope.getMatches = function (partial) {
    return suggestionsService.getHashtagSuggestions(partial)
    .then(function (data) {
      return data.data;
    });
  };

  $scope.submitSearch = function () {
        // deleteMarkers();
         //heatmap.setMap(null);
        // socket.emit("filter", $scope.searchField);

        mapService.clearHeat();
        mapService.deleteMarkers();

        httpService.filterTweets($scope.data.searchText)
          .then(function (result) {
            console.log('Related: ', result);
            mapService.getRelated(result);
          });
        
        // heatmap = new google.maps.visualization.HeatmapLayer({
        //   radius: 15
        // });
        // heatmap.setMap(window.map);
      };
    }
  ]
);
