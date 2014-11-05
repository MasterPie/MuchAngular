///<reference path="../../../scripts/typings/angularjs/angular.d.ts" /> 
///<reference path="home.workListBaseController.ts"/>

module Pai.Controllers.Home {
    export class WorkListDefaultController extends WorkListBaseController {

        $inject = ['ngSanitize','dataService'];

        constructor($scope: ng.IScope, $sce: ng.ISCEService,  private dataService: Pai.Services.IDataService) {
            super($scope, $sce);

            var _this = this;

            $scope.$parent['SelectedTag'] = { "Name": "Portfolio" };

            $scope.$parent['SelectedWorkType'] = Pai.Model.WorkItemType[Pai.Model.WorkItemType.Project];

            var selectedTagName = $scope['SelectedTag'].Name;

            dataService.getWorkList().then(function (data) {
                var taggedWorks = Enumerable.From(data).Where(function (workItem) {
                    return ((<Pai.Model.Link>workItem).tags && (<Pai.Model.Link>workItem).tags.indexOf(selectedTagName) > -1
                        || (<Pai.Model.Link>workItem).itemType.toString() == Pai.Model.WorkItemType[Pai.Model.WorkItemType.News]);
                });

                $scope['HighlightedProject'] = _this.getHighlightedProject(taggedWorks);
                $scope['Works'] = _this.excludedHighlightedWorkFromList($scope['HighlightedProject'], taggedWorks).ToArray();
                $scope['MostRecentNews'] = Enumerable.From(taggedWorks)
                    .Where(function (work) { return (<Pai.Model.Link>work).itemType.toString() == Pai.Model.WorkItemType[Pai.Model.WorkItemType.News]; })
                    .OrderByDescending(function (work) { return (<Pai.Model.Link>work).createdDate; })
                    .First();
            });

            $scope['NotProjectFilter'] = _this.notProjectFilter;

        }
    }
}

app.registerController("/", "Home/Home.html", Pai.Controllers.Home.WorkListDefaultController);

