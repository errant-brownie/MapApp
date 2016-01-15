var app = angular.module('app', [
  'signup', 
  'renderMap',
  'app.tweets',
  'app.mapService',
  // 'app.filter',
  'app.search',
  'app.tweetMessageService',
  'ngAnimate', 
  'ui.router',
])

.config(function ($stateProvider, $urlRouterProvider){

$urlRouterProvider.otherwise("");

// routing stuff
$stateProvider
.state('index', {
      url: "",
      views: {
        'leftDiv': { 
          controller: "tweetsController",
          templateUrl: "client/views/tweetsView.html" 
        },
        // 'rightDiv': { 
        //   controller: "filterController",
        //   templateUrl: "client/views/filterListView.html" 
        // },
        'searchbar': {
          controller: "searchController",
          templateUrl: "client/views/searchView.html"
        }
      }
    });
});
