var app = angular.module('myApp', ['ui.bootstrap', 'ngAnimate']);
app.controller('mainController', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
	$scope.about = false;
	$scope.contact = false;
	$scope.portfolio = false;

	$scope.toggle = function(pane) {
		if (pane === 'about') {
			$scope.about = !$scope.about;
			$scope.contact = false;
			$scope.portfolio = false;
		} 
		else if (pane === 'contact') {
			$scope.contact = !$scope.contact;
			$scope.about = false;
			$scope.portfolio = false;
		} 
		else {
			$scope.portfolio = !$scope.portfolio;
			$scope.about = false;
			$scope.contact = false;
		}
	};

	$scope.open = function(modal) {
	    	if (modal === 'resume') {
	    		var template = 'resumeContent.html';
	    		var controller = 'resumeController';
	    	}
	    	else {
	    		var template = 'portfolioContent.html';
	    		var controller = 'portfolioController';
	    	}

	    var modalInstance = $modal.open( {
      		animation: true,
	      	templateUrl: template,
	      	controller: controller,
	      	size: 'lg',

	    });

    };


}]);

// Resume Modal Angular controller
app.controller('resumeController', ['$scope', '$modalInstance', function($scope, $modalInstance) {

  	$scope.close = function() {
    	$modalInstance.close();
  	};

}]);

// Portfolio Modal Angular controller
app.controller('portfolioController', ['$scope', '$modalInstance', function($scope, $modalInstance) {

  	$scope.close = function() {
    	$modalInstance.close();
  	};

}]);