(function () {
    angular.module('api')
		.controller('LayoutController',
			['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$window', '$location',
			function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $window, $location) {
			    $timeout(function () {
			        //aqui también puede activar plugins, se ejecuta al final de carga de página.

			        if ($scope.Autenticado == true) {
			            if (window.location.hash.length <= 3) {
			                		//$location.href=$scope.datosFormularioLogin.Parts.PaginaInicio;                          
			                		
			               // $location.url($scope.datosFormularioLogin.Parts.PaginaInicio)
			            }
			            //$rootScope.CargaInicialAplicacion();
			        }
			        $scope.estadomenu = true;//true por el momento
			    });
			    $rootScope.Redirect = function (url) {
			    	//cambio
			        $window.location.href = url;
			    }
			    $rootScope.Salir_Click = function () {
			    	//cambio
			        window.location.href = $scope.datosFormularioLogin.Parts.PaginaInicio;
			    }
			    $rootScope.Limpiar_Click = function () {
			        $scope.DatosFormulario = null;
			        LimpiarForm(".block_content");
			    }
			    $rootScope.CargaInicialAplicacion = function () {
			        $.ajax({
			            url: "/Maestros/CargaInicialAplicacion",
			            type: "POST",
			            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
			            data: "",
			            async: false,
			            dataType: "json",
			            success: function (data) {
			                data = jQuery.parseJSON(data);
			                if (data != undefined) {
			                    if (data.Resultado.Satisfactorio === true) {
			                        if ($rootScope.DatosFormulario == undefined)
			                            $rootScope.DatosFormulario = new Object();
			                        $rootScope.DatosFormulario.DatosGenerales = new Object();
			                        $rootScope.DatosFormulario.DatosGenerales.ListaTipoCambio = data.TipoCambio.ListaTipoCambio;

			                        $rootScope.DatosFormulario.DatosGenerales.ListaValoresDefecto = data.ListaParametrosNegocio;

			                    }
			                    else {
			                        MiError(data.Resultado.Mensaje);
			                    }
			                }
			            }
			        });


			    }
			    $scope.CargarMenu = function () {
			        $.ajax({
			            url: "/SeguridadAgma/ObtenerMenus",
			            type: "POST",
			            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
			            dataType: "json",
			            async: false,
			            success: function (data) {
			                if (data != undefined) {
			                    if (data.Satisfactorio === true) {
			                        $scope.Menus = data;
			                        $scope.Menus.UrlCerrarSesion = "/SeguridadAgma/CerrarSesion"
			                        $scope.Autenticado = true;
			                    }
			                    else {
			                        $scope.Menus = [];
			                        $scope.Autenticado = false;
			                        if (window.location.href.split('/').length > 5) {
			                        	//cambio
			                            window.location.href = "/#!/";
			                        }
			                    }
			                }
			            }
			        });
			    };
			    $scope.CargarDatosAdicionales = function () {

			        $.ajax({
			            url: "data/ChannelProperties?path=formulario_login",
			            type: "GET",
			            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
			            data: "",
			            async: false,
			            dataType: "json",
			            success: function (data) {

			                $scope.datosFormularioLogin = data.Data[0];
			            }
			        });
			    }
			    //$scope.CargarDatosAdicionales();

			    if ($scope.Autenticado == undefined) {
			       // $scope.CargarMenu();
			    }
			    $("#botonMenuResponsive").click(function () {
			        var contenedorBody = $("#ContenedorBody").find(".wrapper.wrapperMediano.col-md-12");
			        var contenedorBodyMenu = $("#ContenedorBodyMenu").find(".wrapper.wrapperMediano.col-md-12");
			        var menu = $("#menudesplegable ul");
			        if ($scope.estadomenu == true) {
			            //contenedorBody.show();
			            contenedorBodyMenu.hide();
			            $scope.estadomenu = false;
			        }
			        else {
			            $scope.estadomenu = true;
			            //contenedorBody.hide();
			            if (contenedorBodyMenu.find("ul").length <= 0) {
			                //menu.attr('style',"background-color:#0E75B5!important");
			                //menu.width('100%');
			                menu.find("li").width('100%');
			                menu.clone().appendTo(contenedorBodyMenu);
			            }
			            contenedorBodyMenu.show();
			            $(".SeparatorLeft2").hide();
			            $("#ContenedorBodyMenu").show();
			        }

			    });
			    $scope.events = [];
			    $scope.$on('IdleStart', function () {
			        // the user appears to have gone idle
			    });
			    $scope.$on('IdleWarn', function (e, countdown) {
			        // follows after the IdleStart event, but includes a countdown until the user is considered timed out
			        // the countdown arg is the number of seconds remaining until then.
			        // you can change the title or display a warning dialog from here.
			        // you can let them resume their session by calling Idle.watch()
			    });
			    $scope.$on('IdleTimeout', function () {
			        $.ajax({
			            url: $scope.Menus.UrlCerrarSesion,
			            type: "POST",
			            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
			            data: "",
			            dataType: "json",
			            cache: true,
			            async: false,
			            success: function (data) {

			            }
			        });
			        //  $location.url($scope.datosFormularioLogin.Parts.PaginaInicio);
			        location.reload();
			        //alert("La session ha expirado");
			    });
			    $scope.$on('IdleEnd', function () {
			        // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
			    });
			    $scope.$on('Keepalive', function () {
			        // do something to keep the user's session alive
			    });
			}]);


})();