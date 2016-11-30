
(function ($) {
    jQuery.jgrid.fluid =
    {
        fluidGrid: function (options) {
            var grid = $(this);
            var settings = $.extend(
                              {
                                  example: grid.closest('.ui-jqgrid').parent(),
                                  offset: 0
                              }, options || {});
            pr = $(settings.example).css("padding-right").split("px").join("") * -1;
            pl = $(settings.example).css("padding-left").split("px").join("") * -1;
            ml = $(settings.example).css("margin-left").split("px").join("") * -1;
            mr = $(settings.example).css("margin-right").split("px").join("") * -1;
            bwl = $(settings.example).css("border-left-width").split("px").join("") * -1;
            bwr = $(settings.example).css("border-right-width").split("px").join("") * -1;
            os = 0;

            if ($(settings.example).hasClass("block_content") && $(settings.example).parent().hasClass("forms2")) {
                os = -1;
            }
            /*if ($(settings.example).hasClass("block_content") && $(settings.example).parents(".block_content").length>0) {
                os += -1;
                
            }*/

            var width = $(settings.example).innerWidth() + settings.offset + pr + pl + bwl + bwr + os;
            grid.setGridWidth(width);
        }
    }
})(jQuery);
jQuery.fn.extend({ fluidGrid: jQuery.jgrid.fluid.fluidGrid });

function jqGrid_aspnet_loadErrorHandler(xht, st, handler) {
    jQuery(document.body).css('font-size', '100%');
    jQuery(document.body).html(xht.responseText);
};

//EXTENSIONES DE JQGRID
$.fn.generarGrid = function (paramsor) {
    paramsOriginal = {
        width: '100%',
        height: '100%',//height: 200,
        subgrid: null,
        rowNum: 10,
        ocultarexportar: "0",
        modoSimple: false,
        autowidth: true,
        paginacion: {
            "edit": false,
            "add": false,
            "del": false,
            "search": false,
            "refresh": false,
            "view": false,
            "position": "left",
            "cloneToTop": true
        },
        autoencode: true
    };

    paramsor = $.extend(paramsOriginal, paramsor);
    if (paramsor.modoSimple == true) {
        if (paramsor.rowNum == 10) {
            paramsor.rowNum = 9999999;
        }
    }

    plantilla = {
        loadAtStarup: true,
        autowidth: true,
        url: '',
        editurl: '',
        mtype: 'GET',
        datatype: 'json',
        page: 1,
        NombreSinResultados: "BÚSQUEDA SIN RESULTADOS",
        columnaAutomatica: false,
        showNoResultsMsg: true,
        viewrecords: true,
        scrollrows: false,
        headertitles: true,
        pager: jQuery('#dgv1_pager'),
        /*INICIO SUBGRID*/
        /*subGrid: true,
        subGridOptions: { "reloadOnExpand": false },
        subGridRowExpanded: showjqgSubGrid,*/
        /*FIN SUBGRID*/
        /*INICIO NET*/
        loadError: jqGrid_aspnet_loadErrorHandler,
        hoverrows: false,
        /*FIN NET*/
        rowNum: numfilas,
        rowList: [10, 20, 30],
        prmNames: { id: null },
        jsonReader: { id: null },
        //getSelected:
        btnSelected: null,
        /*INICIO FORMULARIOS*/
        editDialogOptions: {
            "recreateForm": true,
            errorTextFormat: function (data) {
                return 'Error: ' + data.responseText
            },
            editData: {
                __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val()
            }
        },
        addDialogOptions: {
            "recreateForm": true,
            errorTextFormat: function (data) {
                return 'Error: ' + data.responseText
            },
            editData: {
                __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val()
            }
        },
        delDialogOptions: {
            "recreateForm": true,
            errorTextFormat: function (data) {
                return 'Error: ' + data.responseText
            },
            delData: {
                __RequestVerificationToken: $('input[name=__RequestVerificationToken]').val()
            }
        },
        searchDialogOptions: {
            "resize": false,
            "recreateForm": true
        },
        /*FIN FORMULARIOS*/
        sortorder: 'asc',
        //width: '100%',
        height: '100%',
        viewsortcols: [false, 'vertical', true]
    };
    plantillaColumna = {
        //"width": 150,
        //"key": false
        name: "",
        width: "",
        caption: "",
        hidden: "",
        formatter: null
    };

    llenarValores = function (params, obj, parentRowID) {

        var auxplantilla = $.extend(plantilla, params);
        if (auxplantilla["url"] == undefined)
            auxplantilla["url"] = '';
        if (params["url"] == undefined)
            params["url"] = '';

        if ($.isFunction(params["beforeProcessing"])) {
            auxplantilla["beforeProcessing"] = params["beforeProcessing"];
        }
        //setear urls

        if (parentRowID !== null && parentRowID !== undefined) {
            parentRowID = "parentRowID=" + parentRowID;
            auxplantilla["url"] = params["url"] + (params["url"].indexOf("?") >= 0 ? "&" + parentRowID : "?" + parentRowID);
            auxplantilla["editurl"] = "?jqGridID=" + params["name"] + "&editMode=1&" + parentRowID;
        }
        else {
            parentRowID = "";
            auxplantilla["url"] = params["url"] + (params["url"].indexOf("?") >= 0 ? "&" : "?") + "jqGridID=" + $(obj).attr("id") + "&IdGrilla=" + $(obj).parent().attr("idgrilla");
            if (params["loadAtStarup"] === true || params["loadAtStarup"] === null || params["loadAtStarup"] === undefined) {
                //CARGA NORMAL

                //cargas la data por ajax
                //procesas columnas
                //cambias el datatype de local a jsonstring
                //seteas nuevamente la url de ahi arriba ↑
                //

            }
            else {
                //carga sin datos
                //auxplantilla["datatype"] = "local";
                //jQuery(obj).jqGrid('setGridParam', { "datatype": "local" });//.trigger("reloadGrid");
            }
            auxplantilla["editurl"] = "?jqGridID=" + $(obj).attr("id") + "&editMode=1";
        }

        //columnas
        var ftts = new Array();
        auxplantilla["colNames"] = new Array();
        auxplantilla["colModel"] = new Array();
        //if (auxplantilla["data"] != null && auxplantilla["columnaAutomatica"] == true) {
        //    var auxColModel = new Array();
        //    var esprimero = true;
        //    $.each(auxplantilla["data"][0], function (index, values) {
        //        auxColModel.push({ name: index, caption: index, key: esprimero });
        //        esprimero = false;
        //    });
        //    auxplantilla["colModel"] = auxColModel;
        //}

        auxplantilla["colModel"] = $.extend(auxplantilla["colModel"], params["columnas"]);

        for (ccm = 0; ccm < auxplantilla["colModel"].length; ccm++) {
            try {
                if (auxplantilla["colModel"][ccm]["width"].indexOf("%") == -1)
                    auxplantilla["colModel"][ccm]["fixed"] = true;
            } catch (e) { }
        }

        $.each(params["columnas"], function (index, values) {
            if (values === undefined)
                return;
            //auxplantilla["colNames"].push(value["caption"] !== null ? value["caption"] : value["name"]);
            auxplantilla["colNames"].push(values["caption"] !== null ? values["caption"] : values["name"]);
            //deberia ordenar pero en modo local
            /*if (auxplantilla["modoSimple"] == true) {
                auxplantilla["colModel"][index]["sortable"] = false;
            }*/
            if (values["key"] !== null && values["key"] !== undefined) {
                //auxcolmodel["key"] = values["key"];
                if (values["key"] === true) {
                    auxplantilla["prmNames"]["id"] = values["name"];
                    auxplantilla["jsonReader"]["id"] = values["name"];
                }
            }
        });
        //auxplantilla["colModel"] = auxcolmodel;
        //paginador
        //auxplantilla["pager"] = jQuery(params["pager"])
        if (params["width"] !== null && params["width"] !== undefined)
            auxplantilla["width"] = params["width"];
        if (params["height"] !== null && params["height"] !== undefined)
            auxplantilla["height"] = params["height"];
        //subgrid
        if (params["subgrid"] !== null && params["subgrid"] !== undefined) {
            auxplantilla["subGrid"] = true;
            auxplantilla["subGridOptions"] = { "reloadOnExpand": false };
        }
        else {
            auxplantilla["subGrid"] = false;
            auxplantilla["subGridOptions"] = null;
        }
        /********************************************/
        if (!auxplantilla["modoSimple"]) {
            auxplantilla["onPaging"] = function (boton) {
                grid = $(this).parents(".ui-jqgrid");
                id = $(this).attr("id");
                pags = grid.find("#sp_1_" + id + "_pager").text();
                pag = grid.find(".ui-pg-input").val();
                if (pags <= pag) {
                    if (boton == "next_" + id + "_pager") {
                        if (pag >= pags)
                            return false;
                    }

                    if (!$("#" + boton).hasClass("ui-state-disabled")) {
                        $(obj).bloquear("Cargando...");
                        return true;
                    } else {
                        return false;
                    }
                }
                else
                    return false;
            }

            auxplantilla["onSortCol"] = auxplantilla["onPaging"];
        }
        else {
            auxplantilla["onPaging"] = function () {
                console.log("O");
                return false;
            };
            auxplantilla["onSortCol"] = auxplantilla["onPaging"];
            auxplantilla["datatype"] = "local";
        }
        auxplantilla["loadComplete"] = function (data) {
            //if (auxplantilla.columnaAutomatica == true) {
            //    if (data === null || data === undefined) {
            //        data = paramsOriginal.data;
            //    }
            //}

            if (data == null || data == undefined) {
                data = auxplantilla["data"];
            }

            if ($("#sp_1_" + this.id.split("#").join("") + "_pager").text() == "0") {
                $("#sp_1_" + this.id.split("#").join("") + "_pager").text("1");
            }

            if ($.isFunction(auxplantilla["onLoadComplete"])) {
                auxfun = auxplantilla["onLoadComplete"];
                auxfun.call(data);
            }

            if (data !== undefined && data !== null) {
                if (auxplantilla["columnaAutomatica"] == true) {
                    $(obj).desbloquear();
                }
                else if (data.error !== null && data.error !== undefined) {
                    $(obj).bloquear();
                }
                else {
                    if (!$.isArray(data)) {
                        if (data.rows) {
                            if (data.rows.length > 0) {
                                $(obj).desbloquear();
                                //$(obj).prev().find(".msgnuay").hide();//.fadeOut(1, function () { });
                                //$(obj).prev().find(".msgnuay div").effect("explode", {}, 500, function () { });
                                $(obj).parents(".ui-jqgrid-bdiv").find(".msgnuay").hide();
                            }
                            else {
                                $(obj).bloquear();

                                if (auxplantilla["showNoResultsMsg"] == true) {
                                    //$(obj).clearFilter(auxplantilla["NombreSinResultados"]);
                                }
                            }
                        }
                        else {
                            $(obj).bloquear();

                            if (auxplantilla["showNoResultsMsg"] == true) {
                                //$(obj).clearFilter(auxplantilla["NombreSinResultados"]);
                            }
                        }
                    }
                    else {
                        if (data.length > 0) {
                            $(obj).desbloquear();
                            //$(obj).prev().find(".msgnuay").hide();//.fadeOut(1, function () { });
                            //$(obj).prev().find(".msgnuay div").effect("explode", {}, 500, function () { });
                            $(obj).parents(".ui-jqgrid-bdiv").find(".msgnuay").hide();
                        }
                        else {
                            $(obj).bloquear();

                            if (auxplantilla["showNoResultsMsg"] == true) {
                                //$(obj).clearFilter(auxplantilla["NombreSinResultados"]);
                            }
                        }

                    }


                }
            }
            else {
                /*$(obj).desbloquear();
                $(obj).prev().html('<div class="msgnuay"><div>No hay registros para mostrar</div></div>');
                $(obj).prev().find(".msgnuay").fadeIn(450, function () { });*/
                $(obj).clearFilter();
            }
        }
        /********************************************/
        //if (auxplantilla["btnSelected"] !== null && auxplantilla["btnSelected"] !== undefined) {
        seleccion = function () {
            var id = jQuery(obj).jqGrid('getGridParam', 'selrow');
            if (id) {
                var ret = jQuery(obj).jqGrid('getRowData', id);
                if ($.isFunction(auxplantilla["getSelected"])) {
                    var auxfun = auxplantilla["getSelected"];
                    auxfun.call(ret);
                }
            } else {
                alert("Seleccione una fila");
            }
        };
        if (auxplantilla["btnSelected"]) {
            $(auxplantilla["btnSelected"]).click(seleccion);
            //antes esta linea estaba fuera del IF
            auxplantilla["onSelectRow"] = seleccion;
        }
        //}
        return auxplantilla;
    }

    hacerGrid = function (params, obj) {
        var subgridname = "";
        ajustarGrid = function () {
            /*ancho1 = $(obj).parents(".block_content").parents(".block_content").width();
            ancho2 = $(obj).parents(".block_content").width();
            if (ancho1 == null || ancho2 > ancho1)
                ancho = ancho2;
            else
                ancho = ancho1;
            if (ancho > 100)
                $(obj).setGridWidth(ancho);
            else
                setTimeout(ajustarGrid, 1000);*/
            $(obj).fluidGrid({ /*example: "#grid_wrapper",*/ offset: 0 });
        }
        funsubgrid = function (subgrid_id, row_id, message, suffix) {
            var subgrid_table_id, pager_id;
            subgrid_table_id = subgrid_id + '_t';
            pager_id = 'p_' + subgrid_table_id;
            if (suffix) { subgrid_table_id += suffix; pager_id += suffix; }
            if (message) jQuery('#' + subgrid_id).append(message);
            var valoressub = llenarValores(params["subgrid"], params["subgrid"]["name"], row_id);

            valoressub["url"] += "&parentRowID=" + row_id;
            valoressub["editurl"] += "&parentRowID=" + row_id;

            jQuery('#' + subgrid_id).append('<table id=' + subgrid_table_id + ' class=scroll></table><div id=' + pager_id + ' class=scroll></div>');
            jQuery('#' + subgrid_table_id).jqGrid(valoressub).bindKeys();
        }

        var valores = llenarValores(params, obj);

        if (params["subgrid"] !== null)
            valores["subGridRowExpanded"] = funsubgrid;
        //subgridname = params["subgrid"]["name"];

        if (params["modoSimple"]) {
            valores.rowList = [];
            valores.pgbuttons = false;
            valores.pgtext = null;
            valores.viewrecords = false;
        }

        $(obj).jqGrid(valores).navGrid(params["pager"], params["paginacion"],
            jQuery(params["pager"]).getGridParam('editDialogOptions'),
            jQuery(params["pager"]).getGridParam('addDialogOptions'),
            jQuery(params["pager"]).getGridParam('delDialogOptions'),
            jQuery(params["pager"]).getGridParam('searchDialogOptions')
        ).bindKeys();



        if (params["autowidth"] === true || params["autowidth"] === undefined) {
            $(window).resize(function () {
                var ancho = $(obj).parents(".ui-jqgrid:first").parent().innerWidth();
                if (ancho > 10) {
                    $(obj).setGridWidth(ancho);
                }
            });
            $(window).resize();
        }

        if (params["ondblClickRow"] !== null && params["ondblClickRow"] !== undefined)
            $(obj).addClass("filasPointer");

        //ajustarGrid();
        $(obj).parents(".ui-jqgrid").find("table:first").attr("id", "cabecera_" + $(obj).attr("id"));
        //$(obj).parents(".ui-jqgrid").find("table:first").width(obj[0].style.width);
        //$(obj).parents(".ui-jqgrid").find("table:first").find

        //$(obj).parents(".ui-jqgrid").find("table:last").attr("id", "cuerpo_" + valores["name"]);
        if (params["customButtons"] !== null && params["customButtons"] !== undefined) {
            if (params["ocultarexportar"] != "1") {
                if (jQuery("#" + $(obj).attr("id") + "_pager").find(".ui-pg-div").length == 0) {
                    $.each(params["customButtons"], function (key, value) {
                        jQuery(obj).navGrid(params["pager"], { edit: false, add: false, del: false, search: false, refresh: false })
                            .jqGrid('navButtonAdd', params["pager"], value);
                    })
                }
            }
        }
        if (params["loadAtStarup"] === true || params["loadAtStarup"] === null || params["loadAtStarup"] === undefined) {
            //CARGA NORMAL
        }
        else {
            //carga sin datos
            if (params.datatype !== "local") {
                jQuery(obj).jqGrid('setGridParam', { "datatype": "json" });//.trigger("reloadGrid");
            }
            if (params["data"] !== null && params["data"] !== undefined) {
                $(obj)[0].addJSONData(params["data"]);
            } else {
                m_id = $(obj).attr("id");
                $(obj).parents(".ui-jqgrid").find("#next_" + m_id + "_pager, #last_" + m_id + "_pager").addClass("ui-state-disabled");
            }
            $(obj).desbloquear();

        }
        /*if ($(obj).data("urlonload") !== null && $(obj).data("urlonload") !== undefined && $(obj).data("urlonload") !== true) {
            jQuery(obj).jqGrid('setGridParam', { "url": $(obj).data("urlonload") })
        }*/
        if ($.isFunction(params["beforeProcessing2"])) {
            auxfun = params["beforeProcessing2"];
            auxfun.call(params["data"]);
        }
    }
    hacerGrid(paramsor, this)

};

$.jgrid.extend({
    setFilter: function (params) {
        var paramfinal = {};
        //si la data antigua ya no tiene valor se mapea vacio


        var dataNueva = "";
        var dataAntigua = "";
        var paramsAntiguo = $(this).jqGrid("getGridParam", "postData");

        $.each(paramsAntiguo, function (key, value) {
            var datax = paramsAntiguo[key];
            if (typeof (datax) == "object") {
                $.each(datax, function (key1, value1) {
                    var datay = paramsAntiguo[key][key1];
                    if (typeof (datay) == "object" && datay != null) {
                        $.each(datay, function (key2, value2) {
                            var dataz = paramsAntiguo[key][key1][key2];
                            //
                            dataNueva = params[key][key1][key2];

                            if (params[key] != undefined) {
                                if (params[key][key1] != undefined) {
                                    if (dataNueva == undefined || dataNueva == null) {
                                        params[key][key1][key2] = "";
                                    }
                                }
                            }
                        });
                    }
                    else {
                        //
                        if (params[key] != undefined) {
                            dataNueva = params[key][key1];
                            if (dataNueva == undefined || dataNueva == null) {
                                params[key][key1] = "";
                            }
                        }
                    }
                });
            }
            else {
                //
                dataNueva = params[key];
                if (dataNueva == undefined || dataNueva == null) {
                    params[key] = "";
                }
            }
        });
        //


        $.each(params, function (key, value) {
            if (!(key === "PaginacionDTO" || key === "paginacionDTO")) {
                paramfinal[key] = value;
            }
        });

        cad = '&filter=1';
        //formando la cadena:
        $.each(paramfinal, function (key, value) {
            if (typeof (encodeURIComponent(value)) !== "object") {
                cad += '&' + key + '=' + encodeURIComponent(value);
            }
        });

        cad = cad.substr(1, cad.length);
        url = $(this).jqGrid("getGridParam", "url");

        if ($(this).data("url") === undefined) {
            $(this).data("url", url)
        }
        else
            url = $(this).data("url");

        //url += (url.indexOf("?") >= 0 ? "&" : "?") + cad;
        //, datatype: 'JSON', postData: params 

        var pd = (paramfinal);
        var headers = {};

        headers['__RequestVerificationToken'] = $('[name= "__RequestVerificationToken"]').val();
        headers['Content-Type'] = "application/json";

        jQuery(this).jqGrid('setGridParam', {
            "url": url,
            "page": 1, headers: headers,
            datatype: "json",
            mtype: 'POST',
            postData: pd
        }).trigger("reloadGrid");
        jQuery(this).desbloquear();
        return this;
    },
    clearFilter: function (msg) {

        if (msg == null || msg == undefined)
            msg = "No hay registros para mostrar";
        //borro los resultados actuales
        if ($(this).data("url") !== undefined)
            jQuery(this).jqGrid('setGridParam', { "url": $(this).data("url") });//.trigger("reloadGrid");
        $(this).removeData("url");
        $(this).find("tbody tr:not(.jqgfirstrow)").remove();
        //borro la paginacion actual
        pager = $("#dgvClientes").getGridParam("pager");
        $(pager).find(".ui-pg-input").val("1");
        $(pager).find(".ui-pg-input").next().html("1");
        $(pager).find(".ui-pg-selbox").val(numfilas);
        $(pager).find(".ui-icon-seek-first, .ui-icon-seek-prev, .ui-icon-seek-next, .ui-icon-seek-end").parent().addClass("ui-state-disabled");
        //bloqueo
        var topDistancia = 50;
        var alto = this.parent().parent()[0].style.height;

        if (alto != undefined && alto != 0 && alto != "") {
            alto = alto.replace("px", "")
            topDistancia = (parseFloat(alto) / 2) - 14;
        }
        $(this).parents(".ui-jqgrid-bdiv .msgnuay").remove();
        $(this).parents(".ui-jqgrid-bdiv").append('<div class="msgnuay"><div>' + msg + '</div></div>');
        //$(this).parents(".ui-jqgrid-bdiv").find(".msgnuay").fadeIn(450, function () { });
        $(this).bloquear();
        return this;
    },
    bloquear: function (msg) {
        if (msg === null || msg === undefined) {
            msg = null;
        }
        $(this).parents(".ui-jqgrid:first").block({
            message: msg,
            css: {
                background: "#fff",
                cursor: "default"
            },
            overlayCSS: {
                background: "rgba(255,255,255,0.15)",
                cursor: "default"
            }
        });
    },
    desbloquear: function () {
       $(this).parents(".ui-jqgrid:first").unblock();
    },
    getGridRow: function () {
        var id = jQuery(this).jqGrid('getGridParam', 'selrow');
        if (id) {
            var ret = jQuery(this).jqGrid('getRowData', id);
            return ret;
        } else {
            alert("Seleccione una fila3");
            return false;
        }
    },
    doExportar: function (urlToExport) {
        var url = "";
        if (urlToExport === undefined || urlToExport === null)
            url = jQuery(this).jqGrid('getGridParam', 'url');
        else
            url = urlToExport;
        url += (url.indexOf("?") >= 0 ? "&" : "?") + "export=1&HabilitarPaginacion=false";
        var postData = jQuery(this).jqGrid('getGridParam', 'postData');
        var strpostData = encodeURI(JSON.stringify(postData));
        url = url + "&requestExportar=" + strpostData;

        var nombre = jQuery(this).attr("id");
        if ($("#export_" + nombre).length > 0) {
            $("#export_" + nombre).remove();
        }
        if ($("#export_" + nombre).length === 0) {
            var el = document.createElement("iframe");
            document.body.appendChild(el);
            $(el).hide();
            $(el).attr("id", "export_" + nombre);
        }
        $(el).attr("src", url);
    },
    setPagina: function (datos, url) {
        /*if(url===undefined || url===null)
            pasarARemoto=true;
        $(this)[0].addJSONData(data);
        $(this).parents(".ui-jqgrid-bdiv").find(".msgnuay").hide();
        $(this).desbloquear();
        if(pasarARemoto){
            jQuery(this).jqGrid('setGridParam', { 
                "datatype": "json",
                "url":url
            });
        }*/
        $(this).jqGrid('setGridParam', { data: datos, datatype: "local" });
        $(this)[0].grid.endReq();
        $(this).trigger('reloadGrid');
    },
    setPagina2: function (data, url) {
        if (url === undefined || url === null)
            pasarARemoto = true;
        $(this)[0].addJSONData(data);
        $(this).parents(".ui-jqgrid-bdiv").find(".msgnuay").hide();
        $(this).desbloquear();
        if (pasarARemoto) {
            jQuery(this).jqGrid('setGridParam', {
                "datatype": "json",
                "url": url
            });
        }
    }

});