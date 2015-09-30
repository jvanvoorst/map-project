var app = angular.module('mapApp', ["leaflet-directive", "ui.bootstrap", "ngAnimate", "geolocation"]);

app.controller("mapController", ['$scope', '$modal', '$log', 'geolocation', function($scope, $modal, $log, geolocation) {

	// this is the array of markers
	$scope.markers = markers14er	

	//get coordinates from computer
	$scope.coords = geolocation.getLocation().then(function(data){
      return {lat:data.coords.latitude, long:data.coords.longitude};
    });

	// sets the available centers and map layers 
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
                fourumaps : {
                    name: '4uMaps',
                    url: 'http://tileserver.4umaps.eu/{z}/{x}/{y}.png',
                    type: 'xyz',
                },
                opencyclemap : {
                    name: 'OpenCycleMap',
                    url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                    type: 'xyz',
                },
                openstreetmap : {
                	name : 'OpenStreetMap',
            		url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            		type : 'xyz',
            	},
            },
	        overlays : {
	        	fourteeners : {
	        		type : 'group',
	        		name : '14ers',
	        		visible : false,
	        	},
	        	user : {
	        		type : 'group',
	        		name : 'User',
	        		visible : true
	        	}
	        }
	    },
	    extraMarkerIconRed : {
            type: 'extraMarker',
            icon: 'fa-star',
            markerColor: 'red',
            prefix: 'fa',
            shape: 'circle'
        },
        extraMarkerIconBlue : {
        	type : 'extraMarker',
        	icon : 'fa-star',
        	markerColor : 'blue-dark',
        	prefix : 'fa',
        	shape : 'circle'
        }
	});

	// add blue icon to fourteener object in the markers array
	for (i = 0; i < $scope.markers.length; i++) {
		$scope.markers[i].icon = $scope.extraMarkerIconBlue;
	}

	// changes the map tiles provider
	$scope.changeMapTiles = function(provider) {
		$scope.tiles = mapTiles[provider];
	};

	// centers the map on the selected city
	$scope.center = angular.copy($scope.Boulder);
	$scope.changeCenter = function(location) {
		$scope.center = angular.copy(location);
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
        $scope.markers[args.modelName].lat = args.model.lat;
        $scope.markers[args.modelName].lng = args.model.lng;
    });

    // edit the markers comment
    $scope.editMarker = function(marker) {
    	$scope.open(true, marker);
    };

    // delete the marker
    $scope.deleteMarker = function(marker) {
    	for (var i = 0; i < $scope.markers.length; i++) {
    		if ($scope.markers[i].message === marker.message) {
    			$scope.markers.splice(i, 1);
    			return;
    		}
    	}
    };

    // on map click event to create new marker
	$scope.$on("leafletDirectiveMap.click", function(event, args){
        var clickEvent = args.leafletEvent;
        $scope.open(false)
        $scope.addMarker = function(comment) {
        	$scope.markers.push({
            	lat : clickEvent.latlng.lat,
            	lng : clickEvent.latlng.lng,
            	message : comment,
            	draggable : true,
            	layer : 'user',
            	icon : $scope.extraMarkerIconRed,
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




