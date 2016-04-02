/* 
 * Librería dedicada a las conexiones con el servicio web en la dirección
 * http://localhost:8080/siguvServer/webresources/
 * 
 *  Los servicios implementados son:
 *  - Edificios
 *  - Espacios
 *  - Asignaturas
 *  - Profesores
 *  - Coordenadas
 *  - Panoramas
 * 
 */

/* global _serverDB, _server */

$(document).ready(function () {
          /*      $("#getData").click(function(){
                    var data = $.ajax({
                                    type: "GET",
                                    url: "http://localhost:8080/siguvServer/webresources/edificios",
                                    dataType: "json",
                                    contentType: "application/json; charset=utf-8",
                                    success: ajaxCallSucceed
                                    
                                   
                    });
                    
                    
                    
                });*/
 /*var jqxhr = $.getJSON( "http://localhost:8080/siguvServer/webresources/edificios", function(v) {
  console.log( "success"+v[0].nombre );
})  .done(function(f) {
    console.log( "second success"+f[0].nombre );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });*/
    
  //profesores = $.getJSON("http://localhost:8080/siguvServer/webresources/profesores");
  //jqxhr = $.getJSON( "http://localhost:8080/siguvServer/webresources/edificios", function(v) {
  
    $.getJSON("http://147.156.82.219:8080/siguvServer/webresources/edificios", function (v) {

        var html = '<table class="table table-hover"><tbody>';
        $.each(v, function (i, data) {
            html += '<tr onclick="setPosition(' + data.idcoordenada.latitud + ',' + data.idcoordenada.longitud + ');"><td><img width= "50px" src="'+ _server + data.chano + '">' + data.nombre + '</td></tr>';
            //alert(data.nombre);
        });
        html += "</tbody></table>";
        $(html).appendTo('#facultades');

        //console.log( "success"+v[0].nombre );

    });


//$("#facultades");




});

function LocalizarProfesor(id) {
    $.getJSON(_serverDB + '/webresources/profesores/' + id, function (data) {
        //console.log(data);

        setPosition(data.idespacio.idcoordenada.latitud, data.idespacio.idcoordenada.longitud);
        $('#busqueda-tab-todo .typeahead').typeahead('val', '');
        $('#busqueda-tab-profesor .typeahead').typeahead('val', '');
        openSidebarInfo(data);

    });
}

function ListarDocentesAsignatura(id) {
    $.getJSON(_serverDB + '/webresources/asignaturas/' + id, function (data) {
        console.log(data);

        setPosition(data.idespacio.idcoordenada.latitud, data.idespacio.idcoordenada.longitud);
        $('#busqueda-tab-todo .typeahead').typeahead('val', '');
        $('#busqueda-tab-asignatura .typeahead').typeahead('val', '');

    });
}

    
function ajaxCallSucceed(response) {
        console.log(response[0].nombre);
        alert(response[0].nombre);
}
