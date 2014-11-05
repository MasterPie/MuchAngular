///<reference path="../../../scripts/typings/angularjs/angular.d.ts" />
var Pai;
(function (Pai) {
    (function (Controllers) {
        (function (Home) {
            var WorkListBaseController = (function () {
                function WorkListBaseController($scope, $sce) {
                    $scope['trustSrc'] = function (src) {
                        return $sce.trustAsResourceUrl(src);
                    };

                    $scope.$parent['SelectedTag'] = { "Name": "" };
                }
                WorkListBaseController.prototype.getHighlightedProject = function (works) {
                    return works.OrderByDescending(function (workItem) {
                        return workItem.createdDate;
                    }).First(function (workItem) {
                        return workItem.itemType.toString() == Pai.Model.WorkItemType[0 /* Project */];
                    });
                };

                WorkListBaseController.prototype.excludedHighlightedWorkFromList = function (highlightedWorkItem, works) {
                    return works.Where(function (workItem) {
                        return workItem.title != highlightedWorkItem.title;
                    }).OrderByDescending(function (workItem) {
                        return workItem.createdDate;
                    });
                };

                WorkListBaseController.prototype.notProjectFilter = function (workItem) {
                    var t = workItem.itemType.toString() == Pai.Model.WorkItemType[2 /* Idea */] || workItem.itemType.toString() == Pai.Model.WorkItemType[1 /* VisualDesign */];

                    console.log(workItem);
                    console.log(t);

                    return t;
                };
                return WorkListBaseController;
            })();
            Home.WorkListBaseController = WorkListBaseController;
        })(Controllers.Home || (Controllers.Home = {}));
        var Home = Controllers.Home;
    })(Pai.Controllers || (Pai.Controllers = {}));
    var Controllers = Pai.Controllers;
})(Pai || (Pai = {}));
//# sourceMappingURL=home.workListBaseController.js.map
