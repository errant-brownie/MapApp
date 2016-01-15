//searchController.js
angular.module('app.search', [])

.controller('searchController', ['$scope', 'httpService', function ($scope, httpService){
  $scope.submitSearch = function () {
        // deleteMarkers();
        // heatmap.setMap(null);
        // socket.emit("filter", $scope.searchField);

        console.log($scope.searchField);
        httpService.filterTweets($scope.searchField);
        
        // heatmap = new google.maps.visualization.HeatmapLayer({
        //   radius: 15
        // });
        // heatmap.setMap(window.map);
      };
}]);
