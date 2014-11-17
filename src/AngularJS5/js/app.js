/*
 * Angular App Bootstrap
 */
"use strict";
var Mhci;
(function (Mhci) {
    "use strict";
    var Module = (function () {
        function Module(name) {
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
        Module.prototype.start = function () {
            var _this = this;
            $(document).ready(function () {
                console.log("booting " + _this._app.name);
                angular.bootstrap(document, [_this._app.name]);
            });
        };

        Module.prototype.registerControllerFactory = function (controllerName, controllerConstructor) {
            this._app.controller(controllerName, controllerConstructor);
        };

        Module.prototype.registerController = function (path, partial, controllerConstructor) {
            var controllerName = path + partial;

            this.registerControllerFactory(controllerName, controllerConstructor);
            this._app.config(function ($routeProvider) {
                $routeProvider.when(path, { controller: controllerName, templateUrl: "partial/" + partial });
            });
        };

        Module.prototype.registerService = function (name, serviceConstructor) {
            this._app.service(name, serviceConstructor);
        };
        Module.$inject = ['ngRoute'];
        return Module;
    })();
    Mhci.App = Module;
})(Mhci || (Mhci = {}));

//This creates new instance of the angular app called "portfolio"
var app = new Mhci.App('portfolio');

/*
 * Portfolio Index Controller
 */
function PortfolioIndexController($scope, $sce, dataService) {
	this.$inject = ['dataService'];
		
	$scope['trustSrc'] = function (src) {
		return $sce.trustAsResourceUrl(src);
	};
		
	//A function in data service that returns a list of portfolio pieces
	dataService.getPortfolioPieces().then(function (request) {
		var works = request.data.Works;
		$scope['Works'] = works;
	});
}
	
//Register controller
app.registerController("/", "Home.html", PortfolioIndexController);

/*
 * Portfolio Detail Controller
 */
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
	$scope.getYouTubeLink = function (videoId) {
		return 'https://www.youtube.com/embed/' + videoId;
	};
}
//Register controller
app.registerController("/Portfolio/:id", "Detail.html", PortfolioDetailController);

/*
 * About Controller
 */
function AboutController($scope) {

}
//Register controller
app.registerController("/About", "About.html", AboutController);

/*
 * Menu Controller
 */
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

//Registers controller
app.registerControllerFactory("MenuController", MenuController);

/*
 * Main Controller
 */
function MainController($scope) {

}

app.registerControllerFactory("MainController", MainController);

 
/*
 * DataService
 */
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

//Registers data service
app.registerService("dataService", JSONFileDataService);

