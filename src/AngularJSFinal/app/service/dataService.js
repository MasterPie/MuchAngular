///<reference path="../../scripts/typings/angularjs/angular.d.ts" />
///<reference path="../../scripts/typings/linq/linq.d.ts" />
var Pai;
(function (Pai) {
    (function (Services) {
        var JSONFileDataService = (function () {
            function JSONFileDataService($q, $http) {
                this.$q = $q;
                this.$http = $http;
                this.$inject = ['http'];
            }
            JSONFileDataService.prototype.getTags = function () {
                var deferred = this.$q.defer();

                this.getWorkList().then(function (data) {
                    var tags = Enumerable.From(data).SelectMany(function (work) {
                        return work.tags;
                    }).Distinct("$");

                    deferred.resolve(tags);
                });

                return deferred.promise;
            };

            JSONFileDataService.prototype.getWorkList = function () {
                var deferred = this.$q.defer();

                this.$http.get('/Content/Works/index.json').success(function (data) {
                    var links = Enumerable.From(data["Works"]).Select(function (work) {
                        return new Pai.Model.Link(work["Title"], work["SubTitle"], work["Caption"], work["CreatedDate"], work["IndexImage"], work["URI"], work["WorkType"], work["Tags"]);
                    }).ToArray();
                    deferred.resolve(links);
                });

                return deferred.promise;
            };

            JSONFileDataService.prototype.getWork = function (id) {
                return this.$http.get('/Content/Works/' + id + '.json');
            };

            JSONFileDataService.prototype.getNews = function (id) {
                return this.$http.get('/Content/Works/' + id + '.json');
            };
            return JSONFileDataService;
        })();
        Services.JSONFileDataService = JSONFileDataService;
    })(Pai.Services || (Pai.Services = {}));
    var Services = Pai.Services;
})(Pai || (Pai = {}));

app.registerService("dataService", Pai.Services.JSONFileDataService);
//# sourceMappingURL=dataService.js.map
