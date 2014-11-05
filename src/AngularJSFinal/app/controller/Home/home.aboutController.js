///<reference path="../../../scripts/typings/angularjs/angular.d.ts" />
var Pai;
(function (Pai) {
    (function (Controllers) {
        (function (Home) {
            var AboutController = (function () {
                function AboutController($scope) {
                }
                return AboutController;
            })();
            Home.AboutController = AboutController;
        })(Controllers.Home || (Controllers.Home = {}));
        var Home = Controllers.Home;
    })(Pai.Controllers || (Pai.Controllers = {}));
    var Controllers = Pai.Controllers;
})(Pai || (Pai = {}));

app.registerController("/About", "Home/About.html", Pai.Controllers.Home.AboutController);
//# sourceMappingURL=home.aboutController.js.map
