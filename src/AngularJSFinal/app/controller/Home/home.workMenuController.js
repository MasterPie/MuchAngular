///<reference path="../../../scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../../scripts/typings/linq/linq.d.ts" />
var Pai;
(function (Pai) {
    (function (Controllers) {
        (function (Home) {
            var WorkMenuController = (function () {
                function WorkMenuController($scope, dataService, $location) {
                    this.dataService = dataService;
                    this.$inject = ['dataService', '$locationService'];
                    var workItemTypes = [];
                    var workItems = [];

                    for (var val in Pai.Model.WorkItemType) {
                        if (isNaN(val)) {
                            workItemTypes.push({ "Key": Pai.Model.FromEnumToDisplayName(val), "Value": val });
                        }
                    }

                    $scope['WorkTypes'] = workItemTypes;

                    $scope['SelectedWorkType'] = Pai.Model.WorkItemType[0 /* Project */];

                    dataService.getTags().then(function (data) {
                        $scope['Tags'] = data.ToArray();
                    });

                    dataService.getWorkList().then(function (data) {
                        workItems = data;
                        $scope['Projects'] = workItems;
                    });

                    $scope['filterToTag'] = function () {
                        var selectedTagName = $scope['SelectedTag'].Name;

                        $location.path('/Work/Tag/' + selectedTagName);
                    };

                    $scope.$watch('SelectedTag', function () {
                        var selectedTagName = $scope['SelectedTag'].Name;

                        if (selectedTagName == "") {
                            $scope['Projects'] = workItems;
                        } else {
                            $scope['Projects'] = Enumerable.From(workItems).Where(function (workItem) {
                                return workItem.tags.indexOf($scope['SelectedTag'].Name) > -1;
                            }).ToArray();
                        }
                    });
                }
                return WorkMenuController;
            })();
            Home.WorkMenuController = WorkMenuController;
        })(Controllers.Home || (Controllers.Home = {}));
        var Home = Controllers.Home;
    })(Pai.Controllers || (Pai.Controllers = {}));
    var Controllers = Pai.Controllers;
})(Pai || (Pai = {}));

app.registerControllerFactory("Home.WorkMenuController", Pai.Controllers.Home.WorkMenuController);
//# sourceMappingURL=home.workMenuController.js.map
