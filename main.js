var app = angular.module('mapApp', ["leaflet-directive", "ui.bootstrap", "ngAnimate", "geolocation"]);

app.controller("mapController", ['$scope', '$modal', '$log', 'geolocation', function($scope, $modal, $log, geolocation) {

	// this is the array of markers
	$scope.markers = new Array();

	//get coordinates from computer
	$scope.coords = geolocation.getLocation().then(function(data){
      return {lat:data.coords.latitude, long:data.coords.longitude};
    });

	// set availible map tiles providers
	// var mapTiles = {
	// 	opencyclemap: {
	// 		url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
    //        options: {
    //        	attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
    //        }
    //    	},
    //    	fourumaps: {
    //    	url: "http://tileserver.4umaps.eu/{z}/{x}/{y}.png",
    //    	options: {
    //    		attribution: 'All maps &copy; <a href="http://www.4umaps.eu">4uMaps</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
    //        }
    //    	},
    //    	openstreetmap: {
    //        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    //        options: {
    //            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //        }
    //    	},
	// 	};

	// sets the default center and map tiles
	angular.extend($scope, {
	    Boulder: {
	        lat: 40.011,
	        lng: -105.271,
	        zoom: 12
	    },
	    London: {
            lat: 51.505,
            lng: -0.09,
            zoom: 12
        },
        layers : {
            baselayers : {
                opencyclemap : {
                    name: 'OpenCycleMap',
                    url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                    type: 'xyz',
                },
                fourumaps : {
                    name: '4uMaps',
                    url: 'http://tileserver.4umaps.eu/{z}/{x}/{y}.png',
                    type: 'xyz',
                },
                openstreetmap: {
                	name : 'OpenStreetMap',
            		url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            		type : 'xyz',
            	},
            }
        },
	    // tiles: mapTiles.fourumaps
	});

	// changes the map tiles provider
	$scope.changeMapTiles = function(provider) {
		$scope.tiles = mapTiles[provider];
	};

	// centers the map on the selected city
	$scope.center = $scope.Boulder;
	$scope.changeCenter = function(location) {
		$scope.center = location;
	};

	// centers the map on the selected marker
	$scope.centerOnMarker = function(marker) {
		$scope.center = {
			lat: marker.lat,
			lng: marker.lng,
			zoom: 12
		};
	};

	// sets map center to current geolocation
	$scope.centerCurrent = function() {
		$scope.center = {
			lat: $scope.coords.lat,
			lng: $scope.coords.long
		};
	};

	// changes the markers lat/lon to the new value when dragged to a new location
	$scope.$on("leafletDirectiveMarker.dragend", function(event, args){
		console.log(event)
		console.log(args)
        $scope.markers[args.modelName].lat = args.model.lat;
        $scope.markers[args.modelName].lng = args.model.lng;
    });

    // edit the markers comment
    $scope.editMarker = function(marker) {
    	$scope.open(true, marker);
    	console.log(marker);
    };

    // delete the marker
    $scope.deleteMarker = function(index) {
    	$scope.markers.splice(index, 1);
    }

    // on map click event to create new marker
	$scope.$on("leafletDirectiveMap.click", function(event, args){
        var clickEvent = args.leafletEvent;
        $scope.open(false)
        $scope.addMarker = function(comment) {
        	$scope.markers.push({
            	lat: clickEvent.latlng.lat,
            	lng: clickEvent.latlng.lng,
            	message: comment,
            	draggable: true,
        	});
        };
    });

    // opens the modal true is for editing already created marker, false is for creating new marker
    $scope.open = function(edit, marker) {
	    var modalInstance = $modal.open( {
      		animation: true,
	      	templateUrl: 'ModalContent.html',
	      	controller: 'modalController',
	      	size: 'lg',
	    });
	    
	    // true - edit comment
	    if (edit) {
	    	modalInstance.result.then(function(comment) {
	    		marker.message = comment;
	    	});
	    } 

	    // false - create new marker
	    else {
	    	modalInstance.result.then(function(comment) {
	    		$scope.addMarker(comment);
	    	});
	    }
    };


}]);

// Modal Angular controller
app.controller('modalController', ['$scope', '$modalInstance', function($scope, $modalInstance) {

	// click ok sends back the comment from the modal to be used in creating new marker or editing current one
  	$scope.ok = function() {
    	$modalInstance.close($scope.comment);
  	};

  	// click cancel cancels the modal w/o creating new marker or editing comment
  	$scope.cancel = function() {
    	$modalInstance.dismiss('cancel');
  	};

}]);

// var gpx = "hymasa.gpx";
// new L.GPX(gpx, {async: true}).on('loaded', function(e) {
//   map.fitBounds(e.target.getBounds());
// }).addTo(map);


