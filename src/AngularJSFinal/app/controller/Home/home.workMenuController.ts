///<reference path="../../../scripts/typings/angularjs/angular.d.ts" /> 
///<reference path="../../../scripts/typings/linq/linq.d.ts" /> 

module Pai.Controllers.Home {
    export class WorkMenuController  {

        $inject = ['dataService', '$locationService'];

        constructor($scope: ng.IScope, private dataService: Pai.Services.IDataService, $location: ng.ILocationService) {
            var workItemTypes = [];
            var workItems = [];

            for (var val in Pai.Model.WorkItemType) {
                if (isNaN(val)) {
                    workItemTypes.push({ "Key": Pai.Model.FromEnumToDisplayName(val), "Value": val });
                }
            }

            $scope['WorkTypes'] = workItemTypes;

            $scope['SelectedWorkType'] = Pai.Model.WorkItemType[Pai.Model.WorkItemType.Project];

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
                }
                else {
                    $scope['Projects'] = Enumerable.From(workItems).Where(function (workItem) {
                        return (<Pai.Model.Link>workItem).tags.indexOf($scope['SelectedTag'].Name) > -1;
                    }).ToArray();
                }
            });

        }
    }
}

app.registerControllerFactory("Home.WorkMenuController", Pai.Controllers.Home.WorkMenuController);

