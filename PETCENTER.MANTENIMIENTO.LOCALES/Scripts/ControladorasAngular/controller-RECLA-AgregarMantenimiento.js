(function () {
    angular.module ( 'api' )
        .controller('AgregarMantenimientoController',
            ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
                function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
                    
                    $timeout(function () {
                        ponerFechas();
                        PonerFocoInicio();
                        if ($rootScope.DatosFormulario == undefined)
                            $rootScope.DatosFormulario = {};
                        if ($rootScope.DatosFormulario.DatosMantenimiento == undefined)
                            $rootScope.DatosFormulario.DatosMantenimiento = {};

                        $rootScope.DatosFormulario.DatosMantenimiento = {};
                    } );

                    function obtenerUltimoCodigo() {
                        var codigo = "";
                        var lstMantenimiento = $('#listaMantenimientos').jqGrid('getGridParam', 'data');
                        if (lstMantenimiento.length > 0) {
                            var mantenimiento = lstMantenimiento[lstMantenimiento.length - 1];
                            codigo = parseInt(mantenimiento.Codigo) + 1;
                        } else {
                            codigo = "1";
                        }
                        return codigo;
                    }

                    $scope.Guardar_Click = function () {
                        var validacion = validacionesCamposGuardar();
                        if (validacion === false) {
                            return false;
                        }
                        var objMantenimiento = {};
                        objMantenimiento.Codigo = obtenerUltimoCodigo();
                        objMantenimiento.Nombre = $rootScope.DatosFormulario.DatosMantenimiento.Nombre;
                        objMantenimiento.FechaMantenimiento = $rootScope.DatosFormulario.DatosMantenimiento.FechaMantenimiento;
                        objMantenimiento.Descripcion = $rootScope.DatosFormulario.DatosMantenimiento.Descripcion;

                        jQuery("#listaMantenimientos").jqGrid('addRowData', i + 1, objMantenimiento);
                        $scope.$parent.SalirPopup_Click();
                    };
                    function validacionesCamposGuardar() {
                        limpiarControlesValidacionEspeciales();
                        var salida = true;

                        if (validateForm("#AgregarMantenimientoFrm") == false) {
                            salida = false;
                        }
                        if (!$rootScope.DatosFormulario.DatosMantenimiento.FechaMantenimiento) {
                            $(".caja11.msgerror.FechaMantenimiento").html("Fecha Mantenimiento es requerido");
                            salida = false;
                        }
                        if (!$rootScope.DatosFormulario.DatosMantenimiento.Descripcion) {
                            $(".caja11.msgerror.Descripcion").html("Descripcion es requerido");
                            salida = false;
                        }
                        return salida;
                    }
                    function limpiarControlesValidacionEspeciales() {
                        $(".caja11.msgerror.FechaMantenimiento").html("");
                        $(".caja11.msgerror.Descripcion").html("");
                    }

                    $scope.Salir_Click = function () {
                        $scope.$parent.SalirPopup_Click();
                    };
                    
                    function Eliminar(codigoMantenimiento) {
                        alert("eliminar");
                    }
                }] );
}) ();