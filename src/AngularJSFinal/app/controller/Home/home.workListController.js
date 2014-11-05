///<reference path="../../../scripts/typings/angularjs/angular.d.ts" />
///<reference path="home.workListBaseController.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Pai;
(function (Pai) {
    (function (Controllers) {
        (function (Home) {
            var WorkListController = (function (_super) {
                __extends(WorkListController, _super);
                function WorkListController($scope, $sce, $routeParams, dataService) {
                    _super.call(this, $scope, $sce);
                    this.$routeParams = $routeParams;
                    this.dataService = dataService;
                    this.$inject = ['ngSanitize', '$routeParams', 'dataService'];

                    var tagId = $routeParams['id'];

                    var _this = this;

                    $scope.$parent['SelectedWorkType'] = Pai.Model.WorkItemType[0 /* Project */];

                    dataService.getWorkList().then(function (data) {
                        var works = data;

                        var taggedWorks = Enumerable.From(works).Where(function (workItem) {
                            return workItem.tags && workItem.tags.indexOf(tagId) > -1;
                        });

                        $scope['HighlightedProject'] = _this.getHighlightedProject(taggedWorks);
                        $scope['Works'] = _this.excludedHighlightedWorkFromList($scope['HighlightedProject'], taggedWorks).ToArray();
                        $scope.$parent['SelectedTag'] = { "Name": tagId };

                        $scope['MostRecentNews'] = Enumerable.From(taggedWorks).Where(function (work) {
                            return work.itemType.toString() == Pai.Model.WorkItemType[3 /* News */];
                        }).OrderByDescending(function (work) {
                            return work.createdDate;
                        }).First();
                    });

                    $scope['NotProjectFilter'] = _this.notProjectFilter;
                }
                return WorkListController;
            })(Home.WorkListBaseController);
            Home.WorkListController = WorkListController;
        })(Controllers.Home || (Controllers.Home = {}));
        var Home = Controllers.Home;
    })(Pai.Controllers || (Pai.Controllers = {}));
    var Controllers = Pai.Controllers;
})(Pai || (Pai = {}));

app.registerController("/Work/Tag/:id", "Home/Home.html", Pai.Controllers.Home.WorkListController);
//# sourceMappingURL=home.workListController.js.map
