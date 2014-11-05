///<reference path="../../../scripts/typings/angularjs/angular.d.ts" /> 

module Pai.Controllers.Home {
    export class AboutController {

        constructor($scope: ng.IScope) {

        }
    }
}

app.registerController("/About", "Home/About.html", Pai.Controllers.Home.AboutController);

