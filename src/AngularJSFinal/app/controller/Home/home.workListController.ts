///<reference path="../../../scripts/typings/angularjs/angular.d.ts" /> 
///<reference path="home.workListBaseController.ts"/>

module Pai.Controllers.Home {
    export class WorkListController extends WorkListBaseController {

        $inject = ['ngSanitize', '$routeParams', 'dataService'];

        constructor($scope, $sce: ng.ISCEService, private $routeParams: ng.route.IRouteParamsService, private dataService: Pai.Services.IDataService) {
            super($scope, $sce);

            var tagId = $routeParams['id'];

            var _this = this;

            $scope.$parent['SelectedWorkType'] = Pai.Model.WorkItemType[Pai.Model.WorkItemType.Project];

            dataService.getWorkList().then(function (data) {
                var works = data;
                
                var taggedWorks = Enumerable.From(works).Where(function (workItem) {
                    return (<Pai.Model.Link>workItem).tags && (<Pai.Model.Link>workItem).tags.indexOf(tagId) > -1;
                });

                $scope['HighlightedProject'] = _this.getHighlightedProject(taggedWorks);
                $scope['Works'] = _this.excludedHighlightedWorkFromList($scope['HighlightedProject'], taggedWorks).ToArray();
                $scope.$parent['SelectedTag'] = { "Name": tagId };
                
                $scope['MostRecentNews'] = Enumerable.From(taggedWorks)
                    .Where(function (work) { return (<Pai.Model.Link>work).itemType.toString() == Pai.Model.WorkItemType[Pai.Model.WorkItemType.News]; })
                    .OrderByDescending(function (work) { return (<Pai.Model.Link>work).createdDate; })
                    .First();
            });

            $scope['NotProjectFilter'] = _this.notProjectFilter;
        }
    }
}

app.registerController("/Work/Tag/:id", "Home/Home.html", Pai.Controllers.Home.WorkListController);