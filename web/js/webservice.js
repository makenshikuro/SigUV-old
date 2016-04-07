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

/* global _serverDB, _server, data */




server = "http://www.adretse.es/siguv/";
_serverDB = "http://localhost:8080/siguvServer/";



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
  $.getJSON( "http://localhost:8080/siguvServer/webresources/edificios", function(v) {
  
    //$.getJSON("http://147.156.82.219:8080/siguvServer/webresources/edificios", function (v) {

        var html = '<table class="table table-hover"><tbody>';
        $.each(v, function (i, data) {
            html += '<tr onclick="setPosition(' + data.idcoordenada.latitud + ',' + data.idcoordenada.longitud + ');"><td><img width= "50px" src="'+ server+ data.chano + '">' + data.nombre + '</td></tr>';
            console.log('http://www.adretse.es/siguv/'+data.chano);
        });
        html += "</tbody></table>";
        $(html).appendTo('#facultades');

        //console.log( "success"+v[0].nombre );

    });


//$("#facultades");




});

function LocalizarProfesor(id) {
    $.getJSON(_serverDB + 'webresources/profesores/' + id, function (data) {
        //console.log(data);

        setPosition(data.idespacio.idcoordenada.latitud, data.idespacio.idcoordenada.longitud);
        $('#busqueda-tab-todo .typeahead').typeahead('val', '');
        $('#busqueda-tab-profesor .typeahead').typeahead('val', '');
        openSidebarInfo(data);

    });
}

function ListarDocentesAsignatura(id) {
    $.getJSON(_serverDB + 'webresources/asignaturas/' + id, function (data) {
        //console.log(data);

        setPosition(data.idespacio.idcoordenada.latitud, data.idespacio.idcoordenada.longitud);
        $('#busqueda-tab-todo .typeahead').typeahead('val', '');
        $('#busqueda-tab-asignatura .typeahead').typeahead('val', '');

    });
}



function GetQueryStringParams(sParam)
{
    /*var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) 
        {
            return sParameterName[1];
        }
    }*/
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) 
        {
            if ( typeof(sParameterName[1]) !== 'undefined'){
                 
            }
            return sParameterName[1];
        }
    }
    
    
}
function BuscarEspacio(id){
    var json;
    $.getJSON(_serverDB + 'webresources/espacios/' + id , function(j){
        console.log("primer");
        console.log(j);
    })
            .done(function(data){
                console.log("done");
                console.log(data);
                return data;
                
    })
            .fail(function(doto){
                console.log("fail");
                console.log(doto);
    });
    console.log("fuera");
    
}
function CallSucceed(json){
    console.log("dentro");
    query = json;
}
    

