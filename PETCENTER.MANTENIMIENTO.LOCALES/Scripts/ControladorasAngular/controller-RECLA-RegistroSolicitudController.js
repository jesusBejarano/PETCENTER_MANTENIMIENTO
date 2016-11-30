(function () {
    angular.module ( 'api' )
        .controller('RegistroSolicitudController',
            ['$scope', '$http', '$routeParams', '$timeout', 'Enum', 'ParseHtml', '$rootScope', 'Helpers', 'ServiciosConector', '$compile',
                function ($scope, $http, $routeParams, $timeout, Enum, ParseHtml, $rootScope, Helpers, ServiciosConector, $compile) {
                    
                    $timeout(function () {
                        ponerFechas();
                        PonerFocoInicio();
                        if ($rootScope.DatosFormulario == undefined)
                            $rootScope.DatosFormulario = {};
                        if ($rootScope.DatosFormulario.DatosSolicitud == undefined)
                            $rootScope.DatosFormulario.DatosSolicitud = {};
                        if ($rootScope.DatosFormulario.DatosSolicitudCargaInicial == undefined)
                            $rootScope.DatosFormulario.DatosSolicitudCargaInicial = {};
                        
                     
                        var paramCodigoSolicitud = getUrlVars()["codigoSolicitud"];
                        if (paramCodigoSolicitud) {
                           $rootScope.DatosFormulario.DatosSolicitud.SolicitudFlagEditar = true;
                           $rootScope.DatosFormulario.DatosSolicitud.CodigoSolicitud = paramCodigoSolicitud;
                        }

                  
                        var esEditar = $rootScope.DatosFormulario.DatosSolicitud.SolicitudFlagEditar;

                        $scope.FlagMostrarBotonAprobar = false;
                        if (esEditar) {
                            $scope.CargarDatosIniciales ();
                            $scope.FlagMostrarBotonModificar = true;
                            $scope.FlagMostrarBotonHistorial = true;
                            $scope.FlagMostrarBotonDeshabilitar = true;
                            $scope.FlagMostrarBotonGuardar = false;
                            $scope.CargaEdicionSolicitud();
                            $scope.FlagEditing = false;
                            $scope.FlagMostrarDescargarCarga = true;
                            $scope.FlagMostrarDescargarSustento = true;
                            $scope.FlagMostrarDescargarDocumento = true;
                            //$scope.FlagMostrarBotonEnviar = true;
                            $scope.FlagMostrarCodigoReclamo = true;
                        } else {
                            $rootScope.DatosFormulario.DatosSolicitud = {};
                            $scope.CargarDatosIniciales ();
                            $scope.FlagMostrarBotonGuardar = true;
                            $rootScope.DatosFormulario.DatosSolicitud.CodigoSolicitud = 0;
                            $scope.FlagEditing = true;
                           
                             $scope.FlagMostrarCodigoSolicitud = false;
                        }

                        $rootScope.DatosFormulario.DatosSolicitudCargaInicial.HabilitadoNumeroSolicitud = "False";

                    } );

                    $scope.CargarDatosIniciales = function () {

                        $.ajax ( {
                            url: "/Solicitud/Index",
                            type: "POST",
                            headers: {__RequestVerificationToken: $ ( 'input[name=__RequestVerificationToken]' ).val ()},
                            data: "",
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                if (data) {
                                    $rootScope.DatosFormulario.DatosSolicitudCargaInicial.TipoMantenimiento = data.TipoMantenimiento;
                                    $rootScope.DatosFormulario.DatosSolicitudCargaInicial.Sede = data.Sede;
                                    $rootScope.DatosFormulario.DatosSolicitudCargaInicial.Area = data.Area;
                                }
                                
                            }
                        } );
                    };

                    $scope.CargaEdicionSolicitud = function () {
                        var param = parseInt($rootScope.DatosFormulario.DatosSolicitud.CodigoSolicitud);
                          $.ajax({
                              url: "/Solicitud/ObtenerDetalleSolicitud",
                              type: "POST",
                              headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                              data: "codigoSolicitud=" + param,
                              dataType: "json",
                              cache: true,
                              async: false,
                              success: function (data) {
                                  if (data != null) {
                                      $rootScope.DatosFormulario.DatosSolicitud = data;
                                      for (i = 0; i < data.ListaMantenimiento.length; i++) {
                                          jQuery("#listaMantenimientos").jqGrid('addRowData', i + 1, data.ListaMantenimiento[i]);
                                      }
                                  }

                              }
                          });
                    }

                    $scope.Deshabilitar_Click = function () {
                          if ($rootScope.DatosFormulario.DatosSolicitud.NumeroSolicitud > 0) {

                              MiConfirm("¿Está seguro de deshabilitar la solicitud?.", function () {
                                var request = $rootScope.DatosFormulario.DatosSolicitud;
                                $.ajax({
                                    url: "/Solicitud/DeshabilitarSolicitud",
                                    type: "POST",
                                    headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                                    data: "request=" + JSON.stringify(request),
                                    dataType: "json",
                                    cache: true,
                                    async: false,
                                    success: function (data) {
                                        if (data.Result != null) {
                                            if (data.Result.Satisfactorio === true) {
                                                MiAlertOk("Se ha deshabilitado correctamente la solicitud.", MiAlertOk_success);
                                                //$rootScope.Redirect("/#!/sistema/busqueda/buscar-tarifa-local/");
                                            }
                                            else {
                                                if (data.Result.Mensajes.length > 0) {
                                                    MiError(data.Result.Mensajes[0].Mensaje);
                                                }
                                                else {
                                                    MiError(data.Result.Mensaje);
                                                }
                                            }
                                        } else {
                                            MiAlert("Ocurrió un problema interno en el sistema.");
                                        }

                                    }
                                });


                              });
                          }
                    }

                    $scope.Modificar_Click = function () {
                        $scope.FlagMostrarBotonGuardar = true;
                        $scope.FlagEditing = true;
                      //   $scope.EditingGrillas();
                    };

                    $scope.Guardar_Click = function () {
                         
                          var validacion = validacionesCamposGuardar();
                          if (validacion == false) {
                              return false;
                          }
                         
                          guardarAux();
                    };
                    
                    $("#btnGuardar").off('click').on('click', function () {
                        if ($rootScope.DatosFormulario.DatosSolicitud.NumeroSolicitud > 0) {
                            actualizar();
                        } else {
                            guardar();
                        }
                            

                    });
                  
                    function guardar(){

                        var validacion = validacionesCamposGuardar();
                          if (validacion == false) {
                              return false;
                          }
                          $rootScope.DatosFormulario.DatosSolicitud.ListaMantenimiento =  $('#listaMantenimientos').jqGrid('getGridParam', 'data');
                          var request = $rootScope.DatosFormulario.DatosSolicitud;
                          $.ajax({
                              url: "/Solicitud/RegistrarSolicitud",
                              type: "POST",
                              headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                              data: "request=" + JSON.stringify(request),
                              dataType: "json",
                              cache: true,
                              async: false,
                              success: function (data) {
                                  if (data.Result != null) {
                                      if (data.Result.Satisfactorio === true) {
                                          MiAlertOk("Se ha registrado correctamente la solicitud.", MiAlertOk_success);
                                          //$rootScope.Redirect("/#!/sistema/busqueda/buscar-tarifa-local/");
                                      }
                                      else {
                                          if (data.Result.Mensajes.length > 0) {
                                              MiError(data.Result.Mensajes[0].Mensaje);
                                          }
                                          else {
                                              MiError(data.Result.Mensaje);
                                          }
                                      }
                                  } else {
                                      MiAlert("Ocurrió un problema interno en el sistema.");
                                  }

                              }
                          });
                        
                    }
                    function actualizar() {

                        var validacion = validacionesCamposGuardar();
                        if (validacion == false) {
                            return false;
                        }
                        $rootScope.DatosFormulario.DatosSolicitud.ListaMantenimiento = $('#listaMantenimientos').jqGrid('getGridParam', 'data');
                        var request = $rootScope.DatosFormulario.DatosSolicitud;
                        $.ajax({
                            url: "/Solicitud/ActualizarSolicitud",
                            type: "POST",
                            headers: { __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val() },
                            data: "request=" + JSON.stringify(request),
                            dataType: "json",
                            cache: true,
                            async: false,
                            success: function (data) {
                                if (data.Result != null) {
                                    if (data.Result.Satisfactorio === true) {
                                        MiAlertOk("Se ha actualizado correctamente la solicitud.", MiAlertOk_success);
                                        //$rootScope.Redirect("/#!/sistema/busqueda/buscar-tarifa-local/");
                                    }
                                    else {
                                        if (data.Result.Mensajes.length > 0) {
                                            MiError(data.Result.Mensajes[0].Mensaje);
                                        }
                                        else {
                                            MiError(data.Result.Mensaje);
                                        }
                                    }
                                } else {
                                    MiAlert("Ocurrió un problema interno en el sistema.");
                                }

                            }
                        });



                    }

                    function validacionesCamposGuardar() {
                        limpiarControlesValidacionEspeciales();
                        var salida = true;
                        
                        if (validateForm("#RegistroSolicitudFrm") == false) {
                            salida = false;
                        }
                        if (!$rootScope.DatosFormulario.DatosSolicitud.Descripcion) {
                            $(".caja11.msgerror.Descripcion").html("Descripcion es requerido");
                            salida = false;
                        }
                        if (!$rootScope.DatosFormulario.DatosSolicitud.FechaSolicitud) {
                            $(".caja11.msgerror.FechaSolicitud").html("Fecha Solicitud es requerido");
                            salida = false;
                        }
                        var lstMantenimientos = $('#listaMantenimientos').jqGrid('getGridParam', 'data');
                        if (lstMantenimientos.length === 0) {
                            $(".caja11.msgerror.ListaMantenimiento").html("Debe ingresar por lo menos un registro");
                            salida = false;
                        }


                        return salida;
                    }

                    function limpiarControlesValidacionEspeciales(){
                        $(".caja11.msgerror.Descripcion").html("");
                        $(".caja11.msgerror.FechaSolicitud").html("");
                        $(".caja11.msgerror.ListaMantenimiento").html("");
                    }

                    function obtenerRequestGuardar(){
                       //$rootScope.DatosFormulario.DatosSolicitud.ReclamoAdjuntoLista.push(objCarta);
                        $rootScope.DatosFormulario.DatosSolicitud.CodigoEstadoGeneral = "001"
                        $rootScope.DatosFormulario.DatosSolicitud.CodigoEstado = "001";
                        $rootScope.DatosFormulario.DatosSolicitud.Acccion = "I";
                        var listaMotivoReclamoGrabar = [];
                        var listaMotivoReclamo = $from($rootScope.DatosFormulario.DatosSolicitud.ListaMotivoReclamo).where("$idCheck==true").toArray();
                          for (var i = 0; i < listaMotivoReclamo.length; i++) {
                              var objTipoReclamoTmp = new Object();
                              objTipoReclamoTmp.CodigoReclamoMotivoReclamo = 0;
                              objTipoReclamoTmp.CodigoMotivoReclamo = listaMotivoReclamo[i].CodigoMotivoReclamo;
                              objTipoReclamoTmp.Accion = "I";
                              listaMotivoReclamoGrabar.push(objTipoReclamoTmp);
                          }

                       
                          //EDICION RECLAMO
                        if ($rootScope.DatosFormulario.DatosSolicitud.CodigoReclamo > 0) {
                              var listaMotivoReclamoEdit = $rootScope.DatosFormulario.DatosSolicitud.ListaMotivoReclamoEdit;
                              if (listaMotivoReclamoEdit.length > 0) {
                                  for (var c = 0; c < listaMotivoReclamoEdit.length; c++) {
                                      var band = false;
                                      for (var d = 0; d < listaMotivoReclamoGrabar.length; d++) {
                                          if (listaMotivoReclamoGrabar[d].CodigoMotivoReclamo == listaMotivoReclamoEdit[c].CodigoMotivoReclamo) {
                                              listaMotivoReclamoGrabar.splice(d, 1);
                                              band = true;
                                          }
                                      }
                                      if (!band) {
                                          var obtMotivoReclamo = new Object();
                                          obtMotivoReclamo.CodigoReclamoMotivoReclamo =  listaMotivoReclamoEdit[c].CodigoReclamoMotivoReclamo;
                                          obtMotivoReclamo.CodigoMotivoReclamo = listaMotivoReclamoEdit[c].CodigoMotivoReclamo;
                                          obtMotivoReclamo.Accion = "D";
                                          listaMotivoReclamoGrabar.push(obtMotivoReclamo);
                                      }
                                  }
                              }
                              $rootScope.DatosFormulario.DatosSolicitud.Acccion = "U";
                          }
                            //EDICION RECLAMO

                         $rootScope.DatosFormulario.DatosSolicitud.ListaMotivoReclamoGrabar =listaMotivoReclamoGrabar;

                    }

                    $scope.Salir_Click = function () {
                        window.location.href = '/Solicitud/ConsultaSolicitud';
                    };
                    function MiAlertOk_success() {
                        window.location.href = '/Solicitud/ConsultaSolicitud';
                    }

                    function getUrlVars() {
                        var vars = [], hash;
                        var hashes = window.location.href.slice ( window.location.href.indexOf ( '?' ) + 1 ).split ( '&' );
                        for (var i = 0; i < hashes.length; i++) {
                            hash = hashes[i].split ( '=' );
                            vars.push ( hash[0] );
                            vars[hash[0]] = hash[1];
                        }
                        return vars;
                    
                    }

                    $scope.Modificar_Click = function () {
                        $scope.FlagMostrarBotonGuardar = true;
                        $scope.FlagMostrarBotonModificar = false;
                        $scope.FlagMostrarBotonDeshabilitar = false;
                        $scope.FlagEditing = true;
                        $scope.EditingGrillas ();
                    };

                    $scope.Enter = function () {
                        $rootScope.EsEnter = true;
                        return false;
                    };

                    $ ( "input" ).focusout ( function () {
                        $rootScope.EsEnter = false;
                    });
                    $scope.AgregarMantenimiento_Click = function () {
                        var altura = 800;
                        getPopupResponsive({
                            formURL: "AgregarMantenimiento",
                            title: "Agregar Mantenimiento",
                            nombreDiv: "divPopupAgregarMantenimiento",
                            nombreGrid: "",
                            width: "800px",
                            height: altura,
                            params: {},
                            HideSelection: true,
                            multiSelect: false,
                            select: function (row) {
                                return true;
                            },
                            beforeShow: function (obj) {
                                
                                $rootScope.hashPopup = $(obj).attr("mapurl");
                                $compile($("#divPopupAgregarMantenimiento"))($scope);
                            }
                        });
                    };


                    jQuery("#listaMantenimientos").jqGrid({
                        
                        datatype: "local",
                        colNames: ['Código', 'Nombre', 'Fecha Mantenimiento', 'Descripcion', 'Eliminar'],
                        colModel: [
                            { name: 'Codigo', index: 'Codigo', width: 220, align: "center" },
                            { name: 'Nombre', index: 'Nombre', width: 220, align: "center" },
                            { name: 'FechaMantenimiento', index: 'FechaMantenimiento', width: 220, align: "center" },
                            { name: 'Descripcion', index: 'Descripcion', width: 220, align: "center" },
                           {
                               name: 'Eliminar',
                               align: 'center',
                               sortable: false,
                               width: 250,
                               formatter: function (cellvalue, options, rowObject) {
                                   return "<div style='width:100%;padding-left:10px'>" +
                                     "<a style='cursor:pointer;width:100%'>" +
                                     "<button title='Eliminar'  onclick='Eliminar(" + options.rowId + ")' class='boton1Style botonpequenio'>" +
                                     "<img width='16' height='16' src='/Images/eliminar.png'></button></a></div>";
                               }
                           }
                        ],
                        shrinkToFit: false,
                        autowidth: true
                    });
                  //  jQuery("#listaMantenimientos").jqGrid('navGrid', '#pagerlistaMantenimientos', { edit: false, add: false, del: false });

                }] );
}) ();