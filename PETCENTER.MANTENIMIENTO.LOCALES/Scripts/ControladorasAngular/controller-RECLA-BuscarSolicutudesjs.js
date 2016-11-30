(function () {
    angular.module ( 'api' )
        .controller ( 'BuscarSolicitudesController',
            ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
                function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
                    $timeout(function () {
                        ponerFechas();
                        PonerFocoInicio();
                        if ($rootScope.DatosFormulario == undefined) {
                            $rootScope.DatosFormulario = {};
                        }
                        if ($rootScope.DatosFormulario.DatosSolicitud == undefined)
                            $rootScope.DatosFormulario.DatosSolicitud = {};

                        if ($rootScope.DatosFormulario.FiltrosBusquedaSolicitud == undefined) {
                            $rootScope.DatosFormulario.FiltrosBusquedaSolicitud = {};
                        }
                        if ($rootScope.DatosFormulario.FiltrosBusquedaSolicitudCargaInicial == undefined) {
                            $rootScope.DatosFormulario.FiltrosBusquedaSolicitudCargaInicial = {};
                        }
                        $rootScope.DatosFormulario.FiltrosBusquedaSolicitud = {};

                        $scope.CargaInicialBusquedaSolicitud();
                        $scope.FlagMostrarBotonNuevo = true;
                    });
                    
                    var FechaInicioDefault;
                    var FechaFinDefault;

                    $scope.MiBoton = function (idgrilla, tipoboton, cellvalue, options, rowObject) {
                        var eventoclick = "";
                        switch (idgrilla) {
                            case "grillaReclamosBusquedaReclamos": {
                                switch (tipoboton) {
                                    case "Editar":
                                        eventoclick = "$parent.EditarReclamo('" + rowObject.NumeroReclamo + "'" + ",'" +rowObject.CodigoEstadoGeneral + "'"  +");";
                                        break;
                                }
                                /*
                                switch (tipoboton) {
                                    case "Quitar":
                                        eventoclick = "$parent.QuitarReclamo('" + rowObject.NumeroReclamo + "');";
                                        break;
                                }
                                */
                            }
                                break;
                        }
                        var html = "";
                        if (tipoboton == "Editar") {
                            html = HtmlCrearBoton ( "Modificar", eventoclick, "" );
                        }
                        /*
                        if (tipoboton == "Quitar") {
                            html = HtmlCrearBoton("Eliminar", eventoclick, "");
                        }
                        */
                        return html;
                    };
                    $scope.EditarSolicitud = function (codigoSolicitud) {
                        $rootScope.DatosFormulario.DatosSolicitud.SolicitudFlagEditar = true;
                        window.location.href = '/Solicitud/RegistroSolicitud/?codigoSolicitud' + codigoSolicitud;
                    };
                    $rootScope.QuitarReclamo = function (numeroReclamo) {
                       MiConfirm("¿Está seguro de eliminar el Reclamo?.", function () {
                          var listaGrillaReclamo = $rootScope.DatosFormulario.grillaReclamosBusquedaReclamos;
                       
                          $rootScope.DatosFormulario.RegistroACEscalonado.ListaRate = listaGrillaRA;
                          $rootScope.DatosFormulario.RegistroACEscalonado.grillaListaRAMemoriaList = listaBaseRA;
                          $scope.gridapigrillaAceListaRate.refresh(listaGrillaRA);
                          $rootScope.$apply();
                          if ($rootScope.DatosFormulario.RegistroACEscalonado.DatosRegistroACE.CodigoAcuerdoComercialEscalonado > 0) {
                              $rootScope.HabilitarCampoRate();
                          }
                       });
                    }
                    $scope.CargaInicialBusquedaSolicitud = function () {
                        $.ajax ( {
                            url: "Index",
                            type: "POST",
                            headers: {__RequestVerificationToken: $ ( 'input[name=__RequestVerificationToken]' ).val ()},
                            data: "",
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                if (data) {
                                    FechaInicioDefault = data.FechaInicio;
                                    FechaFinDefault = data.FechaFin;
                                    $rootScope.DatosFormulario.FiltrosBusquedaSolicitud.FechaInicio = FechaInicioDefault;
                                    $rootScope.DatosFormulario.FiltrosBusquedaSolicitud.FechaFin = FechaFinDefault;
                                    $rootScope.DatosFormulario.FiltrosBusquedaSolicitudCargaInicial.Estado = data.Estado;
                                    $rootScope.DatosFormulario.FiltrosBusquedaSolicitudCargaInicial.TipoMantenimiento = data.TipoMantenimiento;
                                    $rootScope.DatosFormulario.FiltrosBusquedaSolicitudCargaInicial.Sede = data.Sede;
                                    $rootScope.DatosFormulario.FiltrosBusquedaSolicitudCargaInicial.Area = data.Area;
                                }
                            }
                        } );
                    };
                    $scope.Buscar_Click = function () {
                        //  $scope.compilarGrilla("#consultaSolicitudes");

                        if ($rootScope.EsEnter) {
                            return false;
                        }

                        if (validateForm ( "#BusquedaSolicitudFrm" ) == false) {
                            return false;
                        }
                        var trf = $("#consultaSolicitudes tbody:first tr:first")[0];
                        $("#consultaSolicitudes tbody:first").empty().append(trf);

                        var temFechaInicio = $rootScope.DatosFormulario.FiltrosBusquedaSolicitud.FechaInicio;
                        var temFechaFin = $rootScope.DatosFormulario.FiltrosBusquedaSolicitud.FechaFin;

                        var fechaInicio = temFechaInicio.split(" ")[0].split("/");
                        var fechaFin = temFechaFin.split(" ")[0].split("/");
                     
                      
                        var fechaInicioFinal = fechaInicio[2] + '-' + fechaInicio[1] + '-' + fechaInicio[0] + ' 23:59:45';
                        var fechaFinFinal = fechaFin[2] + '-' + fechaFin[1] + '-' + fechaFin[0] + ' 23:59:45';
                       
                        //fechaFinFinal = '2016-11-29 17:15:45';

                        var request = $rootScope.DatosFormulario.FiltrosBusquedaSolicitud;
                        request.FechaInicioFinal = fechaInicioFinal;
                        request.FechaFinFinal = fechaFinFinal;
                        //var request = { "request": objRequest };
                        $.ajax({
                            url: "ObtenerSolicitudes",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: request,
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                if (data) {
                                    for (i = 0; i < data.ListaSolicitud.length; i++) {
                                        jQuery("#consultaSolicitudes").jqGrid('addRowData', i + 1, data.ListaSolicitud[i]);
                                    }
                                }
                            }
                        });
                        
                        return false;
                    };
                    $scope.Nuevo_Click = function () {
                        $rootScope.DatosFormulario.DatosSolicitud.SolicitudFlagEditar = false;
                        window.location.href = '/Solicitud/RegistroSolicitud'; 
                    };
                    $scope.Salir_Click = function() {
                        window.location.href = 'http://' + window.location.host;
                    }
                    $scope.Limpiar_Click = function () {
                        $rootScope.DatosFormulario.FiltrosBusquedaSolicitud.CodigoSolicitud = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaSolicitud.CodigoTipoMantenimiento = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaSolicitud.Estado = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaSolicitud.CodigoSede = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaSolicitud.CodigoArea = null;
                        $rootScope.DatosFormulario.FiltrosBusquedaSolicitud.FechaInicio = FechaInicioDefault;
                        $rootScope.DatosFormulario.FiltrosBusquedaSolicitud.FechaFin = FechaFinDefault;                       
                    };

                    $scope.ListarSedeByNegocio = function () {
                        var param =$rootScope.DatosFormulario.FiltrosBusquedaSolicitud.CodigoNegocio;
                        $.ajax ( {
                            url: "/Reclamos/ListarSedeByNegocio",
                            type: "POST",
                            headers: {__RequestVerificationToken: $ ( 'input[name=__RequestVerificationToken]' ).val ()},
                            data: "codigoNegocio=" + param,
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                $rootScope.DatosFormulario.FiltrosBusquedaReclamosCargaInicial.HabilitadoSede = 'True';
                                $rootScope.DatosFormulario.FiltrosBusquedaReclamosCargaInicial.Sede = data.Sede;
                                if ( data.Sede.length > 0) {
                                       $rootScope.DatosFormulario.FiltrosBusquedaSolicitud.CodigoSede = $rootScope.DatosFormulario.FiltrosBusquedaReclamosCargaInicial.Sede[0].CodigoSede
                                      if (data.Sede.length == 1) {
                                          $rootScope.DatosFormulario.FiltrosBusquedaReclamosCargaInicial.HabilitadoSede = 'False';
                                          $(".caja11.msgerror.CodigoSede").html("");
                                          $scope.ListarTipoReclamosByNegocioSede();
                                      }
                                }
                            }
                        } );
                    };
                    
                    $scope.ListarTipoReclamosByNegocioSede = function () {
                        var param =$rootScope.DatosFormulario.FiltrosBusquedaSolicitud.CodigoNegocio;
                        var param2 =$rootScope.DatosFormulario.FiltrosBusquedaSolicitud.CodigoSede;
                        $.ajax ( {
                            url: "/Reclamos/ListarTipoReclamosByNegocioSede",
                            type: "POST",
                            headers: {__RequestVerificationToken: $ ( 'input[name=__RequestVerificationToken]' ).val ()},
                            data: "codigoNegocio=" + param + "&codigoSede=" + param2,
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                $rootScope.DatosFormulario.FiltrosBusquedaReclamosCargaInicial.TipoReclamo = data.TipoReclamo;
                            }
                        } );
                    };

                    $scope.BuscarCliente_Click = function () {
                        $rootScope.FlagCallClientes = "ConsultaReclamos";
                        $rootScope.FlagTipoCliente = "ConsultaReclamos";
                        var altura = 800;
                        getPopupResponsive ( {
                            formURL: "es-PE/sistema/busqueda/buscar-cliente/",
                            title: "Buscar Cliente",
                            nombreDiv: "divPopupBuscarCliente",
                            nombreGrid: "",
                            width: "1200px",
                            height: altura,
                            params: {},
                            HideSelection: true,
                            multiSelect: false,
                            select: function (row) {
                                return true;
                            },
                            beforeShow: function (obj) {
                                $rootScope.hashPopup = $ ( obj ).attr ( "mapurl" );
                                $compile ( $ ( "#divPopupBuscarCliente" ) ) ( $scope );
                            }
                        } );
                    };

                    $scope.Enter = function () {
                        $rootScope.EsEnter = true;
                        return false;
                    };

                    $( "input" ).focusout ( function () {
                        $rootScope.EsEnter = false;
                    });

                  

                    jQuery("#consultaSolicitudes").jqGrid({
                        //url: 'ObtenerSolicitudes',
                        datatype: "local",
                        colNames: ['Código', 'Estado', 'Fecha Creación', 'Tipo Mantenimiento', 'Sede', 'Área', 'Editar'],
                        colModel: [
                            { name: 'Codigo', index: 'Codigo', width: 220, align: "center", sortable: false},
                            { name: 'Estado', index: 'Estado', width: 220, align: "center", sortable: false },
                            { name: 'FechaHoraCreacion', index: 'FechaHoraCreacion', width: 220, align: "center", sortable: false },
                            { name: 'TipoMantenimiento', index: 'TipoMantenimiento', width: 220, align: "center", sortable: false },
                            { name: 'Sede', index: 'Sede', width: 220, align: "center", sortable: false },
                            { name: 'Area', index: 'Area', width: 220, sortable: false, align: "center", },
                           {
                               name: 'Editar',
                               align: 'center',
                               sortable: false,
                               width: 230,
                               formatter: function (cellvalue, options, rowObject) {
                                   return "<div style='width:100%;padding-left:10px'>" +
                                     "<a style='cursor:pointer;width:100%'>" +
                                     "<button title='Imprimir' onclick='Editar(" + rowObject.Codigo + ")'  class='boton1Style botonpequenio'>" +
                                     "<img width='16' height='16' src='/Images/editar.png'></button></a></div>";
                               }
                           }
                        ],
                        rowNum: 10,
                        rowList: [10, 20, 30],
                        pager: '#pagerconsultaSolicitudes',
                        //sortname: 'Codigo',
                        shrinkToFit: false,
                        autowidth: true,
                        
                        viewrecords: true//,
                        //sortorder: "desc"
                    });
                    jQuery("#consultaSolicitudes").jqGrid('navGrid', '#pagerconsultaSolicitudes', { edit: false, add: false, del: false });
                   

                    //$scope.compilarGrilla = function(Id) {
                    //    $(Id).find('td[role=gridcell]').each(function (x) {
                    //                $compile($(this))($scope);
                    //    });
                    //};
                }] );
}) ();