///<reference path="../../../scripts/typings/angularjs/angular.d.ts" />
var Pai;
(function (Pai) {
    (function (Controllers) {
        (function (Home) {
            var WorkDetailController = (function () {
                function WorkDetailController($scope, $sce, $routeParams, dataService) {
                    this.$routeParams = $routeParams;
                    this.dataService = dataService;
                    this.$inject = ['ngSanitize', '$routeParams', 'dataService'];
                    var workId = $routeParams['id'];

                    dataService.getWork(workId).then(function (response) {
                        $scope['SelectedWorkData'] = response.data;
                        $scope.$parent['SelectedTag'] = {
                            "Name": Enumerable.From($scope['SelectedWorkData'].Tags).First()
                        };

                        $scope.$parent['SelectedWorkType'] = $scope['SelectedWorkData'].WorkType.toString();
                    });

                    $scope['trustSrc'] = function (src) {
                        return $sce.trustAsResourceUrl(src);
                    };

                    $scope['trustHtml'] = function (html) {
                        return $sce.trustAsHtml(html);
                    };
                }
                return WorkDetailController;
            })();
            Home.WorkDetailController = WorkDetailController;
        })(Controllers.Home || (Controllers.Home = {}));
        var Home = Controllers.Home;
    })(Pai.Controllers || (Pai.Controllers = {}));
    var Controllers = Pai.Controllers;
})(Pai || (Pai = {}));

app.registerController("/Work/:id", "Home/WorkDetail.html", Pai.Controllers.Home.WorkDetailController);
//# sourceMappingURL=home.workDetailController.js.map
