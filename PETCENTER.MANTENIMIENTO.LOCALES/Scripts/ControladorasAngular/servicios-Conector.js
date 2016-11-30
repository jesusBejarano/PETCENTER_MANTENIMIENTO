(function () {
    angular.module('api')
         .service('ServiciosConector', ['$rootScope', '$http', function ($rootScope, $http) {
             //console.log("ok");
             $rootScope.data = {
                 data: new Array(),
             }

             this.service = {
                 get: function (url, nameobj, funcion_success, funcion_error) {
                     $http({
                         method: 'GET',
                         url: url,
                         params: {
                         }
                     })
                     .success(function (data) {
                         $rootScope.data[nameobj] = data;
                         funcion_success(data);
                         //fin carga
                         $rootScope.$broadcast(nameobj + '.update');
                     }).error(function (data, status, headers, config) {
                         funcion_error(data, status, headers, config);
                     });
                 },
                 add: function (nameobj, reg) {
                     $rootScope.data[nameobj].datos.push(reg);
                     //$rootScope.$broadcast(nameobj + '.update');
                 }
                
             };
         }])


})();

