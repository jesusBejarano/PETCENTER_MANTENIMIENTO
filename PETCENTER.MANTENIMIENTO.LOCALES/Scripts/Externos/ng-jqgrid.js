(function () {
    angular.module('api')
          .directive('ngJqgrid', ['$window', '$timeout', '$compile', '$rootScope', function ($window, $timeout, $compile, $rootScope) {
              return {
                  restrict: 'E',
                  replace: true,
                  scope: {
                      config: '=',
                      modeldata: '=',
                      insert: '=?',
                      api: '=?',
                      addnew: "="
                  },
                  link: function (scope, element, attrs) {
                      var table, div;
                      scope.$watch('config', function (value) {
                          element.children().empty();
                          table = $("#" + attrs.gridid);
                          scope.particionalParametro = function (strParametro) {
                              var _params1_parte1 = "";
                              var _paramID_parte1 = "";
                              var _params1_parte2 = "";
                              var _params1_parte3 = "";
                              var arrayParam1 = strParametro.split('ID(');
                              if (arrayParam1.length > 0) {
                                  var arraysubParam1 = arrayParam1[1].split(')');
                                  if (arraysubParam1.length > 1) {
                                      var arrayParte1 = arraysubParam1[0].split(',');
                                      if (arrayParte1.length == 1) {
                                          _params1_parte1 = "";
                                          _params1_parte1 = _params1_parte1 + arrayParte1[0];
                                          _paramID_parte1 = arrayParte1[0];
                                      }
                                      else {
                                          if (arrayParte1.length == 2) {
                                              _params1_parte1 = "";
                                              _params1_parte2 = "";
                                              _params1_parte1 = _params1_parte1 + arrayParte1[0];
                                              _params1_parte2 = _params1_parte2 + arrayParte1[1];
                                          }
                                          else {
                                              if (arrayParte1.length >= 3) {
                                                  _params1_parte1 = "";
                                                  _params1_parte2 = "";
                                                  _params1_parte3 = "";
                                                  _params1_parte1 = _params1_parte1 + arrayParte1[0];
                                                  _params1_parte2 = _params1_parte2 + arrayParte1[1];
                                                  _params1_parte3 = _params1_parte3 + arrayParte1[2];
                                              }
                                          }

                                      }
                                  }
                              }

                              var salida = {
                                  params1_parte1: _params1_parte1,
                                  paramID_parte1: _paramID_parte1,
                                  params1_parte2: _params1_parte2,
                                  params1_parte3: _params1_parte3,
                              };
                              return salida;
                          }
                          scope.getColumnasDeControl_aux = function (idgrilla, objformulario, tipoDatos) {
                              var mcontrols = new Array();

                              if (objformulario == undefined || objformulario == null) {
                                  var camposJqGrid = {
                                      Nombre: "",
                                      columnas: [],
                                      NombreBotonExportar: "",
                                      NombreSinResultados: "",
                                  };
                                  return camposJqGrid;
                              }
                              $(objformulario.Parts.Secciones).each(function (x) {
                                  $(objformulario.Parts.Secciones[x].Parts.Controls).each(function (y) {
                                      mcontrols.push(objformulario.Parts.Secciones[x].Parts.Controls[y]);
                                      if (objformulario.Parts.Secciones[x].Parts.Controls[y].Parts.Controls != undefined) {
                                          $(objformulario.Parts.Secciones[x].Parts.Controls[y].Parts.Controls).each(function (z) {
                                              mcontrols.push(objformulario.Parts.Secciones[x].Parts.Controls[y].Parts.Controls[z]);
                                          });
                                      }
                                  });
                              });
                              var objControl = $from(mcontrols).where("$Id=='" + idgrilla.toLowerCase() + "'").firstOrDefault();
                              if (objControl == undefined || objControl == null) {
                                  var camposJqGrid = {
                                      Nombre: "",
                                      columnas: [],
                                      NombreBotonExportar: "",
                                      NombreSinResultados: "",
                                  };
                                  return camposJqGrid;
                              }
                              var objGrilla = objControl.Parts;
                              var idgrilla = objGrilla.objgrilla;
                              var objColumnasBackOffice = objGrilla.columnas;
                              var objCampos = new Array();

                              $.each(objColumnasBackOffice, function (x) {
                                  var ancho = objColumnasBackOffice[x].Parts.ancho;
                                  var strParametro = objColumnasBackOffice[x].Parts.Parametro;
                                  var strDirection = objColumnasBackOffice[x].Parts.Direction.Value;
                                  var strOculto = objColumnasBackOffice[x].Parts.oculto;
                                  var strClave = objColumnasBackOffice[x].Parts.llave;
                                  var strNroDecimales = objColumnasBackOffice[x].Parts.NroDecimales;
                                  var strCtrEditable = objColumnasBackOffice[x].Parts.Editable;
                                  var strDataSource = objColumnasBackOffice[x].Parts.DataSource;
                                  var strDisplayMember = objColumnasBackOffice[x].Parts.DisplayMember;
                                  var strValueMember = objColumnasBackOffice[x].Parts.ValueMember;
                                  var strEventoClick = objColumnasBackOffice[x].Parts.eventoclick;
                                  var strEventoChange = objColumnasBackOffice[x].Parts.eventochange;
                                  var strFlgSeleccioneCombo = objColumnasBackOffice[x].Parts.FlgSeleccioneCombo;
                                  var cantidadCaracteres = objColumnasBackOffice[x].Parts.CantidadCaracteres;
                                  var MultipleSelect = objColumnasBackOffice[x].Parts.MultipleSelect;
                                  var strOtroTextoCombo = objColumnasBackOffice[x].Parts.OtroTextoCombo;
                                  var strTextoComboSeleccione = "";
                                  if (strFlgSeleccioneCombo == "1") {
                                      if (!(strOtroTextoCombo == undefined || strOtroTextoCombo == "")) {
                                          strTextoComboSeleccione = strOtroTextoCombo;
                                      }
                                      else {
                                          strTextoComboSeleccione = '[Seleccione]';
                                      }
                                  }
                                  var objalign = "";
                                  var tipoformato = objColumnasBackOffice[x].Parts.formato.Value;
                                  var cantidadCaracteres = objColumnasBackOffice[x].Parts.CantidadCaracteres;
                                  var objformater = undefined;
                                  var objformatoptions = undefined;
                                  var objformat = {};
                                  var objhidden = false;
                                  var objEditrules = {};
                                  var objkey = false;
                                  var strCaption = objColumnasBackOffice[x].Parts.es_pe__Nombre;
                                  var strEdittype = undefined;
                                  var strEditoptions = undefined;
                                  var strSortable = true;
                                  var strEditable = undefined;
                                  var objunformat = undefined;


                                  var ngModelAtr = "";
                                  if (ancho == undefined || ancho == null || ancho == "auto") {
                                      ancho = "20%";
                                  }
                                  if (strOculto == "1") {
                                      objhidden = true;
                                  }
                                  if (strClave == "1") {
                                      objkey = true;
                                  }


                                  if (strCtrEditable == "1") {
                                      var styleEditable = "";
                                      if (tipoformato == "numeric" || tipoformato == "entero") {
                                          styleEditable = "solonumeros";
                                          objunformat = function (cellvalue, options, cell) {
                                              var val = $(cell).find("input").val();
                                              return HelperJS.Parse.Float(val);
                                          };
                                      }
                                      if (tipoformato == "decimal" || tipoformato == "numeric") {
                                          styleEditable = "solodecimal";
                                          objunformat = function (cellvalue, options, cell) {
                                             if(options.colModel.CantidadCaracteres){
                                                $(cell).find("input").attr("maxlength", options.colModel.CantidadCaracteres);
                                             }
                                           
                                              var val = $(cell).find("input").val();
                                              return HelperJS.Parse.Float(val);
                                          };
                                      }
                                      else {
                                          objunformat = function (cellvalue, options, cell) {
                                              $(cell).find("input").attr("maxlength", options.colModel.CantidadCaracteres);
                                              if(options.colModel.name == "CodigoRA"){
                                                 $(cell).find("input").addClass("soloalfanumerico");
                                              }
                                              var val = $(cell).find("input").val();
                                              return val;
                                          };
                                      }

                                      if (tipoformato == "date") {
                                            objunformat = function (cellvalue, options, cell) {
                                              $(cell).find("input").addClass("InputTEXT_04Fecha");
                                              $(cell).find("input").width("30%");
                                              //$(cell).find("input").css("font-size",'14px');

                                              var val = $(cell).find("input").val();

                                              ponerFechas(null,true);
                                             
                                              return val;
                                          };
                                      }
                                      if (tipoformato == "combobox") {
                                          objformater = function (cellvalue, options, rowObject) {
                                              var ngOptionsAtr = "";
                                              var ngDataVal = "";
                                              var ngRequired = "";
                                              var requerido = "";
                                              var ngMValmsg = "";
                                              var ngDatabind = "";
                                              var ngId = "";
                                              var ngName = "";
                                              var _strEventoChange = "";
                                              if (!(strEventoChange == undefined || strEventoChange == "")) {
                                                  _strEventoChange = ' ng-change="' + strEventoChange + '(' + attrs.modeldata + '[' + (options.rowId - 1) + ']' + ')"';
                                              }
                                              if (tipoDatos == "local") {
                                                  ngModelAtr = ' ng-model="' + attrs.modeldata + '[' + (options.rowId - 1) + '].' + options.colModel.name + '"';
                                                  ngOptionsAtr = ' ng-options="tipo.' + strValueMember + ' as tipo.' + strDisplayMember + ' for tipo in ' + strDataSource + '"';
                                                  ngDataVal = 'data-val="true"';
                                                  ngRequired = 'data-val-required="' + options.colModel.caption + ' es requerido."';
                                                  requerido = "required";
                                                  ngMValmsg = ' data-valmsg-for="' + attrs.modeldata + '[' + (options.rowId - 1) + '].' + options.colModel.name + '"';
                                                  ngDatabind = 'data-bind="value: ' + attrs.modeldata + '[' + (options.rowId - 1) + '].' + options.colModel.name + '"';
                                                  ngId = 'id="' + attrs.modeldata + '[' + (options.rowId - 1) + '].' + options.colModel.name + '"';
                                                  ngName = 'name="' + attrs.modeldata + '[' + (options.rowId - 1) + '].' + options.colModel.name + '"';
                                              }

                                              return '<div style="width:100%;height: 25px;">' + JqGridCrearSelect(rowObject.Importe, "width:100%", 'InputTEXT InputTEXT_JQGRID ' + styleEditable, ngModelAtr + _strEventoChange + ngOptionsAtr + ngDatabind + ngId + ngName + ngDataVal + ngRequired + requerido, strTextoComboSeleccione, options.colModel.MultipleSelect) +
                                                     '</div>' +
                                                      '<div class="caja11 msgerror ' + options.colModel.name + '">' +
                                                      '<span class="field-validation-valid msgerror" ' + ngMValmsg + 'data-valmsg-replace="true"></span>' +
                                                      '</div>';
                                          };
                                      }

                                      else {
                                          objformater = function (cellvalue, options, rowObject) {
                                              var ngDataVal = "";
                                              var ngRequired = "";
                                              var requerido = "";
                                              var ngMValmsg = "";
                                              var ngDatabind = "";
                                              var ngId = "";
                                              var ngName = "";
                                              ngDataVal = 'data-val="true"';
                                              ngRequired = 'data-val-required="' + options.colModel.caption + ' es requerido."';
                                              requerido = "required";
                                              ngMValmsg = ' data-valmsg-for="' + attrs.modeldata + '[' + (options.rowId - 1) + '].' + options.colModel.name + '"';
                                              ngDatabind = 'data-bind="value: ' + attrs.modeldata + '[' + (options.rowId - 1) + '].' + options.colModel.name + '"';
                                              ngId = 'id="' + attrs.modeldata + '[' + (options.rowId - 1) + '].' + options.colModel.name + '"';
                                              ngName = 'name="' + attrs.modeldata + '[' + (options.rowId - 1) + '].' + options.colModel.name + '"';
                                              var _strEventoChange = "";
                                              if (!(strEventoChange == undefined || strEventoChange == "")) {
                                                  _strEventoChange = ' ng-change="' + strEventoChange + '(' + attrs.modeldata + '[' + (options.rowId - 1) + ']' + ')"';
                                              }
                                              if (tipoDatos == "local") {
                                                  ngModelAtr = ' ng-model="' + attrs.modeldata + '[' + (options.rowId - 1) + '].' + options.colModel.name + '"';
                                              }
                                              return '<div style="width:100%;height: 25px;">' + JqGridCrearInput(rowObject.Importe, "width:100%", 'InputTEXT InputTEXT_JQGRID ' + styleEditable, ngModelAtr + _strEventoChange + ngDatabind + ngId + ngName + ngDataVal + ngRequired + requerido) +
                                                     '</div>' +
                                                      '<div class="caja11 msgerror ' + options.colModel.name + '">' +
                                                      '<span class="field-validation-valid msgerror" ' + ngMValmsg + 'data-valmsg-replace="true"></span>' +
                                                      '</div>';
                                          };
                                      }

                                  }
                                  else {
                                      if (tipoformato == "botonQuitar" || tipoformato == "botonEditar" || tipoformato == "botonQuitar" || tipoformato == "botonVerDetalle") {
                                          ancho = "110px";
                                          objformater = function (cellvalue, options, rowObject) {
                                              return scope.$parent.MiBoton(attrs.gridid, options.colModel.name, cellvalue, options, rowObject);
                                          };
                                      }
                                      else {

                                          if (tipoformato == "checkbox" || tipoformato == "checkboxSinCab") {
                                              if (tipoDatos == "local") {
                                                  ngModelAtr = ' ng-model="' + attrs.modeldata + '.Todo"';
                                              }
                                              strSortable = false;
                                              strEditable = true;

                                              if (tipoformato != "checkboxSinCab") {
                                                  strCaption = '<div>' + strCaption + '<input type="checkbox" style="width: 23px;" id="checkAll" ' + ngModelAtr + ' ng-click="$parent.checkBoxGrilla($event,\'' + attrs.gridid + '\')" /></div>';
                                              }
                                              strEdittype = 'checkbox';
                                              strEditoptions = { value: "True:False" };

                                              objformatoptions = {
                                                  disabled: false
                                              };
                                              objformater = "checkbox";
                                              if (tipoformato == "checkboxSinCab") {
                                                  objformater = "checkbox";
                                              }
                                              else {
                                                  if (tipoDatos == "local") {
                                                      objformater = function (cellvalue, options, rowObject) {
                                                          var ngModelAtr = '' + attrs.modeldata + '[' + (options.rowId - 1) + '].' + options.colModel.name + '';
                                                          var _strEventoClick = "";
                                                          if (!(strEventoClick == undefined || strEventoClick == "")) {
                                                              _strEventoClick = 'ng-change="' + strEventoClick + '(' + attrs.modeldata + '[' + (options.rowId - 1) + ']' + ')"';
                                                          }
                                                          var strCheck = '<div><input type="checkbox" style="width: 23px;" id="checkAll" ' + _strEventoClick + ' ng-model="' + ngModelAtr + '" /></div>';
                                                          return strCheck;
                                                      }
                                                      //objformater="checkbox";


                                                  }
                                                  else {
                                                      //remoto
                                                  }
                                              }
                                          }
                                          else {

                                              objunformat = function (cellvalue, options, cell) {
                                                  var val = "";
                                                  var ngModelAtr = "";
                                                  if (tipoDatos == "local") {
                                                      ngModelAtr = '' + attrs.modeldata + '[' + (options.rowId - 1) + '].' + options.colModel.name + '';
                                                      //eval(ngModelAtr+"='aaaa"+val+"';");
                                                      var objTooltip = ngModelAtr;
                                                      ngModelAtr = "{{" + ngModelAtr + "}}";
                                                      val = ngModelAtr;
                                                      $(cell).attr('tooltip-Nave', attrs.gridid);
                                                      $(cell).attr('objTooltip', objTooltip);
                                                      $(cell).html(ngModelAtr);
                                                  }
                                                  else {
                                                      //var ngModelAtr = '' + attrs.modeldata + '[' + (options.rowId - 1) + '].' + options.colModel.name + '';
                                                      //val = ngModelAtr;
                                                      $(cell).attr('tooltip-Nave', attrs.gridid);
                                                      val = $(cell).find("input").val();
                                                  }

                                                  return val;
                                              };


                                              if (tipoformato == "date") {
                                                  objformater = function (cellvalue, options, rowObject) {
                                                      if (cellvalue == '' || cellvalue == undefined || cellvalue == null) {
                                                          return '';
                                                      } else {
                                                          return cellvalue.substr(6, 2) + '/' + cellvalue.substr(4, 2) + '/' + cellvalue.substr(0, 4);
                                                      }
                                                  }
                                              }
                                              else {
                                                  if (tipoformato == "decimal" || tipoformato == "numeric") {
                                                      objformater = 'currency';
                                                      if (strNroDecimales == "" && tipoformato == "decimal") {
                                                          strNroDecimales = 2;
                                                      }
                                                      objformatoptions = { defaulValue: 0, thousandsSeparator: ' ', decimalPlaces: strNroDecimales, suffix: '' };
                                                  }
                                                  else {
                                                      //otras opciones
                                                  }

                                              }

                                          }
                                      }
                                  }
                                  if (strDirection == undefined || strDirection == null || strDirection == "") {
                                      if (tipoformato == "numeric" || tipoformato == "entero" || tipoformato == "integer" || tipoformato == "decimal") {
                                          objalign = "left";
                                      }
                                      else {
                                          if (tipoformato == "date") {
                                              objalign = "left";
                                          }
                                          else {
                                              objalign = "left";
                                          }
                                      }
                                  }

                                  if (objalign == "") {
                                      objalign = strDirection;
                                  }

                                  if (tipoDatos == "local" || objColumnasBackOffice[x].Parts.IdColumna == "Quitar"  || objColumnasBackOffice[x].Parts.IdColumna == "Editar" || objColumnasBackOffice[x].Parts.IdColumna == "Eliminar" || objColumnasBackOffice[x].Parts.IdColumna=="VerDetalle"){
                                      strSortable = false;
                                  }
                                  var objColumna = {
                                      name: objColumnasBackOffice[x].Parts.IdColumna,
                                      caption: strCaption,
                                      width: ancho,
                                      //formatter:  objformater,
                                      formatter: objformater,
                                      align: objalign,
                                      hidden: objhidden,
                                      key: objkey,
                                      edittype: strEdittype,
                                      editoptions: strEditoptions,
                                      sortable: strSortable,
                                      editable: strEditable,
                                      formatoptions: objformatoptions,
                                      editrules: objEditrules,
                                      unformat: objunformat,
                                      MultipleSelect: objColumnasBackOffice[x].Parts.MultipleSelect,
                                      CantidadCaracteres: objColumnasBackOffice[x].Parts.CantidadCaracteres

                                  }
                                  objCampos.push(objColumna);
                              });


                              var camposJqGrid = {
                                  Nombre: objGrilla.es_pe__Nombre,
                                  columnas: objCampos,
                                  NombreBotonExportar: objGrilla.NombreBotonExportar,
                                  NombreSinResultados: "NO SE ENCONTRAROS REGISTROS PARA MOSTRAR",
                              };
                              return camposJqGrid;

                          }
                          scope.getColumnasDeControl = function (idgrilla, tipoDatos) {
                              var objformulario = scope.$root.Formulario;
                              var lst = scope.getColumnasDeControl_aux(idgrilla, objformulario, tipoDatos);
                              if (lst.columnas.length == 0) {
                                  var objListaformularios = scope.$root.OtrosFormularios;
                                  if (objListaformularios != undefined) {
                                      for (i = 0; i < objListaformularios.length; i++) {
                                          lst = scope.getColumnasDeControl_aux(idgrilla, objListaformularios[i], tipoDatos);
                                          if (lst.columnas.length > 0) {
                                              break;
                                          }
                                      }
                                  }
                              }
                              return lst;
                          }
                          scope.GetAtributosGrid = function () {
                              var tipoDatos = "remoto";
                              if (attrs.urllistar == undefined || attrs.urllistar == "")
                                  tipoDatos = "local";
                              var objColumnasDeControl = scope.getColumnasDeControl(attrs.idgrilla, tipoDatos)

                              var tituloSinResultados = attrs.titulosinresultados;
                              if (tituloSinResultados == undefined) {
                                  tituloSinResultados = "NO HAY REGISTROS PARA MOSTRAR";
                              }

                              var _customButtons = new Array();
                              if (!(attrs.ocultarexportar == undefined || attrs.ocultarexportar == '' || attrs.ocultarexportar == "1") || tipoDatos == "remoto") {
                                  _customButtons.push(
                                  {
                                      caption: "Exportar",
                                      buttonicon: "ui-icon-print",
                                      onClickButton: function () {
                                          $("#" + attrs.gridid).doExportar(null, false, null);
                                      },
                                      position: "first"
                                  });
                              }
                              if (!(attrs.ngclickagregar == undefined || attrs.ngclickagregar == "")) {
                                  _customButtons.push(
                                  {
                                      id: "btnAgregar_" + attrs.gridid,
                                      caption: "Agregar",
                                      buttonicon: "ui-icon-document",
                                      position: "last"
                                  });
                              }

                              var paramjqGrid = {
                                  columnas: objColumnasDeControl.columnas,
                                  width: "100%",
                                  height: attrs.altogrilla,
                                  url: attrs.urllistar,
                                  tipoconexion: tipoDatos,
                                  loadAtStarup: false,
                                  NombreSinResultados: tituloSinResultados,
                                  pager: "#" + attrs.gridid + "_pager",
                                  beforeProcessing: function (data, status, xhr) {
                                      $("body").unblock();
                                      $("#" + attrs.gridid).desbloquear();
                                  },
                                  ondblClickRow: function (rowid, iRow, iCol, e) {
                                      try {
                                          scope.$parent.GrillaDblClick(this, attrs.idgrilla, rowid, iRow, iCol, e);
                                      }
                                      catch (everything)
                                      { }
                                  },
                                  customButtons: _customButtons,
                                  onSelectRow: function (rowid, iRow, iCol, e) {
                                     try {
                                      if (attrs.idgrilla == "084671D6-CB2C-441F-AC7F-9969B7019FBA" || attrs.idgrilla == "C3BE6E5E-EDD1-46D5-9531-5BD49F94A690") {
                                          scope.$parent.GrillaClick(this, attrs.idgrilla, rowid, iRow, iCol, e);
                                      };
                                        
                                      }
                                      catch (everything)
                                      { }
                                  },
                                  gridComplete: function () {

                                      var esRemoto = false;
                                      if (!(attrs.urllistar == "" || attrs.urllistar == undefined)) {
                                          esRemoto = true;
                                      }
                                      if (jQuery("#" + attrs.gridid).jqGrid('getGridParam', 'records') == 0 && esRemoto == true) {
                                          var NombreSinResultados = jQuery('#' + attrs.gridid).jqGrid('getGridParam', 'NombreSinResultados');
                                          if (NombreSinResultados != "") {
                                              $('#' + attrs.gridid).clearFilter(NombreSinResultados);
                                          }
                                      }
                                      else {
                                          $('#' + attrs.gridid).parents(".ui-jqgrid-bdiv").find(".msgnuay").hide();
                                      }

                                      if (jQuery('#' + attrs.gridid).jqGrid('getGridParam', 'selrow') == null && attrs.idmarcarprimerresgistro != 0) {
                                          var grid = jQuery("#" + attrs.gridid),
                                          ids = grid.jqGrid("getDataIDs");
                                          if (ids && ids.length > 0) {
                                              grid.jqGrid("setSelection", ids[attrs.idmarcarprimerresgistro - 1]);
                                          }
                                      }
                                      scope.api.acomodarGrillaVMobile(attrs.gridid, esRemoto);
                                      var rows = jQuery("#" + attrs.gridid).jqGrid('getRowData')
                                      for (i = 0; i < rows.length; i++) {
                                          if (rows[i]["EstadoEliminado"] == "1") {
                                              $("#" + (i + 1), "#" + attrs.gridid).css({ display: "none" });
                                          }
                                      }
                                      try {
                                          scope.$parent.CompleteJqGRid(attrs.gridid);
                                      }
                                      catch (everything)
                                      { }
                                      if (attrs.ngclickagregar != undefined) {
                                          $("#" + attrs.gridid + "_pager").find(".ui-pg-button").each(function (x) {
                                              if (attrs.ngclickagregar != undefined) {
                                                  if ($(this).attr("ng-click") == undefined) {
                                                      $(this).attr("ng-click", attrs.ngclickagregar);
                                                  }
                                              }
                                          });

                                      }
                                      scope.compilarGrilla("#" + attrs.gridid);
                                  }
                              };
                              if (attrs.urllistar == "" || attrs.urllistar == undefined) {
                                  if (scope.modeldata == null) {
                                      scope.modeldata = new Array();
                                  }
                                  paramjqGrid.datatype = "local";
                                  paramjqGrid.autowidth = false;
                                  paramjqGrid.modoSimple = true;
                                  paramjqGrid.showNoResultsMsg = false;
                                  paramjqGrid.columnaAutomatica = true;
                                  paramjqGrid.url = "/";
                                  paramjqGrid.data = scope.modeldata;
                                  paramjqGrid.loadAtStarup = false;
                              }
                              else {
                                  paramjqGrid.datatype = "jsonstring";
                                  var clavecolumna = attrs.clavecolumna;
                                  var mdata = GetArrayGridJson(1, scope.modeldata, clavecolumna);
                                  paramjqGrid.data = mdata;
                                  if (attrs.flgcargargrilla == "1") {
                                      paramjqGrid.loadAtStarup = true;
                                  }
                                  else {
                                      paramjqGrid.loadAtStarup = false;
                                  }
                              }
                              if (attrs.gridid) {
                                  paramjqGrid.pager = '#' + attrs.gridid + '_pager';
                                  var pager = angular.element(paramjqGrid.pager);
                                  if (pager.length == 0) {
                                      div = $("#" + attrs.gridid + "_pager");
                                  }
                              }
                              return paramjqGrid;
                          };
                          scope.GenerarGrilla = function () {
                              paramjqGrid = scope.GetAtributosGrid();
                              if (attrs.flgocultarbarrapaginado == '1') {
                                  paramjqGrid.modoSimple = true;
                                  $("#" + attrs.gridid + "_pager_center").css("display", "none")
                              }
                              $('#' + attrs.gridid).generarGrid(paramjqGrid);
                              
                          };
                          scope.vapi = function () {
                              var args = Array.prototype.slice.call(arguments, 0);
                              return table.jqGrid.apply(table, args);
                          };
                          scope.api = {
                              acomodarGrillaVMobile: function (IdGrilla, esRomoto) {
                                  if (IdGrilla == undefined) {
                                      IdGrilla = attrs.gridid;
                                  }
                                  var anchoventana = $(window).width();
                                  if (anchoventana <= 800) {
                                      var anchoSeccion = 900;
                                      var contColVisible = 0;
                                      $("#gbox_" + attrs.gridid).find("tr [role='columnheader']").each(function (x) {
                                          if (this.style.display != 'none') { contColVisible++; }
                                      });

                                      if (contColVisible <= 3) {
                                          anchoSeccion = $("#" + attrs.gridid).parent().parent().parent().parent().parent().parent().parent().width();
                                          $("#" + attrs.gridid).setGridWidth($("#" + attrs.gridid).parents(".block_content:first").width() - 10);
                                          $("#" + IdGrilla).width((anchoSeccion) + "px");
                                          $("#cabecera_" + IdGrilla).width(anchoSeccion + "px");
                                          $("#gbox_" + IdGrilla).find("tr [role='gridcell']").each(function (x) {
                                              if ($(this).width() > 100) {
                                                  $(this).css("width", "auto");
                                              }
                                          });
                                          $("#gbox_" + IdGrilla).find("tr [role='columnheader']").each(function (x) {
                                              if ($(this).width() > 100) {
                                                  $(this).css("width", "auto");
                                              }
                                          });

                                      }
                                      else {
                                          $("#" + attrs.gridid).setGridWidth($("#" + attrs.gridid).parents(".block_content:first").width() - 10);
                                          $("#" + IdGrilla).width("900px");
                                          $("#cabecera_" + IdGrilla).width("900px");
                                          $("#gbox_" + IdGrilla).find("tr [role='gridcell']").css("width", "auto");
                                          $("#gbox_" + IdGrilla).find("tr [role='columnheader']").css("width", "auto");
                                      }

                                      if ($("#" + IdGrilla + "_pager_center").css("display") != "none" && esRomoto == true) {
                                          $("#" + IdGrilla + "_pager_center").append($("#" + IdGrilla + "_pager_right").find("div"));
                                          $("#" + IdGrilla + "_pager_right").remove();
                                          $("#" + IdGrilla + "_pager_center").append($("#" + IdGrilla + "_pager_left").find("table"));
                                          $("#" + IdGrilla + "_pager_left").remove();
                                          $("#" + IdGrilla + "_pager_center").find("div").css("text-align", "center");
                                          $("#" + IdGrilla + "_pager").height("100%");
                                          $("#" + IdGrilla + "_pager").css('min-height', "20px");
                                      }
                                      else {
                                          //$("#"+IdGrilla+"_pager_center").remove();
                                          //$("#"+IdGrilla+"_pager_right").append($("#"+IdGrilla+"_pager_left").find("div"));
                                          //$("#"+IdGrilla+"_pager_right").find("div").css("text-align","center");
                                      }

                                  }
                                  else {
                                      $("#" + attrs.gridid).setGridWidth($("#" + attrs.gridid).parents(".block_content:first").width() - 10);
                                  }


                                  if ($("#" + attrs.gridid).width() < ($("#gview_" + attrs.gridid).width() + 5)) {
                                      $("#gview_" + attrs.gridid).find(".ui-jqgrid-bdiv").css("overflow-x", "hidden");
                                  }
                              },
                              ModificarGrid: function (idsufijo, idval1, idval2, idval3) {
                                  scope.$root["ModificarGrid" + idsufijo](idval1, idval2, idval3);
                              },
                              VerDetalleGrid: function (idsufijo, idval1, idval2, idval3) {
                                  scope.$root["VerDetalleGrid" + idsufijo](idval1, idval2, idval3);
                              },
                              ConfigurarGrid: function (idsufijo, idval1, idval2, idval3) {
                                  scope.$root["ConfigurarGrid" + idsufijo](idval1, idval2, idval3);
                              },
                              ResponsableGrid: function (idsufijo, idval1, idval2, idval3) {
                                  scope.$root["ResponsableGrid" + idsufijo](idval1, idval2, idval3);
                              },
                              AsignarGrid: function (idsufijo, idval1, idval2, idval3) {
                                  scope.$root["AsignarGrid" + idsufijo](idval1, idval2, idval3);
                              },
                              EliminarGrid: function (idsufijo, idval1, idval2, idval3, nameid1) {
                                  scope.$root["EliminarGrid" + idsufijo](idval1, idval2, idval3, nameid1);
                              },
                              insertRange: function (rows) {
                                  if (rows) {
                                      if (scope.modeldata == null) {
                                          scope.modeldata = new Array();
                                      }
                                      for (var i = 0; i < rows.length; i++) {
                                          scope.modeldata.push(rows[i]);
                                      }
                                      //var clavecolumna = table.parent().parent().parent().parent().parent().attr("clavecolumna");
                                      //var newrows = scope.modeldata;//GetArrayGridJson(1,scope.modeldata,clavecolumna);
                                      //table.jqGrid('setGridParam', { data: newrows }).trigger('reloadGrid');
                                      this.refresh(scope.modeldata);
                                  }
                              },
                              addrow: function (row, valorclave) {
                                  if (scope.modeldata == null || scope.modeldata == undefined) {
                                      scope.modeldata = new Array();
                                  }
                                  scope.modeldata.push(row);
                                  table.addRowData(valorclave, row);
                              },
                              updaterow: function (row, nombreobjclave, valorclave) {

                                  for (i = 0; i < scope.modeldata.length; i++) {
                                      if (scope.modeldata[i][nombreobjclave] == valorclave) {
                                          scope.modeldata[i] = row;
                                          break;
                                      }
                                  }
                                  this.refresh();

                              },
                              deleterow: function (nombreobjclave, valorclave) {

                                  for (i = 0; i < scope.modeldata.length; i++) {
                                      if (scope.modeldata[i][nombreobjclave] == valorclave) {
                                          scope.modeldata[i].EstadoEditado = '1';
                                          scope.modeldata[i].EstadoEliminado = '1';
                                          break;
                                      }
                                  }
                                  this.refresh();

                              },
                              clear: function () {
                                  if (scope.modeldata == null) {
                                      scope.modeldata = new Array();
                                  }
                                  scope.modeldata.length = 0;
                                  table.jqGrid('clearGridData', { data: scope.modeldata }).trigger('reloadGrid');
                              },
                              remove: function (rowid) {
                                  if (scope.modeldata == null) {
                                      scope.modeldata = new Array();
                                  }
                                  table.delRowData(rowid);
                              },
                              refresh: function (data) {

                                  if (!(data == undefined || data == null)) {
                                      scope.modeldata = data;
                                  }
                                  if (scope.modeldata == null) {
                                      scope.modeldata = new Array();
                                  }
                                  var _paramgrid = scope.GetAtributosGrid();
                                  //var _paramgrid=jQuery('#'+attrs.gridid).jqGrid('getGridParam','');
                                  _paramgrid.data = scope.modeldata;
                                  $('#' + attrs.gridid).generarGrid(_paramgrid);
                              },
                              find: function (datos) {
                                  table.setFilter(datos);
                              },
                          };
                          $timeout(function () {
                              scope.refreshgrilla();
                          });
                          scope.compilarGrilla = function (Id) {
                                                          $(Id).find('td[role=gridcell]').each(function (x) {
                                  if ($(this).find("td[role=gridcell],input,button,select,textarea").length > 0) {

                                      if (!($(this).find("td[role=gridcell],input,button,select,textarea").hasClass("ng-scope") || $(this).find("td[role=gridcell],input,button,select,textarea").hasClass("ng-pristine"))) {
                                          $compile($(this))(scope);
                                      }
                                      else {
                                          ;
                                      }
                                  }
                                  else {
                                      if (!($(this).hasClass("ng-scope"))) {
                                          $compile($(this))(scope);
                                          miBlock(false, "html");
                                      }
                                      else {
                                          ;
                                      }
                                  }
                              });

                              $(Id.replace("#", "#gview_")).find('.ui-jqgrid-hbox').each(function (x) {

                                  if ($(this).find("td[role=gridcell],input,button,select,textarea").length > 0) {
                                      if (!($(this).find("td[role=gridcell],input,button,select,textarea").hasClass("ng-scope") || $(this).find("td[role=gridcell],input,button,select,textarea").hasClass("ng-pristine"))) {
                                          $compile($(this))(scope);
                                      }
                                      else {
                                          //debugger;
                                          ;
                                      }
                                  }
                                  else {
                                      if (!($(this).hasClass("ng-scope"))) {
                                          $compile($(this))(scope);
                                      }
                                      else {
                                          //debugger;
                                          ;
                                      }
                                  }
                              });
                         
                          }
                          scope.GenerarGrilla();
                          scope.refreshgrilla = function () {
                              var FlgCargarGrilla = attrs.flgcargargrilla
                              var idFormulario = attrs.idformulario;
                              $compile($("#" + attrs.gridid + "_pager"))(scope);
                          };
                      });
                  }
              };
          }]);
})();