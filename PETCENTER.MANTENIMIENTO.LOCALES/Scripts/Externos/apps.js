var urlPagina = "";
(function () {
    
    var app = angular.module('api', [
		'ngRoute',
		'ngResource'
    ]);

    app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
        var original = $location.path;

        
        $location.path = function (path, reload) {
            if (reload === false) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', function () {
                    $route.current = lastRoute;
                    un();
                });
            }
            return original.apply($location, [path]);
        };
        $rootScope.$on('$routeChangeSuccess', function () {
            //ga('send', 'pageview', $location.path());
            //ga('newTrackerGR.send', 'pageview', $location.path());

        });
        
    }]);
   
    app.config(['$provide', '$httpProvider', function ($provide, $httpProvider) {

        // configure http provider to convert 'PUT', 'DELETE' methods to 'POST' requests
        $provide.decorator('$http', ['$delegate', function ($http) {
            // create function which overrides $http function
            var httpStub = function (method) {
                return function (url, data, config) {
                    // AngularJS $http.delete takes 2nd argument as 'config' object
                    // 'data' will come as 'config.data'
                    if (method === 'delete') {
                        config = data;
                        config && (data = config.data);
                    }

                    config || (config = {});
                    config.headers || (config.headers = {});

                    // override actual request method with 'POST' request
                    config.method = method;

                    // set the actual method in the header
                    config.headers['X-HTTP-Method-Override'] = method;

                    var url2 = url;

                    if (~document.location.search.indexOf('refreshcache=1')) {
                        url2 = url + (~url.indexOf('?') ? '&' : '?') + document.location.search.substring(1);
                    }
                    return $http(angular.extend(config, {
                        url: url2,
                        data: data
                    }));
                };
            };
            // backup of original methods
            $http._get = $http.get;
            // override the
            $http.get = httpStub('get');
            var _$http = $http;

            return angular.extend(function (config) {

                if (~document.location.search.indexOf('refreshcache=1')) {
                    config.url = config.url + (~config.url.indexOf('?') ? '&' : '?') + document.location.search.substring(1);
                }

                return _$http(config);
            }, {
                get: _$http.get
            });
        }]);

    }]);

})();

/*
(function(angular) {
  'use strict';
angular.module('Modulo', [])
  .controller('ControladorPagina', ['$scope', function($scope) {
    $scope.master = {};

    $scope.update = function(tenant) {
      $scope.master = angular.copy(tenant);
    };

    $scope.reset = function(form) {
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
      $scope.tenant = angular.copy($scope.master);
    };

    $scope.reset();
  }]);
})(window.angular);
*/
