///<reference path="../../../scripts/typings/angularjs/angular.d.ts" /> 

module Pai.Controllers.Home {
    export class WorkListBaseController {
        constructor($scope: ng.IScope, $sce : ng.ISCEService) {

            $scope['trustSrc'] = function (src) {
                return $sce.trustAsResourceUrl(src);
            }

            $scope.$parent['SelectedTag'] = {"Name" : "" };

        }

        getHighlightedProject(works: linq.Enumerable) {
            return works
                .OrderByDescending(function (workItem) { return (<Pai.Model.Link>workItem).createdDate; })
                .First(function (workItem) {
                    return (<Pai.Model.Link>workItem).itemType.toString() == Pai.Model.WorkItemType[Pai.Model.WorkItemType.Project];
                });
        }

        excludedHighlightedWorkFromList(highlightedWorkItem: Pai.Model.Link, works: linq.Enumerable) {
            return works
                .Where(function (workItem) { return (<Pai.Model.Link>workItem).title != highlightedWorkItem.title; })
                .OrderByDescending(function (workItem) { return (<Pai.Model.Link>workItem).createdDate; });
        }

        notProjectFilter(workItem: Pai.Model.Link) {
                var t = workItem.itemType.toString() == Pai.Model.WorkItemType[Pai.Model.WorkItemType.Idea] ||
                    workItem.itemType.toString() == Pai.Model.WorkItemType[Pai.Model.WorkItemType.VisualDesign];

            console.log(workItem);
            console.log(t);

            return t;
        }

        
    }
}