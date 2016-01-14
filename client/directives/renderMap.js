var renderMap = angular.module('renderMap', []);

renderMap.directive('renderMap', function(){
  
  //define function to be attributed to the link property on the returned object below
  var link = function(scope, element, attrs) {  
      //define map elements/styles
      var map;
      var mapMarkers = [];
      var markerLimit = 500; 
      var styles = [{"featureType":"water","elementType":"all","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"on"}]},{"featureType":"water","elementType":"labels","stylers":[{"hue":"#7fc8ed"},{"saturation":55},{"lightness":-6},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"hue":"#83cead"},{"saturation":1},{"lightness":-15},{"visibility":"on"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"hue":"#f3f4f4"},{"saturation":-84},{"lightness":59},{"visibility":"on"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbbbbb"},{"saturation":-100},{"lightness":26},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-35},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffcc00"},{"saturation":100},{"lightness":-22},{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"hue":"#d7e4e4"},{"saturation":-60},{"lightness":23},{"visibility":"on"}]}]
      
      //set initial config variables
      var mapOptions = {
          center: new google.maps.LatLng(0, 0),
          zoom: 2,
          minZoom: 2, 
          mapTypeControl: true,
          mapTypeControl: true,
            mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.BOTTOM_CENTER
            },
            zoomControl: true,
            zoomControlOptions: {
              style: google.maps.ZoomControlStyle.SMALL,
              position: google.maps.ControlPosition.RIGHT_BOTTOM,
            },
            streetViewControl: false,
          scrollwheel: true,
          styles: styles
      };
      
      //define function that will inititialize the map
      var initMap = function() {
          if (map === void 0) {
              map = new google.maps.Map(element[0], mapOptions);
              window.map = map;
          }
      };
      
      initMap();  
  };

  
  //custom directives expect a return object in the format below...
  return {
      //restrict specifies how directive can be invoked on DOM
      restrict: 'E',
      replace: false,
      link: link
  };

});

