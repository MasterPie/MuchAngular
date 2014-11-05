///<reference path="../../../scripts/typings/angularjs/angular.d.ts" /> 

module Pai.Controllers.Home {
    export class WorkDetailController {

        $inject = ['ngSanitize', '$routeParams','dataService'];

        constructor($scope: ng.IScope, $sce: ng.ISCEService, private $routeParams: ng.route.IRouteParamsService, private dataService: Pai.Services.IDataService) {

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
            }

            $scope['trustHtml'] = function (html) {
                return $sce.trustAsHtml(html);
            };

        }
    }
}

app.registerController("/Work/:id", "Home/WorkDetail.html", Pai.Controllers.Home.WorkDetailController);

