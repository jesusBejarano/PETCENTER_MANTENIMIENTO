

function JqGridCrearInput(rowObjectValue, mistyle, miclass, propiedad) {
    var salida = "";
    try {
        var mstyle = "";
        var mcssclass = "";
        if (!(mistyle == null || mistyle == "")) {
            mstyle = 'style="' + mistyle + '"';
        }
        if (!(miclass == null || miclass == "")) {
            mcssclass = 'class="' + miclass + '"';
        }
        if (rowObjectValue == null)
            rowObjectValue = "";

        var propied = "";
        if (!(propiedad == null || propiedad == "")) {
            propied = propiedad;
        }

        salida = '<input ' + propied + ' type="text" ' + mstyle + ' ' + mcssclass + ' value="' + rowObjectValue + '" style="width:98%"/>';
    }
    catch (everything) {
        salida = "";
    }

    return salida;
}
function JqGridCrearSelect(rowObjectValue, mistyle, miclass, propiedad, textoSeleccioneDefault, MultipleSelect) {
    var salida = "";
    try {
        var mstyle = "";
        var mcssclass = "";
        if (!(mistyle == null || mistyle == "")) {
            mstyle = 'style="' + mistyle + '"';
        }
        if (!(miclass == null || miclass == "")) {
            mcssclass = 'class="' + miclass + '"';
        }
        if (rowObjectValue == null)
            rowObjectValue = "";

        var propied = "";
        if (!(propiedad == null || propiedad == "")) {
            propied = propiedad;
        }
        var strOpcionSeleccione = "";
        if (!(textoSeleccioneDefault == undefined || textoSeleccioneDefault == "")) {
            strOpcionSeleccione = '<option value="">' + textoSeleccioneDefault + '</option>';
        }
        if (MultipleSelect == "1") {
            salida = '<select multiple="multiple"' + propied + ' ' + mstyle + ' ' + mcssclass + ' value="' + rowObjectValue + '" >' + strOpcionSeleccione + '</select>';
        } else {
            salida = '<select ' + propied + ' ' + mstyle + ' ' + mcssclass + ' value="' + rowObjectValue + '" >' + strOpcionSeleccione + '</select>';
        }

    }
    catch (everything) {
        salida = "";
    }

    return salida;
}



function Redondear(valor, dec) {
    var salida = valor;
    if (valor !== null) {
        if (valor !== "") {
            var num = valor;
            num = num * Math.pow(10, dec);
            num = Math.round(num);
            num = num / Math.pow(10, dec);
            salida = new String(num);
        }
    }
    return salida;
}
function RedondearDec(valor, dec) {
    var salida = valor;
    if (valor !== null) {
        if (valor !== "") {
            var num = valor;
            num = num * Math.pow(10, dec);
            num = Math.round(num);
            num = num / Math.pow(10, dec);
            salida = num;
        }
    }
    return salida;
}
function checkBoxGrillaItem(obj, nameGrilla) {
    var nombreColumna = obj.parentElement.getAttribute('aria-describedby');
    if (nombreColumna == "ResultadoBuscarLiberacion_FlagThc") {
        var rowIndex = obj.parentElement.parentElement.id;
        var rows = jQuery("#" + nameGrilla).jqGrid('getRowData');
        var rowObject = rows[rowIndex - 1];

        var idsCheksAlmacenado = JSON.parse(sessionStorage.getItem("ResultadoBuscarLiberacion"));
        if (idsCheksAlmacenado != null) {
            var objItem = $from(idsCheksAlmacenado).where("$CodigoNave=='" + rowObject.CodigoNave + "'&&$NumeroViaje=='" + rowObject.NumeroViaje + "'&&$PuertoOrigen=='" + rowObject.PuertoOrigen + "'&&$PuertoDestino=='" + rowObject.PuertoDestino + "'&&$PuertoEmbarque=='" + rowObject.PuertoEmbarque + "'&&$DestinoFinal=='" + rowObject.DestinoFinal + "'&&$CodigoLinea=='" + rowObject.CodigoLinea + "'&&$NumeroBL=='" + rowObject.NumeroBL + "'").firstOrDefault();
            if (objItem != undefined) {
                objItem.FlagThc = (obj.checked ? "True" : "False");
                sessionStorage.setItem(nameGrilla, JSON.stringify(idsCheksAlmacenado));
            }
        }
    }
}
function checkBoxGrillaSelectItem(obj, tipo, RowIndex, nameGrilla) {

    if (tipo == "Liberar") {

        var rows = jQuery("#" + nameGrilla).jqGrid('getRowData');
        var objFila = rows[RowIndex];

        var check = obj.checked;
        var ids = new Array();
        ids.push("CodigoNave");
        ids.push("NumeroViaje");
        ids.push("PuertoOrigen");
        ids.push("PuertoDestino");
        ids.push("PuertoEmbarque");
        ids.push("DestinoFinal");
        ids.push("CodigoLinea");
        ids.push("NumeroBL");
        //no PK
        var paramAdicional = new Array();
        paramAdicional.push("TipoBL");
        paramAdicional.push("FlagThc");
        paramAdicional.push("CodigoCaja");
        paramAdicional.push("Transaccion");
        paramAdicional.push("FechaTransaccion");
        AddOrRemovecheckBox(check, objFila, ids, nameGrilla, paramAdicional);

        var idsencode = encodeURIComponent(ids);
        //setTimeout('RefreshCheckBox("'+tipo+'","'+nameGrilla+'","'+idsencode+'");',100);
    }
}
function AddOrRemovecheckBox(flag, rowObject, fieldvalueArray, idgrilla, paramAdicional) {

    var idsAlmacenado = new Array();
    var ListaMemoriaAlmacenado = JSON.parse(sessionStorage.getItem(idgrilla));
    var ListaMemoriaAlmacenado_Ids = JSON.parse(sessionStorage.getItem(idgrilla + "_Ids"));
    var ListaMemoriaAlmacenado_All = new Array();
    if (ListaMemoriaAlmacenado == null)
        ListaMemoriaAlmacenado = new Array();
    if (ListaMemoriaAlmacenado_Ids == null)
        ListaMemoriaAlmacenado_Ids = new Array();

    var rowData = rowObject;

    var item = new Object();
    var itemAllData = new Object();//para grabar  toda la data.
    for (var i = 0; i < fieldvalueArray.length; i++) {
        item[fieldvalueArray[i]] = rowData[fieldvalueArray[i]];
        itemAllData[fieldvalueArray[i]] = rowData[fieldvalueArray[i]];
    }
    idsAlmacenado.push(item);

    for (var i = 0; i < paramAdicional.length; i++) {
        itemAllData[paramAdicional[i]] = rowData[paramAdicional[i]];
    }
    itemAllData.Marcado = true;
    ListaMemoriaAlmacenado_All.push(itemAllData);


    if (flag == true) {
        for (var x = 0; x < idsAlmacenado.length; x++) {
            var existe = false;
            var indexExiste = -1;
            for (var y = 0; y < ListaMemoriaAlmacenado_Ids.length; y++) {
                if (JSON.stringify(ListaMemoriaAlmacenado_Ids[y]) == JSON.stringify(idsAlmacenado[x])) {
                    existe = true;
                    indexExiste = y;
                    break;
                }
            }
            if (existe == false) {
                ListaMemoriaAlmacenado.push(ListaMemoriaAlmacenado_All[x])
                ListaMemoriaAlmacenado_Ids.push(idsAlmacenado[x])
            }
            else {
                ListaMemoriaAlmacenado[indexExiste] = ListaMemoriaAlmacenado_All[x]
                ListaMemoriaAlmacenado_Ids[indexExiste] = idsAlmacenado[x];
            }
        }
        sessionStorage.setItem(idgrilla, JSON.stringify(ListaMemoriaAlmacenado));
        sessionStorage.setItem(idgrilla + "_Ids", JSON.stringify(ListaMemoriaAlmacenado_Ids));
    }
    else {

        for (var x = 0; x < idsAlmacenado.length; x++) {
            for (var y = 0; y < ListaMemoriaAlmacenado.length; y++) {
                if (JSON.stringify(ListaMemoriaAlmacenado_Ids[y]) == JSON.stringify(idsAlmacenado[x])) {
                    //ListaMemoriaAlmacenado.splice(y,1);
                    ListaMemoriaAlmacenado[y].Marcado = false;
                    //ListaMemoriaAlmacenado_Ids.splice(y,1);
                    break;
                }
            }
        }
        sessionStorage.setItem(idgrilla, JSON.stringify(ListaMemoriaAlmacenado));
        sessionStorage.setItem(idgrilla + "_Ids", JSON.stringify(ListaMemoriaAlmacenado_Ids));

        return true;
    }

    return idsAlmacenado;

}

function checkBox(check, idgrilla, fieldvalueArray, paramAdicional) {
    var grid = $('#' + idgrilla);
    //var inputs = grid.find("input:checkbox:not(:hidden, :disabled)");
    var inputs = grid.find("td[aria-describedby='" + idgrilla + "_Liberar']").find("input:checkbox:not(:hidden, :disabled)");


    $.each(inputs, function (index, value) {
        $(this).prop('checked', check);
        var nroRow = $(this).parent().parent()[0].id;
        var rowData = grid.jqGrid('getRowData', nroRow);

        AddOrRemovecheckBox(check, rowData, fieldvalueArray, idgrilla, paramAdicional);

    });
}

function MostrarAlertaSimple(lstDictionary) {
    var ocultarCodigos = true;
    if (lstDictionary !== null)
        if (lstDictionary !== undefined) {
            var construyendoalerta = "";

            if (typeof lstDictionary == 'object') {
                $.each(lstDictionary, function (i, n) {
                    var parte1 = "";
                    if (ocultarCodigos == null || ocultarCodigos == undefined || ocultarCodigos == "") {
                        if (lstDictionary[i] !== "0") {
                            parte1 = "Codigo " + i + " : ";
                        }
                    }

                    if (parte1 + lstDictionary[i] != null) {
                        construyendoalerta = construyendoalerta + " - " + parte1 + lstDictionary[i] + "<br/>";
                    }

                });
            }
            else {
                for (i = 0; i < lstDictionary.length; i++) {
                    var parte1 = "";
                    if (ocultarCodigos == null || ocultarCodigos == undefined || ocultarCodigos == "") {
                        if (lstDictionary[i].Key !== "0") {
                            parte1 = "Codigo " + lstDictionary[i].Key + " : ";
                        }
                    }

                    if (parte1 + lstDictionary[i].Value != null) {
                        construyendoalerta = construyendoalerta + " - " + parte1 + lstDictionary[i].Value + "<br/>";
                    }
                }
            }
            if (construyendoalerta.length > 0) {
                $.msgbox(construyendoalerta, "Alerta", {
                    "Aceptar": function () {
                        $(this).dialog("close");
                    }
                }, "100%", "informacion",
                  {
                      "beforeClose": function () {

                      }
                  });
            }
        }
}

function RefreshCheckBox(tipo, idgrilla, fieldvalueArray) {
    debugger;
    var grid = $('#' + idgrilla);
    var fieldvalueArray = decodeURIComponent(fieldvalueArray).split(',');
    var ListaMemoriaAlmacenado = JSON.parse(sessionStorage.getItem(idgrilla));
    var inputs = grid.find("input[tooltip=" + tipo + "]:checkbox:not(:hidden, :disabled)");

    $.each(inputs, function (index, value) {



        var nroRow = $(this).parent().parent()[0].id;
        var rowData = grid.jqGrid('getRowData', nroRow);

        var item = new Object();
        for (var i = 0; i < fieldvalueArray.length; i++) {
            item[fieldvalueArray[i]] = rowData[fieldvalueArray[i]];
        }

        var existe = false;
        for (var y = 0; y < ListaMemoriaAlmacenado.length; y++) {
            if (JSON.stringify(ListaMemoriaAlmacenado[y]) == JSON.stringify(item)) {
                existe = true;
                break;
            }
        }
        if (existe == true) {
            $(this).prop('checked', true);
        }
        else {
            $(this).prop('checked', false);
        }

    });

}




function JqGridCrearCheckBox(value, sufijo) {
    var check = "";
    if (value == true) {
        check = 'checked = "' + value + '"';
    }
    var _sufijo = "";
    if (sufijo !== null) {
        _sufijo = sufijo;
    }
    var salida = '<div style="width:100%;padding-left:30px"><input id="jqGridcheckBox' + _sufijo + '" type="checkbox" ' + check + ' class="jqGridcheckBoxcs" /><div>';
    return salida;
}
function HtmlCrearBoton(tipo, EventoNgClick, atributosHtmlBoton) {
    return HtmlCrearBoton_Aux(tipo, "", EventoNgClick, atributosHtmlBoton);
}
function HtmlCrearBoton_Aux(tipo, valor, EventoNgClick, atributosHtmlBoton) {
    var strImg = ""
    var strTooltip = tipo;
    var salida = "";

    switch (tipo) {
        case "Estado":
            {
                var imgEstado = "";
                switch (valor) {
                    case "V":
                        imgEstado = "ImgSemVerde.png.png";
                        break;
                    case "A":
                        imgEstado = "ImgSemAmarillo.png";
                        break;
                    case "R":
                        imgEstado = "ImgSemRojo.png";
                        break;
                }
            }
            break;
        case "VerDetalle":
            {
                var strImg = "VerDetalle.png";
                var strTooltip = "Ver Detalle";
                var salida = "";
            }
            break;
        case "Modificar":
            {
                var strImg = "IcoModify.png";
                var strTooltip = "Modificar";
                var salida = "";
            }
            break;
        case "Eliminar":
            {
                var strImg = "eliminar.png";
                var strTooltip = "Eliminar";
                var salida = "";
            }
            break;
        case "Responsable":
            {
                var strImg = "buscar.png";
                var strTooltip = "Responsable";
                var salida = "";
            }
            break;
        case "Asignar":
            {
                var strImg = "main.png";
                var strTooltip = "Asignar";
                var salida = "";
            }
            break;
    }
    if (tipo == "Estado") {
        salida = '<div style="width:100%;padding-left:0px"><a style="cursor:pointer"><img width="16" ' + atributosHtmlBoton + ' height="16" src="/bundles/d41d8cd98f00b204e9800998ecf8427e/7b233344-3cf7-43da-a063-57964041749b/img/' + imgEstado + '" /></a></div>';
    }
    else {
        var atrngclick = '';
        if (!(EventoNgClick == undefined || EventoNgClick == "")) {
            atrngclick = 'ng-click="' + EventoNgClick + '"';
        }
        salida = '<div style="width:100%;padding-left:10px"><a style="cursor:pointer;width:100%"><button title="' + strTooltip + '" ' + atributosHtmlBoton + ' ' + atrngclick + ' class="boton1Style botonpequenio"><img width="16" height="16" src="/bundles/d41d8cd98f00b204e9800998ecf8427e/faffabed-c58a-4d3d-94e3-5237ee4668c4/images/' + strImg + '"></button></a></div>';
    }

    return salida;
}

function JqGridCrearBtn(cellvalue, options, tipo, rowId, rowId2, IdSufijo, rowId3, rowObject, nameId1) {
    var salida = "";
    var dataval2 = "";
    var dataval3 = "";

    var _Idsufijo = "";
    if (!(IdSufijo === null || IdSufijo === undefined)) {
        _Idsufijo = IdSufijo;
    }
    if (rowId2 !== null) {
        dataval2 = 'dataval2="' + rowId2 + '"';
    }
    if (rowId3 !== null) {
        dataval3 = ' dataval3="' + rowId3 + '" ';
    }

    if (tipo === "Modificar") {
        salida = '<div style="width:100%"><a style="cursor:pointer;width:100%"><button title="Modificar" ng-click="api.ModificarGrid(\'' + IdSufijo + '\',\'' + rowId + '\',\'' + rowId2 + '\',\'' + rowId3 + '\',\'' + nameId1 + '\')" dataval="' + rowId + '" ' + dataval2 + dataval3 + ' class="boton1Style botonpequenio btnJqgridModificar' + _Idsufijo + '"><img width="16" height="16" src="/bundles/d41d8cd98f00b204e9800998ecf8427e/faffabed-c58a-4d3d-94e3-5237ee4668c4/images/icoModify.png"/></button></a></div>';
        //salida = '<div style="width:100%;padding-left:10px"><a style="cursor:pointer;width:100%"><button title="Modificar" dataval="' + rowId + '" ' + dataval2 + dataval3 + ' class="boton1Style botonpequenio btnJqgridModificar' + _Idsufijo + '"><img width="16" height="16" src="/bundles/8d4580198e0b200b7a545a024d87eb3d/7b233344-3cf7-43da-a063-57964041749b/img/icoModify.png"/></button></a></div>';
    }
    else if (tipo === "VerDetalle") {
        salida = '<div style="width:100%;padding-left:10px"><a style="cursor:pointer;width:100%"><button title="Ver Detalle" ng-click="api.VerDetalleGrid(\'' + IdSufijo + '\',\'' + rowId + '\',\'' + rowId2 + '\',\'' + rowId3 + '\',\'' + nameId1 + '\')" dataval="' + rowId + '" ' + dataval2 + ' class="boton1Style botonpequenio btnJqgridVerDetalle' + _Idsufijo + '"><img width="16" height="16" src="/bundles/d41d8cd98f00b204e9800998ecf8427e/faffabed-c58a-4d3d-94e3-5237ee4668c4/images/VerDetalle.png"/></button></a></div>';
    }
    else if (tipo === "Eliminar") {
        salida = '<div style="width:100%;padding-left:10px"><a style="cursor:pointer;width:100%"><button title="Eliminar" ng-click="api.EliminarGrid(\'' + IdSufijo + '\',\'' + rowId + '\',\'' + rowId2 + '\',\'' + rowId3 + '\',\'' + nameId1 + '\')" dataval="' + rowId + '" ' + dataval2 + ' class="boton1Style botonpequenio btnJqgridEliminar' + _Idsufijo + '"><img width="16" height="16" src="/bundles/d41d8cd98f00b204e9800998ecf8427e/faffabed-c58a-4d3d-94e3-5237ee4668c4/images/eliminar.png"/></button></a></div>';
    } else if (tipo === "Configurar") {
        salida = '<div style="width:100%;padding-left:10px"><a style="cursor:pointer;width:100%"><button title="Configurar" ng-click="api.ConfigurarGrid(\'' + IdSufijo + '\',\'' + rowId + '\',\'' + rowId2 + '\',\'' + rowId3 + '\',\'' + nameId1 + '\')" dataval="' + rowId + '" ' + dataval2 + ' class="boton1Style botonpequenio btnJqgridConfigurar' + _Idsufijo + '"><img width="16" height="16" src="/bundles/d41d8cd98f00b204e9800998ecf8427e/faffabed-c58a-4d3d-94e3-5237ee4668c4/images/main.png"/></button></a></div>';
    } else if (tipo === "Responsable") {
        var _sufijoBtnDisabled = "";
        var _Disabled = "";
        if (cellvalue == false) {
            //_sufijoBtnDisabled = "Disabled";
            _sufijoBtnDisabled = " disabled_image ";
            _Disabled = ' disabled="disabled" ';
        }

        var miimage = '<img alt="Responsable" style="padding-right:0px;border-width: 0px;" class="imageButton" src="/bundles/d41d8cd98f00b204e9800998ecf8427e/faffabed-c58a-4d3d-94e3-5237ee4668c4/images/buscar.png"/>';
        salida = '<button style="float:right;"' + _Disabled + 'dataval="' + rowId + '" ' + dataval2 + ' ng-click="api.ResponsableGrid(\'' + IdSufijo + '\',\'' + rowId + '\',\'' + rowId2 + '\',\'' + rowId3 + '\',\'' + nameId1 + '\')" class="boton1Style botonpequenio btnJqgridResponsable' + _Idsufijo + _sufijoBtnDisabled + '" >' + miimage + '</button>';
    } else if (tipo === "Asignar") {
        var _Disabled = "";
        //salida = '<button dataval="' + rowId + '" ' + dataval2 + ' class="boton1Style botonpequenio btnJqgridAsignar' + _Idsufijo + '"><input type="image" title="Asignar" ' + _Disabled + ' style="float:left;padding-right:0px" class="imageButton btnJqgridAsignar" src="/bundles/8d4580198e0b200b7a545a024d87eb3d/faffabed-c58a-4d3d-94e3-5237ee4668c4/images/main.png" style="border-width: 0px;"/></button>';
        //IE 10, ERROR CON INPUT DENTRO DE UN BUTTON
        salida = '<button dataval="' + rowId + '" ' + dataval2 + ' ng-click="api.AsignarGrid(\'' + IdSufijo + '\',\'' + rowId + '\',\'' + rowId2 + '\',\'' + rowId3 + '\',\'' + nameId1 + '\')" class="boton1Style botonpequenio btnJqgridAsignar' + _Idsufijo + '"><img title="Asignar" ' + _Disabled + ' style="float:left;padding-right:0px" class="imageButton btnJqgridAsignar" src="/bundles/d41d8cd98f00b204e9800998ecf8427e/faffabed-c58a-4d3d-94e3-5237ee4668c4/images/main.png" style="border-width: 0px;"/></button>';
    }

    else if (tipo === "Estado") {
        var imgEstado = "";
        switch (rowId2) {
            case "V":
                imgEstado = "ImgSemVerde.png.png";
                break;
            case "A":
                imgEstado = "ImgSemAmarillo.png";
                break;
            case "R":
                imgEstado = "ImgSemRojo.png";
                break;
        }
        salida = '<div style="width:100%;padding-left:0px"><a style="cursor:pointer"><img width="16" height="16" src="/bundles/d41d8cd98f00b204e9800998ecf8427e/7b233344-3cf7-43da-a063-57964041749b/img/"' + imgEstado + ' alt="" dataval="' + rowId + '" ' + dataval2 + '/></a></div>';
    }

    return salida;
}
function ContarCaracteres(cadena, caracter) {
    var contadorrepeticiones = 0;
    var arraycadena = cadena.split(caracter);

    return arraycadena.length - 1;
}
function GetArrayGridJson(_page, _rows, id) {
    var _rowsfinal = new Array();
    var tamanio = 0;
    if (_rows !== null) {
        if (_rows !== undefined) {
            for (var i in _rows) {
                _rowsfinal[i] = { id: _rows[i][id], cell: _rows[i] };
            }
            tamanio = _rows.length;
        }
    }
    var obj = { page: _page, records: tamanio, total: 1, rows: _rowsfinal };
    return obj;//jQuery.parseJSON(ko.toJSON(obj));
}

function LimpiarForm(frm) {
    var raiz = null;

    if (typeof frm != "object") {
        if (frm.split("#").length > 1)
            raiz = $(frm);
        else
            if (frm.split(".").length > 1)
                raiz = $(frm);
            else
                raiz = $("#" + frm);
    }
    else
        raiz = $(frm);

    //raiz = raiz.find(".Sec04, .Sec03, .Sec01, .Sec02, .Sec03_03, .Sec03_02, .Sec55, .SecSinEstilo,.block_content");

    controles = raiz.find("input:hidden:not(:disabled):not(.nolimpiar), input:text:not(:disabled):not(.nolimpiar), select:not(:disabled):not(.nolimpiar)");

    /*var definicioncontroles = ".forms.Sec01 input:hidden:not([disabled]), .forms.Sec01 input:text:not([disabled]), .forms.Sec01 select:not([disabled])";
    definicioncontroles = definicioncontroles + "," + ".forms.Sec02 input:hidden:not([disabled]), .forms.Sec02 input:text:not([disabled]), .forms.Sec02 select:not([disabled])";
    definicioncontroles = definicioncontroles + "," + ".forms2.Sec02 input:hidden:not([disabled]), .forms2.Sec02 input:text:not([disabled]), .forms2.Sec02 select:not([disabled])";
    definicioncontroles = definicioncontroles + "," + ".forms2.Sec01 input:hidden:not([disabled]), .forms2.Sec01 input:text:not([disabled]), .forms2.Sec01 select:not([disabled])";
    definicioncontroles = definicioncontroles + "," + ".forms2pad.Sec02 input:hidden:not([disabled]), .forms2pad.Sec02 input:text:not([disabled]), .forms2pad.Sec02 select:not([disabled])";
    definicioncontroles = definicioncontroles + "," + ".forms2pad.Sec01 input:hidden:not([disabled]), .forms2pad.Sec01 input:text:not([disabled]), .forms2pad.Sec01 select:not([disabled])";
    definicioncontroles = definicioncontroles + "," + ".forms.Sec03 input:hidden:not([disabled]), .forms.Sec03 input:text:not([disabled]), .forms.Sec03 select:not([disabled])";
    definicioncontroles = definicioncontroles + "," + ".forms.Sec04 input:hidden:not([disabled]), .forms.Sec04 input:text:not([disabled]), .forms.Sec04 select:not([disabled])";
    definicioncontroles = definicioncontroles + "," + ".forms2.Sec55 input:hidden:not([disabled]), .forms2.Sec55 input:text:not([disabled]), .forms2.Sec55 select:not([disabled])";
    definicioncontroles = definicioncontroles + "," + ".forms.Sec01 input:hidden:not([disabled]), .forms.Sec01 input:text:not([disabled]), .forms.Sec01 select:not([disabled])";*/


    raiz.find(controles).val("");



    var array = raiz.find(".field-validation-error").find("span");
    for (i = 0; i < array.length; i++) {
        array[i].innerHTML = "";
    }

    var array2 = raiz.find(".msgerror");
    for (i = 0; i < array2.length; i++) {
        array2[i].innerHTML = "";
    }
}

function ponerFechas(id,esGrilla) {
    var arrFechas = new Array();
    var arrayFechas;
    if (id == null) {
        arrayFechas = $('#ContenedorBody').find(".InputTEXT_04Fecha");
    }
    else {
        arrayFechas = $('#' + id).find(".InputTEXT_04Fecha");
    }
    $.each(arrayFechas, function (x) {

        var obj = this;
        var existe = false;
        for (i = 0; i < arrFechas.length; i++) {
            if (arrFechas[i] == obj.id) {
                existe = true;
                break;
            }
        }
        if (existe == false) {
            var temp_fecha = {
                dateFormat: "dd/mm/yy",
                showOn: "button",
                buttonImage: "/images/calendar.png",
                buttonImageOnly: true,
                changeMonth: true,
                changeYear: true,
                buttonImageOnly: true,
                showAnim: "show",
                close: function (event, ui) {
                    //code here - commented out still get error                    
                    return false;
                },
                onClose: function (selectedDate) {
                    var idmindate = $(this).attr("control_max_date");
                    var idmaxdate = $(this).attr("control_min_date");

                    if (idmindate != null) {
                        $("#" + idmindate).datepicker("option", "minDate", selectedDate);

                    }
                    if (idmaxdate != null) {
                        $("#" + idmaxdate).datepicker("option", "maxDate", selectedDate);
                    }
                },
                beforeClose: function (event, ui) {
                    //code here - commented out still get error
                    return false;
                }
            };
            try {
                $(obj).datepicker(temp_fecha);
                $(obj).mask("99/99/9999");
                $(obj).datepicker(temp_fecha, $.datepicker.regional['es']);
                if(esGrilla){

                }else{
                $('img.ui-datepicker-trigger').css({ 'cursor': 'pointer', "vertical-align": 'top' }).attr('title', 'Seleccionar fecha');
                }
                /*
                  $("#" + obj.id).on("blur",
                      function (selectedDate) {
                          var idmindate = $("#" + this.id).attr("control_max_date");
                          var idmaxdate = $("#" + this.id).attr("control_min_date");
  
                          if (idmindate != null)
                              $("#" + idmindate).datepicker("option", "minDate", selectedDate);
                          if (idmaxdate != null)
                              $("#" + idmaxdate).datepicker("option", "maxDate", selectedDate);
                          //this.focus();
                      }
                      );
                      */
                $(obj).on("change",
                    function () {
                        /*
                        var val = this.value;
                        var idmindate = $(this).attr("control_max_date");
                        var idmaxdate = $(this).attr("control_min_date");
                       // var lstFeacha = val.split("/");
                        //var valFecha = new Date(lstFeacha[2],lstFeacha[1],lstFeacha[0]);
                        if (idmindate != null){
                            //$("#" + idmindate).datepicker("option", "minDate", val);
                                // $("#" + idmindate).datepicker(
                                //    'option', 'minDate', new Date(2016, 6 - 1, 10)
                               // );
                         }
                        if (idmaxdate != null)
                            //$("#" + idmaxdate).datepicker("option", "maxDate", val);
                        this.focus();
                        */
                        try {
                            $.datepicker.parseDate('dd/mm/yy', this.value);
                        } catch (e) {
                            $(this).val("");
                        };

                    }
                    );



                //mindate
                //$("#" + obj.id).datepicker("option", "onClose", function (selectedDate) {
                //    var idmindate = $("#" + this.id).attr("control_max_date");
                //    var idmaxdate = $("#" + this.id).attr("control_min_date");

                //    if (idmindate != null)
                //        $("#" + idmindate).datepicker("option", "minDate", selectedDate);
                //    if (idmaxdate != null)
                //        $("#" + idmaxdate).datepicker("option", "maxDate", selectedDate);
                //    //this.focus();
                //});
                //if ($("#" + obj.id).val() !== "") {
                //    $("#" + $("#" + obj.id).attr("control_min_date")).datepicker("option", "minDate", $("#" + obj.id).val());
                //    $("#" + $("#" + obj.id).attr("control_max_date")).datepicker("option", "maxDate", $("#" + obj.id).val());
                //}
            }
            catch (everything)
            { }

            try {
                //mindate
                $(obj).datepicker("option", "minDate", new Date($("#" + $("#" + obj.id).attr("control_min_date")).val()));
            }
            catch (everything)
            { }

            try {
                //maxdate
                $(obj).datepicker("option", "maxDate", new Date($("#" + $("#" + obj.id).attr("control_max_date")).val()));
            }
            catch (everything)
            { }

            arrFechas[arrFechas.length] = obj.id;


        }

    })

    $(".InputTEXT_04Fecha").prop('disabled', true);
    $(".solonumeros").numeric();
    $(".solodecimal").numeric();
    //validarLogin();
}
function validarLogin() {
    $("form").submit(function (event) {
        var usuario = $("#Usuario").val();
        var clave = $("#Contrasena").val();

        if (usuario == "") {
            MiAlert("El usuario es Requerido");
        }

    });
}
function quitarvalidacionfecha() {
    var obj = $("span[for=" + this.id + "]");
    var validacion = obj.text();
    if (validacion.split("debe ser una fecha.").length > 1) {
        obj.text("");
    }
}
function PonerFocoInicio(frm, ctrOpcional) {
    if (!(ctrOpcional == undefined || ctrOpcional == null)) {
        $(ctrOpcional).focus();
        return;
    }
    if (!(frm == undefined || frm === null)) {
        frm = $(frm);
    }
    else {
        frm = $("form");
    }
    try {
        var ctl = frm.find("input:image:not(:hidden, :disabled),input:radio:not(:hidden, :disabled, [readonly]), input:text:not(:hidden, :disabled, [readonly]), select:not(:hidden, :disabled, [readonly])")[0];

        if (ctl === undefined) {
            var ctl = frm.find("button:not(:hidden, :disabled)")[0];
            ctl.focus();
        }
        else {
            frm.find(ctl).focus();
        }
    }
    catch (everything)
    { }
}
getPopupResponsive = function (m_settings) {

    var settings = {
        formURL: "",
        params: "",
        beforeShow: null,
        nombreDiv: "div"
    }
    settings = $.extend(settings, m_settings);
    var objBox;
    var IdDiv = "#" + settings["nombreDiv"].split("#").join("");

    if ($(IdDiv).length == 0) {
        auxObjBox = document.createElement("div");
        auxObjBox.setAttribute("id", settings["nombreDiv"].split("#").join(""));
        auxObjBox.setAttribute("ng-api", "api");

        //auxObjBox.setAttribute("tabindex", "-1");
        //auxObjBox.setAttribute("data-replace", "true");
        auxObjBox.setAttribute("style", "display:none")
        auxObjBox.setAttribute("mapurl", settings.formURL);
        auxObjBox.setAttribute("ng-controller", "FormularioBasePopupController");
        document.getElementsByTagName("body")[0].appendChild(auxObjBox);

    }
    objBox = $(IdDiv);
    $('body').modalmanager('loading');
    $.ajax({
        url: settings["formURL"],
        type: 'post',
        data: settings["params"],
        contentType: "application/json",
        success: function (datos) {
            objBox.html(datos);
            var htmlCabecera = '<div class="modalCabecera"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="padding-right: 8px;padding-top: 2px;">×</button><h4 class="modal-title ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" style="    font-family: Lucida Grande, Lucida Sans, Arial, sans-serif;    font-size: 13px;    cursor: move!important;    padding: .4em 1em;">' + settings["title"] + '</h4></div>';
            htmlCabecera = htmlCabecera + objBox.find(".block_menu").first().html();
            objBox.find(".block_menu").first().html(htmlCabecera);


            var strContainer = "container ";
            if ($(window).width() > 979) {
                var maximoAnchoDelContenido = objBox.find(".block").css("max-width");
                if (!(maximoAnchoDelContenido == "none" || maximoAnchoDelContenido == ""))
                    strContainer = ""
            }
            objBox[0].setAttribute("class", "modal " + strContainer + " fade");//Para popup pequenio: modal fade in|muy abajo:modal container fade      

            if ($.isFunction(settings["beforeShow"])) {
                auxfun = settings["beforeShow"];
                auxfun(objBox);
            }
            //objBox.modal(show = true, backdrop = "static");
            objBox.modal({ backdrop: 'static', keyboard: false })

            objBox.draggable({
                handle: ".modalCabecera"
            });

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(ajaxOptions + ":" + thrownError);
        }
    });
}

var popupsAbiertos = 0;
$.getPopupGeneral = function (m_settings) {
    var settings = {
        formURL: "",
        params: "",
        title: "Seleccione un registro",
        select: null,
        cancel: null,
        beforeShow: null,
        tieneGrid: true,
        /*parametros generales*/
        nombreDiv: "div",
        nombreGrid: "grid",
        estado: "",
        HideSelection: true,
        EndClose: null,
        width: "auto",
        height: "auto",
        multiSelect: false,
        selectable: true,
        formPage: null
    }

    settings = $.extend(settings, m_settings);
    var objBox;
    var nombreDiv = "#" + settings["nombreDiv"].split("#").join("");
    var nombreGrid = "#" + settings["nombreGrid"].split("#").join("");;
    if ($(nombreDiv).length == 0) {
        auxObjBox = document.createElement("div");
        auxObjBox.setAttribute("id", nombreDiv.split("#").join(""));
        document.getElementsByTagName("body")[0].appendChild(auxObjBox);
    }
    objBox = $(nombreDiv)[0];
    //miBlock(true, settings.formPage);
    miBlock(true, "body");
    $.ajax({
        url: settings["formURL"],
        type: 'post',
        data: settings["params"],
        contentType: "application/json",
        success: function (datos) {
            miBlock(false, "body");
            $(objBox).html(datos);
            if ($.isFunction(settings["beforeShow"])) {
                auxfun = settings["beforeShow"];
                auxfun(objBox);
            }
            //window.scrollTo(0, 0);
            $(objBox).dialog({
                title: settings["title"],
                width: settings.width,
                height: settings.height,
                modal: true,
                autoOpen: false,
                zIndex: 10000,
                show: {
                    effect: "fade",
                    duration: 150
                },
                hide: {
                    effect: "fade",
                    duration: 150
                },
                buttons: {
                    "Seleccionar": function () {
                        if (nombreGrid !== "#nada") {
                            var ret = null;
                            if (settings["multiSelect"] == true) {
                                var ids = jQuery(nombreGrid).jqGrid('getGridParam', 'selarrrow');
                                var arrret = new Array();
                                for (var i = 0; i < ids.length; i++) {
                                    var rowId = ids[i];
                                    ret = jQuery(nombreGrid).jqGrid('getRowData', rowId);
                                    arrret.push(ret);
                                }
                                if (settings.tieneGrid) {
                                    if (ids.length > 0) {
                                        if ($.isFunction(settings["select"])) {
                                            var auxfun = settings["select"];
                                            var res = auxfun(arrret);//si retorna true, cierra el dialog, sino no
                                            if (res) {
                                                settings.estado = "Ok";
                                                $(this).dialog("close");
                                            }
                                        }
                                    } else {
                                        MiAlert(" Seleccione una fila");
                                    }
                                }
                                else {
                                    if ($.isFunction(settings["select"])) {
                                        var auxfun = settings["select"];
                                        var res = auxfun();//si retorna true, cierra el dialog, sino no
                                        if (res) {
                                            settings.estado = "Ok";
                                            $(this).dialog("close");
                                        }
                                    }
                                }
                            }
                            else {
                                var id = jQuery(nombreGrid).jqGrid('getGridParam', 'selrow');
                                if (id || settings["selectable"] === false) {
                                    ret = jQuery(nombreGrid).jqGrid('getRowData', id);
                                    if ($.isFunction(settings["select"])) {
                                        var auxfun = settings["select"];
                                        var res = auxfun(ret);//si retorna true, cierra el dialog, sino no
                                        if (res) {
                                            settings.estado = "Ok";
                                            $(this).dialog("close");
                                        }
                                    }
                                }
                                else {
                                    MiAlert(" Seleccione una fila");
                                }
                            }
                        }
                        else {
                            $(this).dialog("close");
                        }
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                    }
                },
                open: function () {
                    popupsAbiertos++;
                    if (popupsAbiertos == 1) {
                        $("body").css("overflow", "hidden");
                    }
                },
                close: function (event, ui) {
                    if ($.isFunction(settings.EndClose)) {
                        if (settings.estado.length == 0) {
                            auxfun = settings.EndClose;
                            auxfun(objBox);
                        }
                    }
                    popupsAbiertos--;
                    if (popupsAbiertos == 0) {
                        $("body").css("overflow", "auto");
                    }
                }
            });
            $(objBox).dialog("open");
            if (settings.HideSelection == true) {
                $(nombreDiv).parent().find(".ui-dialog-buttonpane").hide();
                PonerFocoInicio($(nombreDiv));
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            miBlock(false, "body");
            alert(ajaxOptions + ":" + thrownError);
        }
    });
}




$(document).ajaxComplete(function (event, XMLHttpRequest, ajaxOptions) {
    var redirs = [400, 402, 404, 405, 408, 413, 414, 421, 500, 503, 507];
    var redirs2 = [403, 401]
    if ($.inArray(XMLHttpRequest.status, redirs2) > -1) {
        var autor = ""
        if (XMLHttpRequest.statusText == "no authorization")
            autor = "&authorization=1";
        $("body").html("");

        if ($("#urlError").length > 0) {
            if (window.location.href.indexOf($("#urlError").attr("href")) === -1)
                window.location.href = $("#urlError").attr("href");
        }
    }
});
$(document).ajaxError(function (event, XMLHttpRequest, ajaxOptions) {
    if (XMLHttpRequest.status == 440) {
        window.location.href = "/";
    } else {
        if ($("#urlError").length > 0) {
            if (window.location.href.indexOf($("#urlError").attr("href")) === -1)
                window.location.href = $("#urlError").attr("href");
        }
    }
});

var uncambio = false;
var ispostbackmf = false;

HelperJS = {
    Contains: function (a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    },
    Parse:
    {
        Float: function (val) {
            if (val == "")
                val = null;
            return parseFloat(val, 10);
        }
    },
    TipoMensaje:
    {
        NoHayResultados: "1",
        RegistroSatisfactorio: "2"
    },
    Util:
    {
        Trim: function (cadena) {

            var cadena2 = "";
            if (cadena != null) {
                len = cadena.length;
                i = 0;
                while (cadena[i] == " ")
                    i++;
                j = cadena.length - 1;
                while (cadena[j] == " ")
                    j--;
                cadena = cadena.substr(i, j - i + 1);
                //for (var i = 0; i <= len; i++) {
                //    if (cadena.charAt(i) != " ")
                //    {
                //        cadena2 += cadena.charAt(i);
                //    }
                //}
            }
            return cadena;
        },
        PonerCeros: function (numero, nrocaracteres) {
            var salida = "";
            var ceros = "";
            for (var i = 1; i <= nrocaracteres; i++) {
                ceros = ceros + "0";
            }
            salida = ceros + "" + numero;
            return salida.substr(salida.length - nrocaracteres, nrocaracteres);
        }
    },
    Validaciones:
        {
            esnulo: function (campo) { return (campo == null || campo == ""); },
            esrucok: function (ruc) {
                return (!(this.esnulo(ruc) || !this.esnumero(ruc) || !this.eslongrucok(ruc) || !this.valruc(ruc)));
            },
            esdniok: function (dni) {
                return (!(this.esnulo(dni) || !this.esnumero(dni) || !this.eslongdniok(dni)));
            },
            isDate: function (x) {
                var salida = (null != x) && !isNaN(x) && ("undefined" !== typeof x.getDate);
                if (salida === false)
                    if (x !== null)
                        if (x.toString().split("Date(").length > 1)
                            salida = true;
                return salida;
            },
            isArray: function (x) {
                var salida = $.isArray(x); //Array.isArray(x);
                if (salida === false)
                    salida = (!!x) && (x.constructor === Object);
                return salida;
            },
            esnumero: function (campo) { return (!(isNaN(campo))); },
            eslongrucok: function (ruc) { return (ruc.length == 11); },
            eslongdniok: function (dni) { return (dni.length == 8); },
            trim: function (valor) { return ($.trim(valor)); },
            valruc: function (valor) {
                valor = this.trim(valor)
                if (this.esnumero(valor)) {
                    if (valor.length == 8) {
                        suma = 0
                        for (i = 0; i < valor.length - 1; i++) {
                            digito = valor.charAt(i) - '0';
                            if (i == 0) suma += (digito * 2)
                            else suma += (digito * (valor.length - i))
                        }
                        resto = suma % 11;
                        if (resto == 1) resto = 11;
                        if (resto + (valor.charAt(valor.length - 1) - '0') == 11) {
                            return true
                        }
                    } else if (valor.length == 11) {
                        suma = 0
                        x = 6
                        for (i = 0; i < valor.length - 1; i++) {
                            if (i == 4) x = 8
                            digito = valor.charAt(i) - '0';
                            x--
                            if (i == 0) suma += (digito * x)
                            else suma += (digito * x)
                        }
                        resto = suma % 11;
                        resto = 11 - resto

                        if (resto >= 10) resto = resto - 10;
                        if (resto == valor.charAt(valor.length - 1) - '0') {
                            return true
                        }
                    }
                }
                return false
            },
            EscribeSoloNumero: function (obj, admitePuntos) {
                var nroDecimales = 2;
                var valor = obj.value;

                if (event.keyCode <= 45 || event.keyCode == 47 || event.keyCode > 57) {
                    event.returnValue = false;
                } else {

                    if (!admitePuntos && event.keyCode == 46) {
                        event.returnValue = false;
                    }
                    else {
                        if (event.keyCode == 46) {
                            if (valor.indexOf(".") == -1) {
                                event.returnValue = true;
                            } else {
                                event.returnValue = false;
                            }
                        } else {
                            campo = valor.split(".");
                            if (campo.length == 2) {
                                var pDecimal = String(campo[1]);
                                if (pDecimal.length >= nroDecimales) {
                                    //event.returnValue = false;
                                } else {
                                    event.returnValue = true;
                                }
                            }
                        }
                    }
                }
            }
        }
}

$(function () {
    $("body").on("keyup", ".solonumeros, .solodecimal, .soloentero, .soloalfanumerico, .noasterisco, .solotelefono, inc_arroba, inc_backslash, inc_punto, inc_menos", function (e) {


        var carat = getSelectionStart(this);
        var selectionEnd = getSelectionEnd(this);
        //------------------------------------------------------
        var textbuffer = $(this).val();
        var textoinicial = textbuffer;
        i = textbuffer.length - 1;

        if ($(this).hasClass("solotelefono")) {
            $(this).removeClass("solodecimal");
            $(this).removeClass("solonumeros");
        }

        // allow Ctrl+A
        if ((e.ctrlKey && key == 97 /* firefox */) || (e.ctrlKey && key == 65) /* opera */) { return true; }
        // allow Ctrl+X (cut)
        if ((e.ctrlKey && key == 120 /* firefox */) || (e.ctrlKey && key == 88) /* opera */) { return true; }
        // allow Ctrl+C (copy)
        if ((e.ctrlKey && key == 99 /* firefox */) || (e.ctrlKey && key == 67) /* opera */) { return true; }
        // allow Ctrl+Z (undo)
        if ((e.ctrlKey && key == 122 /* firefox */) || (e.ctrlKey && key == 90) /* opera */) { return true; }
        // allow or deny Ctrl+V (paste), Shift+Ins
        if ((e.ctrlKey && key == 118 /* firefox */) || (e.ctrlKey && key == 86) /* opera */ || (e.shiftKey && key == 45)) { return true; }
        // allow selection
        if ((e.keyCode >= 37 && e.keyCode <= 39) || e.keyCode == 16) {
            //if(e.keyCode == 16)
            //setSelection(this, [carat, selectionEnd]);
            return true;
        }

        while (textbuffer.length > 0 && i >= 0) {
            // get decimal character and determine if negatives are allowed
            var decimal = ($(this).hasClass("solodecimal") ? "." : "");
            var negative = false;
            var asterisco = ($(this).hasClass("asterisco") || $(this).hasClass("noasterisco") ? "*" : "");
            // get the key that was pressed
            var key = textbuffer.charCodeAt(i);

            var allow = false;

            var apareceAsterisco = false;
            if (/*$(this).hasClass("solonumeros") && */$(this).val().indexOf("*") > -1)
                apareceAsterisco = true;

            var pasa = true;

            if ($(this).hasClass("solonumeros") || $(this).hasClass("soloentero") || $(this).hasClass("solodecimal") || $(this).hasClass("solotelefono")) {
                if (key < 48 || key > 57) {
                    if (key == asterisco.charCodeAt(0) && $(this).hasClass("asterisco") && !apareceAsterisco)
                        pasa = true;
                    else {
                        if (key == decimal.charCodeAt(0) && $(this).hasClass("solodecimal")) {
                            pasa = true;
                            //verifico que no se haya insertado antes
                            var ia = 0;
                            while (ia < textbuffer.length) {
                                if (textbuffer.charCodeAt(ia) == decimal.charCodeAt(0) && ia != i) {
                                    pasa = false;
                                }
                                ia++;
                            }
                        }
                        else {
                            if ((key == 40 || key == 41 || key == 42 || key == 35 || key == 45 || key == 47 || key == 32) && $(this).hasClass("solotelefono"))
                                pasa = true;
                            else
                                pasa = false;
                        }
                    }
                }
                else {
                    pasa = true;
                }
            }
            else {
                if ($(this).hasClass("soloalfanumerico")) {
                    if ((key >= 97 && key <= 122) || (key >= 65 && key <= 90) || (key >= 48 && key <= 57))
                        pasa = true;
                    else {
                        if ($(this).hasClass("inc_menos") && key === 45)
                            pasa = true;
                        else {
                            if ($(this).hasClass("inc_arroba") && key === 64)
                                pasa = true;
                            else {
                                if ($(this).hasClass("inc_backslash") && key === 92)
                                    pasa = true;
                                else {
                                    if ($(this).hasClass("inc_punto") && key === 46)
                                        pasa = true;
                                    else {
                                        pasa = false;
                                    }
                                }
                            }
                        }
                    }

                }
                else {
                    if (key == asterisco.charCodeAt(0) && $(this).hasClass("noasterisco"))
                        pasa = false;
                    else
                        pasa = true;
                }
            }


            var keyespecial = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (
                keyespecial == 8 /* backspace */ ||
                keyespecial == 9 /* tab */ ||
                keyespecial == 13 /* enter */ ||
                keyespecial == 35 /* end */ ||
                keyespecial == 36 /* home */ ||
                keyespecial == 37 /* left */ ||
                keyespecial == 39 /* right */ ||
                keyespecial == 46 /* del */
            ) {
                pasa = true;
            }

            if (pasa == false)
                textbuffer = textbuffer.substring(0, i) + textbuffer.substring(i + 1);

            i--;

        }
        if (textbuffer != textoinicial) {
            $(this).val(textbuffer);
        }
        if (!(!!navigator.userAgent.match(/Trident.*rv\:11\./))) {
            setSelection(this, [carat, selectionEnd]);
        }
        else {
            setSelection(this, [textbuffer.length, textbuffer.length]);
        }
    });

    $("body").on("keyup", ".asterisco:not(.solonumeros, .solodecimal, .soloentero)", function (e) {

        if (e.keyCode === 16 ||
            e.keyCode === 35 ||
            e.keyCode === 36)
            return;

        var val = $(this).val();
        if (val && val.length > 0) {
            // get carat (cursor) position
            var carat = getSelectionStart(this);
            var selectionEnd = 1;//val.length - carat;

            if (this.createTextRange) {
            }
            else {
                if (this.setSelectionRange) {
                    selectionEnd = getSelectionEnd(this);;
                }
            }
            // get decimal character and determine if negatives are allowed
            var i = 0;
            var p = 0;
            var cad = "";
            var encontrado = false;

            if (ContarCaracteres(val, "*") > 1) {
                var pos = carat - 1;
                var cad1 = "";
                if (val.charAt(pos) === "*") {
                    while (p < val.length) {

                        if (p !== pos) {
                            cad1 = cad1 + val.charAt(p);
                        }
                        p++;
                    }
                    val = cad1;
                }
            }

            while (i < val.length) {
                if (val.charAt(i) !== "*")
                    cad += val.charAt(i);
                else {
                    //if (encontrado == false) {
                    //    cad += val.charAt(i);
                    //    encontrado = true;
                    //}
                    if (i >= 1 && val.charAt(i) === val.charAt(i - 1) && encontrado === true) {

                    }
                    else {
                        cad += val.charAt(i);
                        encontrado = true
                    }
                }
                i++;
            }
            val = cad;
            // set the value and prevent the cursor moving to the end
            this.value = val;
            setSelection(this, [carat, selectionEnd]);
        }
    });

    $("body").on("keyup", ".noasterisco", function (e) {
        obj = this;
        $(this).each(function () {
            var carat = getSelectionStart(obj);
            var selectionEnd = getSelectionEnd(obj);

            val = $(this).val().split("*").join("");

            obj.value = val;
            setSelection(obj, [carat, selectionEnd]);
        });
    });
    // Based on code from http://javascript.nwbox.com/cursor_position/ (Diego Perini <dperini@nwbox.com>)
    getSelectionStart = function (o) {
        try {
            if (o.createTextRange) {
                var r = document.selection.createRange().duplicate();
                r.moveEnd('character', o.value.length);
                if (r.text === '') { return o.value.length; }
                return o.value.lastIndexOf(r.text);
            } else { return o.selectionStart; }
        }
        catch (ex) {
            return 0;
        }
    };

    // Based on code from http://javascript.nwbox.com/cursor_position/ (Diego Perini <dperini@nwbox.com>)
    getSelectionEnd = function (o) {
        try {
            if (o.createTextRange) {
                var r = document.selection.createRange().duplicate()
                r.moveStart('character', -o.value.length)
                return r.text.length
            } else return o.selectionEnd
        }
        catch (ex) {
            return o.length;
        }
    }

    // set the selection, o is the object (input), p is the position ([start, end] or just start)
    setSelection = function (o, p) {
        try {
            // if p is number, start and end are the same
            if (typeof p == "number") { p = [p, p]; }
            // only set if p is an array of length 2
            if (p && p.constructor == Array && p.length == 2) {
                if (o.createTextRange) {
                    var r = o.createTextRange();
                    r.collapse(true);
                    r.moveStart('character', p[0]);
                    r.moveEnd('character', p[1]);
                    r.select();
                }
                else if (o.setSelectionRange) {
                    o.focus();
                    o.setSelectionRange(p[0], p[1]);
                }
            }
        }
        catch (ex) {

        }
    };
});
function validarSoloDecimal(obj) {
    var val = $(obj).val();
    if (val && val.length > 0) {
        // get carat (cursor) position
        var carat = getSelectionStart(obj);
        var selectionEnd = getSelectionEnd(obj);
        // get decimal character and determine if negatives are allowed
        var decimal = ($(obj).hasClass("solodecimal") ? "." : "");
        var negative = false;
        var asterisco = ($(obj).hasClass("asterisco") ? '*' : '');

        // prepend a 0 if necessary
        if (decimal !== "" && decimal !== null) {
            // find decimal point
            var dot = val.indexOf(decimal);

            // if dot at start, add 0 before
            if (dot === 0) {
                obj.value = "0" + val;
            }
            // if dot at position 1, check if there is a - symbol before it
            if (dot == 1 && val.charAt(0) == "-") {
                obj.value = "-0" + val.substring(1);
            }
            val = obj.value;
        }

        if (asterisco == "*" && val.indexOf("*") > -1) {
            i = 0;
            var cad = "";
            var encontrado = false;
            while (i < val.length) {
                if (val.charAt(i) != "*")
                    cad += val.charAt(i);
                else {
                    if (encontrado == false) {
                        cad += val.charAt(i);
                        encontrado = true;
                    }
                }
                i++;
            }
            val = cad;
        }

        // if pasted in, only allow the following characters
        var validChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '-', decimal, asterisco];
        // get length of the value (to loop through)
        var length = val.length;
        // loop backwards (to prevent going out of bounds)
        for (var i = length - 1; i >= 0; i--) {
            var ch = val.charAt(i);
            // remove '-' if it is in the wrong place
            if (i !== 0 && ch == "-") {
                val = val.substring(0, i) + val.substring(i + 1);
            }
                // remove character if it is at the start, a '-' and negatives aren't allowed
            else if (i === 0 && !negative && ch == "-") {
                val = val.substring(1);
            }
            var validChar = false;
            // loop through validChars
            for (var j = 0; j < validChars.length; j++) {
                // if it is valid, break out the loop
                if (ch == validChars[j]) {
                    validChar = true;
                    break;
                }
            }
            // if not a valid character, or a space, remove
            if (!validChar || ch == " ") {
                val = val.substring(0, i) + val.substring(i + 1);
            }
        }
        // remove extra decimal characters
        var firstDecimal;
        if (decimal != "")
            firstDecimal = val.indexOf(decimal);
        else
            firstDecimal = -1;

        if (firstDecimal > 0) {
            for (var k = length - 1; k > firstDecimal; k--) {
                var chch = val.charAt(k);
                // remove decimal character
                if (chch == decimal) {
                    val = val.substring(0, k) + val.substring(k + 1);
                }
            }
        }
        // set the value and prevent the cursor moving to the end

        obj.value = val;
        setSelection(obj, [carat, selectionEnd]);
    }
    return obj;
}

function MiError(mensaje) {
    $.msgbox(mensaje, "Error", {
        "Aceptar": function () {
            $(this).dialog("close");
        }
    }, "50%", "error");
}

function MiAlertAlerta(mensaje) {
    $.msgbox(mensaje, "Alerta", {
        "Aceptar": function () {
            $(this).dialog("close");
        }
    }, "50%", "alerta");
}

function MiAlert(mensaje, tipomensaje) {
    var ancho = "50%";
    var icono = "exclamacion";
    switch (tipomensaje) {
        case HelperJS.TipoMensaje.NoHayResultados:
            mensaje = "No se han encontrado resultados.";
            ancho = "100%";
            icono = "informacion";
            break;
        case HelperJS.TipoMensaje.RegistroSatisfactorio:
            mensaje = "";
            break;
    }

    $.msgbox(mensaje, "Alerta", {
        "Aceptar": function () {
            $(this).dialog("close");
        }
    }, ancho, icono);
}

function MiAlertOk(mensaje, MiAlertOk_success, MiAlertOk_before) {

    $.msgbox(mensaje, "Alerta", {
        "Aceptar": function () {
            $(this).dialog("close");
            try {
                MiAlertOk_success();
            }
            catch (e) { }
        }
    }, "50%", "satisfactorio",
    {
        "beforeClose": function () {
            try {
                MiAlertOk_before();
            }
            catch (e) { }
        }
    }
    );
}
function MiConfirm2(mensaje, fc_ok, fc_no) {
    $.msgbox(mensaje, "Confirmación", {
        "Si": function () {
            $(this).dialog("close");
            try {
                fc_ok();
            }
            catch (exception)
            { }
        },
        "No": function () {
            $(this).dialog("close");
            try {
                fc_no();
            }
            catch (exception)
            { }
        }
    }, "50%", "pregunta",
    {
        "beforeClose": function () {
            try {
                fc_no();
            }
            catch (e) { }
        }
    });
}
function MiConfirm(mensaje, fc_ok, fc_no) {
    $.msgbox(mensaje, "Confirmación", {
        "Aceptar": function () {
            $(this).dialog("close");
            try {
                fc_ok();
            }
            catch (exception)
            { }
        },
        "Cancelar": function () {
            try {
                fc_no();
            }
            catch (exception)
            { }
            $(this).dialog("close");
        }
    }, "50%", "pregunta",
    {
        "beforeClose": function () {
            try {
                fc_no();
            }
            catch (e) { }
        }
    });
}
function MostrarAlerta(lstDictionary, estadooperacion, tipook, successok, paramadd, beforecloseok, ocultarCodigos) {
    if (lstDictionary !== null)
        if (lstDictionary !== undefined) {
            var construyendoalerta = "";
            for (i = 0; i < lstDictionary.length; i++) {
                var parte1 = "";
                if (ocultarCodigos == null || ocultarCodigos == undefined || ocultarCodigos == "") {
                    if (lstDictionary[i].Key !== "0") {
                        parte1 = "Codigo " + lstDictionary[i].Key + " : ";
                    }
                }

                if (parte1 + lstDictionary[i].Value != null) {
                    construyendoalerta = construyendoalerta + " - " + parte1 + lstDictionary[i].Value + "<br/>";
                }
            }
            if (construyendoalerta.length > 0) {
                if (estadooperacion !== tipook || estadooperacion === undefined) {
                    $.msgbox(construyendoalerta, "Alerta", {
                        "Aceptar": function () {
                            $(this).dialog("close");
                            if (successok !== undefined) {
                                if (estadooperacion === tipook) {
                                    successok(paramadd);
                                }
                            }
                        }
                    }, "550px", "informacion",
                    {
                        "beforeClose": function () {
                            try {
                                beforecloseok();
                            }
                            catch (e) { }
                        }
                    });
                }
                else {
                    $.msgbox(construyendoalerta, "Alerta", {
                        "Aceptar": function () {
                            $(this).dialog("close");
                            if (successok !== undefined) {
                                if (estadooperacion === tipook) {
                                    try {
                                        successok(paramadd);
                                    }
                                    catch (e) { }
                                }
                            }
                        }
                    }, "550px", "satisfactorio",
                    {
                        "beforeClose": function () {
                            try {
                                beforecloseok();
                            }
                            catch (e) { }
                        }
                    });
                }
            }
        }
}

function miBlock(estado, obj) {
    /*var frm = $("form");
    if (obj == null)
        obj = frm;*/

    if (obj == null || obj == undefined)
        obj = "html";



    if (estado == true) {
        $(obj).block({
            message: "Procesando..."
        });
        if (obj == "html" || obj == "iframe") {
            $(".blockOverlay").height("3000px");
        }
    }
    else {
        $(obj).unblock();
    }
}
function ExisteItemArray(arrayErrores, val) {
    var salida = false;
    for (index = 0; index < arrayErrores.length; index++) {
        if (arrayErrores[index] === val) {
            salida = true;
            break;
        }
    }
    return salida;
}

jQuery(function ($) {
    $.validator.addMethod('date',
    function (value, element) {
        if (this.optional(element)) {
            return true;
        }

        var ok = true;
        try {
            $.datepicker.parseDate('dd/mm/yy', value);
        }
        catch (err) {
            ok = false;
        }
        return ok;
    });
});
$(document).ready(function () {
    ValidarMaxLenghtDataAnotations();
});

function ValidarMaxLenghtDataAnotations() {
    $("input[data-val-length-max]").each(function () {
        var $this = $(this);

        var data = $this.data();

        $this.attr("maxlength", data.valLengthMax);

    });
}

$.validator.addMethod('requiredif',
function (value, element, parameters) {
    var id = '#' + parameters['dependentproperty'];

    // get the target value (as a string,
    // as that's what actual value will be)
    var targetvalue = parameters['targetvalue'];
    targetvalue =
    (targetvalue == null ? '' : targetvalue).toString();

    // get the actual value of the target control
    // note - this probably needs to cater for more
    // control types, e.g. radios
    var control = $("input[name='" + id.replace("#", "").replace("_", ".").replace("_", ".").replace("_", ".").replace("_", ".") + "'], select[name='" + id.replace("#", "").replace("_", ".").replace("_", ".").replace("_", ".").replace("_", ".") + "']");
    var controltype = control.attr('type');
    var actualvalue =
    controltype === 'checkbox' ?
    control.attr('checked').toString() :
    control.val();

    if (controltype == 'radio') {
        var arrayrb = control.toArray();
        for (i = 0; i < arrayrb.length; i++) {
            if (arrayrb[i].checked == true) {
                actualvalue = arrayrb[i].value;
                break;
            }
        }
    }
    // if the condition is true, reuse the existing
    // required field validator functionality
    if (targetvalue.toLowerCase() === actualvalue.toLowerCase())
        return $.validator.methods.required.call(
        this, value, element, parameters);

    return true;
}
);

$.validator.unobtrusive.adapters.add(
'requiredif',
['dependentproperty', 'targetvalue'],
function (options) {
    options.rules['requiredif'] = {
        dependentproperty: options.params['dependentproperty'],
        targetvalue: options.params['targetvalue']
    };
    options.messages['requiredif'] = options.message;
});

function validateForm(thisFormId, evitar_foco) {
    var thisForm = $(thisFormId);
    $.validator.unobtrusive.parse(thisFormId);
    var val = thisForm.validate();
    var isValid = val.form();
    if (!isValid) {
        if (evitar_foco == null) {
            //se agregÃƒÂ³ esta validaciÃƒÂ³n, ya que en el formulario de crear documento comercial de tipo perÃƒÂ­odo de tiempo, cuando falta ingresar la fecha se valida y al hacer foco en este campo desaparece la validaciÃƒÂ³n (el hecho que desaparece la validaciÃƒÂ³n es porque asÃƒÂ­ se comporta)
            thisForm.find('.input-validation-error').first().focus();
        }
    }

    return isValid;
}

function RecargarSelect(elementos, selectId, value, propiedades, optLabel) {
    setprops = {
        ID: "ID",
        Datos: "Datos"
    }
    if (propiedades != null)
        setprops = $.extend(setprops, propiedades);
    var subSelect = $(selectId);
    subSelect.html("");
    var option = document.createElement("option");
    option.text = "-Seleccione-";
    option.value = "";
    //subSelect[0].add(option, null);
    $(option).appendTo(subSelect);
    for (i = 0; i < elementos.length; i++) {
        var option = document.createElement("option");
        option.text = elementos[i][setprops.Datos];
        option.value = elementos[i][setprops.ID];
        if (value !== null) {
            if (elementos[i][setprops.ID] == value) {
                option.selected = value;
            }
        }
        subSelect[0].add(option, null);
        //$(option).appendTo(subSelect);
    }
}

//modo de uso:
/*$.msgbox("Ã‚Â¿Requiere extender tambiÃƒÂ©n a la sociedad CNP?", "Pregunta", {
    "Si": function () {
        //las acciones de la funciÃƒÂ³n
        //-------------------------------
        $(this).dialog("close");//cierra la ventana de confirmaciÃƒÂ³n
    },
    "No": function () {
        $(this).dialog("close");//cierra la ventana de confirmaciÃƒÂ³n
    }
},[ancho],"[alerta|informacion|pregunta|error]",[settings])*/
$.msgbox = function (mensaje, titulo, buttons, width, icono, settings, estilos) {
    var objBox;
    if ($("#divMsgBox").length == 0) {
        auxObjBox = document.createElement("div");
        auxObjBox.setAttribute("id", "divMsgBox");
        document.getElementsByTagName("body")[0].appendChild(auxObjBox);
    }
    if (icono === null || icono === undefined) {
        icono = "alerta"
    }
    objBox = $("#divMsgBox")[0];
    $(objBox).html('<div class="wrapmsgbox"><div class="img_msgbox ' + icono + '"></div><div class="msg_msgbox" style="' + estilos + '">' + mensaje + '</div></div>');
    primarios = {
        title: titulo,
        width: (width == null ? 400 : width),
        buttons: buttons,
        show: {
            effect: "fade",
            duration: 450
        },
        hide: {
            effect: "fade",
            duration: 450
        },
        modal: true,
        closeOnEscape: false,
        create: function (event, ui) {
            $(this).prev().find(".ui-dialog-titlebar-close").remove()
        }
    };
    primarios = $.extend(settings, primarios);
    $(objBox).dialog(primarios);
}

var popupsAbiertos = 0;
validarCuenta = function (texto) {
    var regCuenta = /^[A-Za-z0-9\.\-]+\\[A-Za-z0-9\.\-]+$/
    return regCuenta.test(texto);
}
validarCorreo = function (texto) {
    var regCorreo = /^[A-Za-z0-9\.\-]+[@][A-Za-z0-9\.\-]+[\.][A-Za-z0-9]+$/;

    return regCorreo.test(texto);
};
$.fn.ScriptorSubmit = function (funSuccess, funError) {
    $(this).each(function () {
        $(this).load(function () {
            if (this.contentDocument.body.innerHTML !== null) {
                if (this.contentDocument.body.innerHTML.length > 0) {
                    if (this.contentDocument.body.innerHTML.split('Submetido com sucesso. Obrigado!').length > 1) {
                        if (funSuccess !== null && funSuccess !== undefined) {

                            var $span = $($(this)[0].contentDocument.documentElement).find("span");
                            var rpta = {
                                idcanal: $span.data('channel'),
                                idcontenido: $span.data('content'),
                                idcanalNotifica: $span.attr("data-content"),
                                //idcontenidoNotifica: idContenidoNotificacion,
                                rutaFrontEnd: window.location.pathname
                            };

                            funSuccess.call(this, rpta);
                        }
                    } else {
                        if (funError !== null && funError !== undefined) {
                            funError.call(this, "Error al ejecutar la operaciÃ³n");
                        }
                    }
                }
                else {
                    if (funError !== null && funError !== undefined) {
                        funError.call(this, "No retornÃ³ nada");
                    }
                }
            }
            else {
                if (funError !== null && funError !== undefined) {
                    funError.call(this, "No retornÃ³ nada");
                }
            }
        });
    });
}

//habilita la validacion de DataAnnotations
$.fn.enableValidation = function () {
    form = $(this);
    form.removeData('validator');
    form.removeData('unobtrusiveValidation');
    $.validator.unobtrusive.parse(form);
}

//prepara los settings para una grilla generica con paginacion y todo
procesarCols = function (columnas, idgrilla, parametros, sortable) {
    var cols = [];
    var primero = true;
    if (parametros === undefined || parametros === null)
        para = {};
    var settingsGrilla = {
        width: "100%",
        height: 200,
        url: "",
        loadAtStarup: false,
        autowidth: true,
        //data: jQuery.parseJSON(datos),
        pager: "",
        customButtons: [
            /*{
                caption: "Exportar a Excel",
                buttonicon: "ui-icon-del",
                onClickButton: function () {
                    $("#dgvClientes").doExportar();
                },
                position: "first"
            }*/
        ]
    }
    //proceso las columnas
    $.each(columnas, function (k, v) {
        var rpta = {};
        if (!sortable)
            sortable = false;
        else
            sortable = true;

        ancho = function (valor) {
            rpta.width = valor;
        };
        hidden = function () {
            rpta.hidden = false;
        };

        if (primero)
            rpta = { name: v.Name, key: primero, caption: v.Prompt, width: 40 };
        else
            rpta = { name: v.Name, caption: v.Prompt, width: 40 };
        primero = false;
        if (!sortable)
            rpta.sortable = false;
        $.each(v.FormParams, function (k1, v1) {
            try {
                eval(v1);
            }
            catch (ex) { }
        });
        cols.push(rpta);
    });
    //adiciono a los settings
    $.extend(settingsGrilla, parametros, parametros);
    settingsGrilla.pager = idgrilla + "_pager";
    settingsGrilla.columnas = cols;
    return settingsGrilla;
}

procesarCols2 = function (objSettingsGrilla, idgrilla, parametros, sortable) {
    var cols = [];
    if (parametros === undefined || parametros === null)
        para = {};
    else
        para = parametros;
    if (!sortable)
        sortable = false;
    else
        sortable = true;

    var settingsGrilla = {
        width: "100%",
        height: 200,
        url: "",
        loadAtStarup: false,
        autowidth: true,
        //data: jQuery.parseJSON(datos),
        pager: "",
        NombreSinResultados: objSettingsGrilla.NombreSinResultados,
        customButtons: [
            {
                caption: objSettingsGrilla.NombreBotonExportar,
                buttonicon: "ui-icon-del",
                onClickButton: function () {
                    $("#dgvClientes").doExportar();
                },
                position: "first"
            }
        ]
    };

    $.each(objSettingsGrilla.Campos, function (q, v) {
        rpta = { name: v.IdColumna, key: (v.llave == "1" ? true : false), caption: v.Nombre, width: v.ancho };
        if (v.oculto == "1")
            rpta.hidden = true;
        if (!sortable)
            rpta.sortable = false;
        switch (v.formato) {
            case 2://fecha
                rpta.formatter = "date";
                rpta.formatoptions = {
                    srcformat: 'Y-m-d',
                    newformat: 'd/m/Y',
                };
                break;
            case 3://decimal
                rpta.formatter = "number";
                rpta.formatoptions = {
                    decimalSeparator: ".",
                    thousandsSeparator: ",",
                    decimalPlaces: 2,
                    defaulValue: 0
                }
                break;
            case 4://entero
                rpta.formatter = "number";
                rpta.formatoptions = {
                    decimalSeparator: ".",
                    thousandsSeparator: ",",
                    decimalPlaces: 0,
                    defaulValue: 0
                }
                break;
            case 5://email
                rpta.formatter = "email";
                break;
            case 6://checkbox
                rpta.formatter = "checkbox";
                rpta.formatoptions = {
                    disabled: true
                }
                break;
                //default:
        }
        cols.push(rpta);
    });

    $.extend(settingsGrilla, settingsGrilla, para);

    settingsGrilla.pager = idgrilla + "_pager";
    settingsGrilla.columnas = cols;

    return settingsGrilla;
};


function ReadOnlyForm(grillas, flagEditing, contentFechas) {
    $.each(grillas, function (a, b) {
        //Boton eliminar
        var lstcontrolsButton = $("#" + grillas[a]).find("button.botonpequenio");
        $.each(lstcontrolsButton, function (x, y) {
            if (lstcontrolsButton[x].title == "Eliminar") {
                if (flagEditing) {
                    $("#" + grillas[a]).find(lstcontrolsButton[x]).removeAttr('disabled');
                }
                else {
                    $("#" + grillas[a]).find(lstcontrolsButton[x]).attr('disabled', 'disabled');
                }
            }
        });
        //checkbox
        var lstcontrolsCheck = $("#gview_" + grillas[a]).find('input[type="checkbox"]');
        $.each(lstcontrolsCheck, function (x, y) {
            if (flagEditing) {
                $("#gview_" + grillas[a]).find(lstcontrolsCheck[x]).removeAttr('disabled');
            }
            else {
                $("#gview_" + grillas[a]).find(lstcontrolsCheck[x]).attr('disabled', 'disabled');
            }
        });

        var lstcontrolsSelect = $("#" + grillas[a]).find("select");
        $.each(lstcontrolsSelect, function (x, y) {
            if (flagEditing) {
                $("#" + grillas[a]).find(lstcontrolsSelect[x]).removeAttr('disabled');
            }
            else {
                $("#" + grillas[a]).find(lstcontrolsSelect[x]).attr('disabled', 'disabled');
            }
        });

        var lstcontrolsInput = $("#gview_" + grillas[a]).find('input[type="text"]');
        $.each(lstcontrolsInput, function (x, y) {
            if (flagEditing) {
                $("#gview_" + grillas[a]).find(lstcontrolsInput[x]).removeAttr('disabled');
            }
            else {
                $("#gview_" + grillas[a]).find(lstcontrolsInput[x]).attr('disabled', 'disabled');
            }
        });

    });

    //Fechas
    $.each(contentFechas, function (a, b) {
        var lstcontrolsFechas = $("#" + contentFechas[a]).find(".ui-datepicker-trigger");
        $.each(lstcontrolsFechas, function (x, y) {
            if (flagEditing) {
                $("#" + contentFechas[a]).find(lstcontrolsFechas[x]).show();
            }
            else {
                $("#" + contentFechas[a]).find(lstcontrolsFechas[x]).hide();
            }
        });
    });


}
function DeshabilitarSelectGrilla(grillas) {
    $.each(grillas, function (a, b) {

        var lstcontrolsSelect = $("#" + grillas[a]).find("select");
        $.each(lstcontrolsSelect, function (x, y) {
            $("#" + grillas[a]).find(lstcontrolsSelect[x]).attr('disabled', 'disabled');
        });
    });
}

function OnOffAllSelectGrilla(idgrilla, flag) {
    var lstcontrolsCheck = $("#gview_" + idgrilla).find('input[type="checkbox"]');
    $.each(lstcontrolsCheck, function (x, y) {
        if (flag) {
            $("#gview_" + idgrilla).find(lstcontrolsCheck[x]).attr('checked', 'checked');
        }
        else {
            $("#gview_" + idgrilla).find(lstcontrolsCheck[x]).removeAttr('checked');
        }
    });
}

function AgrupamientoPeriodosAcuardoComercialEscalonado(periodosList, accion) {
    var listaConfigPeriodo = [];
    if (periodosList.length > 0) {
        var primaryGrpPeriodo = [];
        for (var x = 0; x < periodosList.length; x++) {
            var noExisteGrroup = true;
            for (var w = 0; w < primaryGrpPeriodo.length; w++) {
                if (periodosList[x].CodigoClaseContenedor == primaryGrpPeriodo[w].CodigoClaseContenedor &&
                    periodosList[x].CodigoMoneda == primaryGrpPeriodo[w].CodigoMoneda) {
                    noExisteGrroup = false;
                    break;
                }
            }
            if (noExisteGrroup) {
                var groupNewObj = new Object();
                groupNewObj.CodigoClaseContenedor = periodosList[x].CodigoClaseContenedor;
                groupNewObj.CodigoMoneda = periodosList[x].CodigoMoneda;
                groupNewObj.ClaseContenedor = periodosList[x].ClaseContenedor;
                groupNewObj.Moneda = periodosList[x].Moneda;
                groupNewObj.CodigoAcuerdoComercialEscalonado = periodosList[x].CodigoAcuerdoComercialEscalonado;
                groupNewObj.CodigoTarifaEscalonado = periodosList[x].CodigoTarifaEscalonado;
                groupNewObj.SelectTypeContenList = [];
                var totalContentType = $.grep(periodosList, function (a) { return a.CodigoClaseContenedor == groupNewObj.CodigoClaseContenedor && a.CodigoMoneda == groupNewObj.CodigoMoneda; });
                for (var s = 0; s < totalContentType.length; s++) {
                    var rangosNewList = [];
                    var objTypeCont = new Object();
                    objTypeCont.idCheck = true;
                    objTypeCont.CodigoTipoContenedor = totalContentType[s].CodigoTipoContenedor;
                    var noExistCont = true;
                    for (var y = 0; y < groupNewObj.SelectTypeContenList.length; y++) {
                        if (groupNewObj.SelectTypeContenList[y].CodigoTipoContenedor == objTypeCont.CodigoTipoContenedor) {
                            noExistCont = false;
                        }
                    }
                    if (noExistCont) {
                        var searchRangos = $.grep(periodosList, function (e) {
                            return e.CodigoClaseContenedor == groupNewObj.CodigoClaseContenedor &&
                             e.CodigoMoneda == groupNewObj.CodigoMoneda &&
                             e.CodigoTipoContenedor == objTypeCont.CodigoTipoContenedor;
                        });
                        if (searchRangos.length > 0) {
                            for (var c = 0; c < searchRangos.length; c++) {
                                var newRangObj = new Object();

                                newRangObj.IdRango = ((accion == "U") ? searchRangos[c].IdPeriodo : -searchRangos[c].IdPeriodo);
                                newRangObj.Periodo = searchRangos[c].CodigoPeriodo;
                                newRangObj.UnidadLibres = searchRangos[c].NumeroDias;
                                newRangObj.Precio = searchRangos[c].Precio;
                                newRangObj.Accion = accion;
                                rangosNewList.push(newRangObj);
                            }
                        }
                        objTypeCont.newListRangos = rangosNewList;
                        groupNewObj.SelectTypeContenList.push(objTypeCont);
                    }
                }
                primaryGrpPeriodo.push(groupNewObj);
            }
        }
        if (primaryGrpPeriodo.length > 0) {
            for (var a = 0; a < primaryGrpPeriodo.length; a++) {
                var objMemoria = new Object();
                var inputOne = true;
                objMemoria.Accion = accion;
                objMemoria.IdPeriodo = ((accion == "U") ? (listaConfigPeriodo.length + 1) : -(listaConfigPeriodo.length + 1));
                objMemoria.ClaseContenedor = primaryGrpPeriodo[a].ClaseContenedor;
                objMemoria.Moneda = primaryGrpPeriodo[a].Moneda;
                objMemoria.CodigoClaseContenedor = primaryGrpPeriodo[a].CodigoClaseContenedor;
                objMemoria.CodigoMoneda = primaryGrpPeriodo[a].CodigoMoneda;
                objMemoria.CodigoAcuerdoComercialEscalonado = primaryGrpPeriodo[a].CodigoAcuerdoComercialEscalonado;
                objMemoria.CodigoTarifaEscalonado = primaryGrpPeriodo[a].CodigoTarifaEscalonado;
                objMemoria.ListaTipoContenedor = [];
                objMemoria.ListaDetalleRango = [];
                var ccontTyListReady = primaryGrpPeriodo[a].SelectTypeContenList;
                for (var b = 0; b < ccontTyListReady.length; b++) {
                    if (inputOne) {
                        objMemoria.TiposContenedores = ccontTyListReady[b].CodigoTipoContenedor;
                        objMemoria.ListaDetalleRango = ccontTyListReady[b].newListRangos;
                        var thypTypeCtn = new Object();
                        thypTypeCtn.CodigoTipoContenedor = ccontTyListReady[b].CodigoTipoContenedor;
                        thypTypeCtn.idCheck = ccontTyListReady[b].idCheck;
                        objMemoria.ListaTipoContenedor.push(thypTypeCtn);
                        listaConfigPeriodo.push(objMemoria);
                    } else {
                        var esIgual = true;
                        for (var is = 0; is < listaConfigPeriodo.length; is++) {
                            esIgual = true;
                            var listaNewPosibleIns = ccontTyListReady[b].newListRangos;
                            var listExisDetailRango = listaConfigPeriodo[is].ListaDetalleRango;
                            var contability = 0;
                            for (var k = 0; k < listaNewPosibleIns.length; k++) {
                                for (var cur = 0; cur < listExisDetailRango.length; cur++) {
                                    if (listaConfigPeriodo[is].CodigoClaseContenedor == primaryGrpPeriodo[a].CodigoClaseContenedor &&
                                        listaConfigPeriodo[is].CodigoMoneda == primaryGrpPeriodo[a].CodigoMoneda &&
                                        listExisDetailRango[cur].CodigoPeriodo == listaNewPosibleIns[k].CodigoPeriodo &&
                                        listExisDetailRango[cur].UnidadLibres == listaNewPosibleIns[k].UnidadLibres &&
                                        listExisDetailRango[cur].Precio == listaNewPosibleIns[k].Precio) {
                                        contability++;
                                        break;
                                    }
                                }
                            }
                            if (contability != listaNewPosibleIns.length) {
                                esIgual = false;
                            }
                            if (esIgual) {
                                //Solo agregamos el tipo contenedor
                                listaConfigPeriodo[is].TiposContenedores = listaConfigPeriodo[is].TiposContenedores + ', ' + ccontTyListReady[b].CodigoTipoContenedor;
                                var newCntComplete = new Object();
                                newCntComplete.CodigoTipoContenedor = ccontTyListReady[b].CodigoTipoContenedor;
                                newCntComplete.idCheck = ccontTyListReady[b].idCheck;
                                listaConfigPeriodo[is].ListaTipoContenedor.push(newCntComplete);
                                break;
                            }
                        }

                        if (!esIgual) {
                            //Insertamos como nuevo
                            var xyzNewInsertVaelue = new Object();
                            xyzNewInsertVaelue.Accion = accion;
                            xyzNewInsertVaelue.IdPeriodo = ((accion == "U") ? (listaConfigPeriodo.length + 1) : -(listaConfigPeriodo.length + 1));
                            xyzNewInsertVaelue.ClaseContenedor = primaryGrpPeriodo[a].ClaseContenedor;
                            xyzNewInsertVaelue.Moneda = primaryGrpPeriodo[a].Moneda;
                            xyzNewInsertVaelue.CodigoClaseContenedor = primaryGrpPeriodo[a].CodigoClaseContenedor;
                            xyzNewInsertVaelue.CodigoMoneda = primaryGrpPeriodo[a].CodigoMoneda;
                            xyzNewInsertVaelue.CodigoAcuerdoComercialEscalonado = primaryGrpPeriodo[a].CodigoAcuerdoComercialEscalonado;
                            xyzNewInsertVaelue.CodigoTarifaEscalonado = primaryGrpPeriodo[a].CodigoTarifaEscalonado;
                            xyzNewInsertVaelue.TiposContenedores = ccontTyListReady[b].CodigoTipoContenedor;
                            xyzNewInsertVaelue.ListaDetalleRango = ccontTyListReady[b].newListRangos;
                            xyzNewInsertVaelue.ListaTipoContenedor = [];

                            var cntNewAplyConten = new Object();
                            cntNewAplyConten.CodigoTipoContenedor = ccontTyListReady[b].CodigoTipoContenedor;
                            cntNewAplyConten.idCheck = ccontTyListReady[b].idCheck;
                            xyzNewInsertVaelue.ListaTipoContenedor.push(cntNewAplyConten);
                            listaConfigPeriodo.push(xyzNewInsertVaelue);
                        }
                    }
                    inputOne = false;
                }
            }
        }
    }
    return listaConfigPeriodo;
}
