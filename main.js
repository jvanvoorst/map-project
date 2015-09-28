//Angular
var app = angular.module('mapApp', ["leaflet-directive", "ui.bootstrap"]);

app.controller("mapController", ['$scope', '$modal', '$log', function($scope, $modal, $log) {

	// set availible map tiles
	var mapTiles = {
		opencyclemap: {
			url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
            options: {
            	attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
            }
        },
        fourumaps: {
        	url: "http://tileserver.4umaps.eu/{z}/{x}/{y}.png",
        	options: {
        		attribution: 'All maps &copy; <a href="http://www.4umaps.eu">4uMaps</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
            }
        },
        openstreetmap: {
            url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            options: {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        },
	};

	// sets the default center and map tiles
	angular.extend($scope, {
	    Boulder: {
	        lat: 40.05957,
	        lng: -105.20871,
	        zoom: 14
	    },
	    London: {
            lat: 51.505,
            lng: -0.09,
            zoom: 8
        },
	    tiles: mapTiles.fourumaps
	});

	$scope.changeMapTiles = function(provider) {
		$scope.tiles = mapTiles[provider];
	};

	$scope.markers = new Array();

	$scope.$on("leafletDirectiveMap.click", function(event, args){
        var clickEvent = args.leafletEvent;
        var comment = 
        $scope.markers.push({
            lat: clickEvent.latlng.lat,
            lng: clickEvent.latlng.lng,
            message: "My Added Marker"
        });
        console.log($scope.markers);
    });

    $scope.markerComment = '';

    $scope.open = function() {
	    var modalInstance = $modal.open( {
      		animation: true,
	      	templateUrl: 'ModalContent.html',
	      	controller: 'modalController',
	      	size: 'sm',
	      	resolve: {
	        	comment: function () {
	        	return $scope.markerComment;
	        	}
	    	}
	    });
    };

}]);

// Modal Angular controller
app.controller('modalController', ['$scope', function ($scope, $modalInstance, markerComment) {

  	$scope.markerComment = markerComment;

  	$scope.ok = function () {
    	$modalInstance.close($scope.selected.item);
  	};

  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};
}]);


// sets map view with lat/lon and then zoom level, this one is home
// var map = L.map('map').setView([40.05957, -105.20871], 15);

// // sets tileserver
// L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
// 	attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// 	maxZoom : 18,
// 	id: 'map.project'
// }).addTo(map);

// this one is for 4umaps but some parts are not working
// L.tileLayer('http://tileserver.4umaps.eu/{z}/{x}/{y}.png', {
// 	attribution: '&copy; <a href="http://www.4umaps.eu">4UMaps.eu</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// 	maxZoom : 15,
// 	id: 'map.project'
// }).addTo(map);

// Create marker, circle, and polygon:
// var marker = L.marker([51.5, -0.09]).addTo(map);
// var circle = L.circle([51.508, -0.11], 500, {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5
// }).addTo(map);
// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(map);

// Bind popup to elements:
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");


// function onMapClick(e) {
//     alert("You clicked the map at " + e.latlng);
//     createMarker(e.latlng);
// }

// map.on('click', onMapClick);

// map.on('click', onMapClick);

// var createMarker = function(latlng) {
// 	var marker = L.marker([latlng.lat, latlng.lng]).addTo(map);
// 	marker.bindPopup(textMarker())
// 	console.log(marker);
// };

// var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(map),
//     denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(map),
//     aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(map),
//     golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(map);

