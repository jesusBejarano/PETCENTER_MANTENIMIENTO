var TipoMensaje = { OK: 1, ERROR: 2 };
$(document).ready(function () {
    $.datepicker.setDefaults($.datepicker.regional['es']);

     //Eventos
    $('.block_cab').live('click', function () {
        //        var src = $(this).find('.imgExpand').attr('src');
        //        if (src.indexOf("arrow_up.png") > 0)
        //            src = src.replace('arrow_up.png', 'arrow_down.png');
        //        else
        //            src = src.replace('arrow_down.png', 'arrow_up.png');
        //        $(this).find('.imgExpand').attr('src', src);
        //        var div = $(this).find('.acordeon');
        //        div.toggleClass('arrow_up');
        $(this).toggleClass('block_cab_active');
        $(this).parent().find('.block_content').slideToggle('fast');
    });

    //Popup de tipos de Mensaje
    $('#splash').dialog({ autoOpen: false,
        modal: true,
        resizable: false,
        width: 210,
        height: 45,
        show: "blind",
        hide: "clip",
        title: false,
        position: "center"
    });

    $('#divHistorial').dialog({
        autoOpen: false,
        modal: true,
        minWidth: 800,
        maxWidth: 800,
        minHeight: 100,
        maxHeight: 400,
        draggable: true,
        resizable: false,
        show: "blind",
        hide: "clip",
        title: "Historial de eventos",
        position: "center"
    });

    $('#dlg_Mensaje').dialog({ autoOpen: false,
        modal: true,
        resizable: false,
        width: 300,
        height: 150,
        buttons: {
            "OK": function () { $(this).dialog("close"); }
        }
    });

    $('#dlg_error').dialog({ autoOpen: false,
        modal: true,
        resizable: false,
        width: 300,
        height: 130,
        buttons: {
            "OK": function () { $(this).dialog("close"); }
        }
    });

    

});

function validate_fields_required(class_dialog) {
    var isvalid = true;
    var c = 0;

    $('.' + class_dialog + ' .requerido').each(function (index) {
        $(this).removeAttr('style', 'border: 1px solid  Red; background-color:#fac9c9'); //removeClass('requerido_style');
        if ($(this).val().length == 0 || $(this).find('option:selected').val() == '0') {
            $(this).attr('style', 'border: 1px solid  Red; background-color:#fac9c9'); //.addClass('requerido_style');
            isvalid = false;
        }
    });

    if (!isvalid) {
        alert_error('<div style = "float: left; margin-right:4px; margin-top:3px; width:10px; border: 1px solid  Red; background: #fac9c9">  </div> Debe ingresar los campos obligatorios.');
    }
    return isvalid;
}

function remove_validate_fields(class_dialog) {
    $('.' + class_dialog + ' .requerido').each(function (index) {
        $(this).removeAttr('style', 'border: 1px solid  Red; background-color:#fac9c9');

    });

}


