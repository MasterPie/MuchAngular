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
            var WorkListDefaultController = (function (_super) {
                __extends(WorkListDefaultController, _super);
                function WorkListDefaultController($scope, $sce, dataService) {
                    _super.call(this, $scope, $sce);
                    this.dataService = dataService;
                    this.$inject = ['ngSanitize', 'dataService'];

                    var _this = this;

                    $scope.$parent['SelectedTag'] = { "Name": "Portfolio" };

                    $scope.$parent['SelectedWorkType'] = Pai.Model.WorkItemType[0 /* Project */];

                    var selectedTagName = $scope['SelectedTag'].Name;

                    dataService.getWorkList().then(function (data) {
                        var taggedWorks = Enumerable.From(data).Where(function (workItem) {
                            return (workItem.tags && workItem.tags.indexOf(selectedTagName) > -1 || workItem.itemType.toString() == Pai.Model.WorkItemType[3 /* News */]);
                        });

                        $scope['HighlightedProject'] = _this.getHighlightedProject(taggedWorks);
                        $scope['Works'] = _this.excludedHighlightedWorkFromList($scope['HighlightedProject'], taggedWorks).ToArray();
                        $scope['MostRecentNews'] = Enumerable.From(taggedWorks).Where(function (work) {
                            return work.itemType.toString() == Pai.Model.WorkItemType[3 /* News */];
                        }).OrderByDescending(function (work) {
                            return work.createdDate;
                        }).First();
                    });

                    $scope['NotProjectFilter'] = _this.notProjectFilter;
                }
                return WorkListDefaultController;
            })(Home.WorkListBaseController);
            Home.WorkListDefaultController = WorkListDefaultController;
        })(Controllers.Home || (Controllers.Home = {}));
        var Home = Controllers.Home;
    })(Pai.Controllers || (Pai.Controllers = {}));
    var Controllers = Pai.Controllers;
})(Pai || (Pai = {}));

app.registerController("/", "Home/Home.html", Pai.Controllers.Home.WorkListDefaultController);
//# sourceMappingURL=home.workListDefaultController.js.map
