//searchController.js
angular.module('app.search', [])

.controller('searchController', ['$scope', 'httpService', 'mapService', function ($scope, httpService, mapService){
  $scope.submitSearch = function () {
        // deleteMarkers();
         //heatmap.setMap(null);
        // socket.emit("filter", $scope.searchField);

        mapService.clearHeat();
        mapService.deleteMarkers();

        httpService.filterTweets($scope.searchField);
        
        // heatmap = new google.maps.visualization.HeatmapLayer({
        //   radius: 15
        // });
        // heatmap.setMap(window.map);
      };
    }
  ]
);
