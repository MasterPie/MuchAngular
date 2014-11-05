/*
1. Functions in variables
2. JSON
3. Classes JSON prototype
4. 
*/

/*
 * Angular App Bootstrap
 */
"use strict";
var AngularApp = (function () {
	function AngularApp(name) {
	
		//External modules needed for the app
		this._app = angular.module(name, [
			"ngAnimate",
			"ngRoute",
			"ngSanitize",
			"ngResource"
		]);

		this._app.config([
			"$routeProvider",
			function ($routeProvider) {
				$routeProvider.otherwise({
					redirectTo: "/"
				});
			}
		]);

		this._app.run([
			"$route", function ($route) {
				// Include $route to kick start the router.
			}
		]);
	}
	AngularApp.prototype.start = function () {
		var _this = this;
		$(document).ready(function () {
			console.log("booting " + _this._app.name);
			angular.module(document, [_this._app.name]);
		});
	};

	AngularApp.prototype.registerControllerFactory = function (controllerName, controllerConstructor) {
		this._app.controller(controllerName, controllerConstructor);
	};

	AngularApp.prototype.registerController = function (path, partial, controllerConstructor) {
		var controllerName = path + partial;

		this.registerControllerFactory(controllerName, controllerConstructor);
		this._app.config(function ($routeProvider) {
			$routeProvider.when(path, { controller: controllerName, templateUrl: "app/partial/" + partial });
		});
	};

	AngularApp.prototype.registerService = function (name, serviceConstructor) {
		this._app.service(name, serviceConstructor);
	};
	AngularApp.$inject = ['ngRoute'];
	return AngularApp;
})();
//This creates new instance of the angular app called "portfolio"
var app = new AngularApp('portfolio'); 

/*
 * DataService
 */
var JSONFileDataService = (function () {
	function JSONFileDataService($q, $http) {
		this.$q = $q;
		this.$http = $http;
		this.$inject = ['http'];
	}

	//Gets list of portfolio pieces
	JSONFileDataService.prototype.getPortfolioPieces = function () {
		return this.$http.get('data/index.json');
	};

	//Gets details for a single portfolio piece
	JSONFileDataService.prototype.getPortfolioDetails = function (id) {
		return this.$http.get('data/' + id + '.json');
	};
	
	return JSONFileDataService;
})();
//Registers data service
app.registerService("dataService", JSONFileDataService);


/*
 * Portfolio Index Controller
 */
var PortfolioIndexController = (function () {
	function PortfolioIndexController($scope, $sce, dataService) {
		this.$inject = ['dataService'];
	
		$scope['trustSrc'] = function (src) {
			return $sce.trustAsResourceUrl(src);
		};
		
		//A function in data service that returns a list of portfolio pieces
		dataService.getPortfolioPieces().then(function (data) {
			var works = data;
			
			$scope['Works'] = works;
		});
		
	}
	
	return PortfolioIndexController;
})();
//Register controller
app.registerController("/", "/app/partial/Home/Home.html", PortfolioIndexController);



/*
 * Portfolio Detail Controller
 */
var PortfolioDetailController = (function () {
	function PortfolioDetailController($scope, $sce, $routeParams, dataService) {
		this.$routeParams = $routeParams;
		this.dataService = dataService;
		this.$inject = ['ngSanitize', '$routeParams', 'dataService'];
		
		var workId = $routeParams['id'];

		dataService.getPortfolioDetails(workId).then(function (response) {
			$scope['SelectedWorkData'] = response.data;
		});

		
		//Functions that enable you to embed youtube videos
		$scope['trustSrc'] = function (src) {
			return $sce.trustAsResourceUrl(src);
		};
		$scope['trustHtml'] = function (html) {
			return $sce.trustAsHtml(html);
		};
		//
	}
	return PortfolioDetailController;
})();
//Register controller
app.registerController("/Portfolio/:id", "/app/partial/Home/WorkDetail.html", PortfolioDetailController);



/*
 * Menu Controller
 */
var MenuController = (function () {
	function MenuController($scope, $location) {
		this.$inject = ['$location'];
		
		//Applies a different CSS class based on the current URL
		$scope['getMenuLinkClass'] = function (path) {
			if ($location.path().substr(0, path.length) == path) {
				return "active";
			} else if ($location.path() == "/" && path == "/Work") {
				return "active";
			} else {
				return "";
			}
		};
		
	}
	return MenuController;
})();
//Registers controller
app.registerControllerFactory("MenuController", MenuController);





 
