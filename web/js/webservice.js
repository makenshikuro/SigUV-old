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

/* global _serverDB, _server, data, server */




server = "http://adretse.uv.es/";
//server = "http://www.adretse.es/siguv/";
/*_serverDB = "http://localhost:8080/siguvServer/";*/



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
  $.getJSON( _serverDB + 'webresources/edificios', function(v) {
  
    //$.getJSON("http://147.156.82.219:8080/siguvServer/webresources/edificios", function (v) {

        var html = '<table class="table table-hover"><tbody>';
        $.each(v, function (i, data) {
            html += '<tr onclick="setPosition(' + data.idcoordenada.latitud + ',' + data.idcoordenada.longitud +', 20,false);"><td><img width= "50px" src="'+ server+ data.chano + '">' + data.nombre + '</td></tr>';
           
        });
        html += "</tbody></table>";
        $(html).appendTo('#facultades');

        

    });


//$("#facultades");




});

function LocalizarProfesor(id) {
    $.getJSON(_serverDB + 'webresources/profesores/' + id, function (data) {
        //console.log(data);
        console.log(data);
        if (data.visibilidad === '1'){
            setPosition(data.idespacio.idcoordenada.latitud, data.idespacio.idcoordenada.longitud, 21, "false");
            addMarker(data.idespacio.idcoordenada.latitud, data.idespacio.idcoordenada.longitud);
            $('#busqueda-tab-todo .typeahead').typeahead('val', '');
            $('#busqueda-tab-profesor .typeahead').typeahead('val', '');
            $('#busqueda-tab-asignatura .typeahead').typeahead('val', '');
            $('#listaDocentes').empty();
            

            openSidebarInfo(data, "profesores");
            _nivel = data.idespacio.piso;
            SetOptionLayers();
            ChangeMapLayer();

            //console.log(data.idespacio.boundingbox);
            MostrarArea(data.idespacio.boundingbox);
        }
        else{
            var html = '<div>';
                html += 'Lo sentimos, pero el recurso '+data.nombre+' no es accesible por lo que no se mostrar\u00e1 informaci\u00f3n al respecto. Disculpe las molestias';
                html += '</div>';
            map.fire('modal', {content: html});
            //console.log("hola");
            //openSidebarInfo(data,"no");
            
        }
            
        
        
        

    });
    ModalClose();
}
function LocalizarEspacio(id) {
    console.log("espacio: "+id);
    $.getJSON(_serverDB + 'webresources/espacios/' + id, function (data) {
        //console.log(data);
        console.log(data);
        if (data.visibilidad === '1'){
            setPosition(data.idcoordenada.latitud, data.idcoordenada.longitud, 21, "false");
            addMarker(data.idcoordenada.latitud, data.idcoordenada.longitud);
            $('#busqueda-tab-todo .typeahead').typeahead('val', '');
            $('#busqueda-tab-profesor .typeahead').typeahead('val', '');
            $('#busqueda-tab-asignatura .typeahead').typeahead('val', '');
            $('#listaDocentes').empty();
            

            openSidebarInfo(data, "espacios");
            _nivel = data.piso;
            SetOptionLayers();
            ChangeMapLayer();

            //console.log(data.idespacio.boundingbox);
            MostrarArea(data.boundingbox);
        }
        else{
            var html = '<div>';
                html += 'Lo sentimos, pero el recurso '+data.nombre+' no es accesible por lo que no se mostrar\u00e1 informaci\u00f3n al respecto. Disculpe las molestias';
                html += '</div>';
            map.fire('modal', {content: html});
            //console.log("hola");
            //openSidebarInfo(data,"no");
            
        }
            
        
        
        

    });
    ModalClose();
}


function ListarDocentesAsignatura(idAsignatura) {
    var profesores;
    $.ajax({
        type: 'GET',
        url: _serverDB + 'webresources/asignaturas/'+idAsignatura+'/profesores',
        dataType: 'json',
        success: function(response, textStatus, errorThrown) {
                /* Respuesta correcta */
                if(textStatus === 'success'){
                    //console.log("done");
                    profesores = response;
                    //console.log(profesores);
                }
                /* Respuesta errónea */
                else{
                    //console.log("fail");
                    
                }
        },
        async: false
    });
    return profesores;
}

function getAsignaturas(idProfesor){
    var asignaturas;
    $.ajax({
        type: 'GET',
        url: _serverDB + 'webresources/profesores/'+idProfesor+'/asignaturas',
        dataType: 'json',
        success: function(response, textStatus, errorThrown) {
                /* Respuesta correcta */
                if(textStatus === 'success'){
                    //console.log("done");
                    asignaturas = response;
                    
                }
                /* Respuesta errónea */
                else{
                    //console.log("fail");
                    
                }
        },
        async: false
    });
    //console.log("salgo");
    return asignaturas;
}
function getPanoramas(idEspacio){
    var panoramas;
    $.ajax({
        type: 'GET',
        url: _serverDB + 'webresources/espacios/'+idEspacio+'/panoramas',
        dataType: 'json',
        success: function(response, textStatus, errorThrown) {
                /* Respuesta correcta */
                if(textStatus === 'success'){
                    //console.log("done");
                    panoramas = response;
                    
                }
                /* Respuesta errónea */
                else{
                    //console.log("fail");
                    
                }
        },
        async: false
    });
    //console.log("salgo");
    return panoramas;
    
}

function GetQueryStringParams()
{
    var query;
    var flag = false;
    
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if ((sParameterName[0] === "idespacio")&&(flag !== true)) 
        {
            if ( typeof(sParameterName[1]) !== 'undefined'){
                 query = sParameterName[1]+';'+"espacio";
                 flag = true;
                 //console.log("espacioID");
            }
            
        }
        else if ((sParameterName[0] === "idprofesor")&&(flag !== true)) 
        {
            if ( typeof(sParameterName[1]) !== 'undefined'){
                 query = sParameterName[1]+';'+"profesor";
                 flag = true;
                 //console.log("profesorID");
            }
            
        }
    }
    //console.log(query);
    return query;
    
}

function MostrarURL(recurso){
    //console.log(window.location.origin+window.location.pathname);
    var clipboard = new Clipboard('.btn');
    var aux = recurso.split(';');
    var idrecurso = aux[0];
    var tipoRecurso = aux[1];
    var url = '';
    console.log(idrecurso);
    console.log(tipoRecurso);
    if (tipoRecurso === 'espacio') {
        url = window.location.origin + "/SigUV/index.html?idespacio=" + idrecurso;
    } else if (tipoRecurso === 'profesor') {
        url = window.location.origin + "/SigUV/index.html?idprofesor=" + idrecurso;
    }
    
    var html = '<div class="urlbox"><div class=""></div><div id="url">' + url + '</div><div class="btn" data-clipboard-target="#url"><img class="copy" src="images/social/copy-inactivo.svg" title="¡Copiado al Portapapeles!"></div></div>';
   
    map.fire('modal', {content: html});
    //$('#url').append(url);
     $( ".btn" ).hover(
        function() {$('.copy').attr('src','images/social/copy-activo.svg');},
        function() {$('.copy').attr('src','images/social/copy-inactivo.svg');});
    
    //console.log(window.location.pathname);
}
function ShareTwitter(idrecurso){
    var opciones = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
    var url = window.location.origin+"/SigUV/index.html?id="+idrecurso;
    var html = 'http://twitter.com/share?url='+url+'&text=Texto';
    window.open(html, '_blank',opciones);
    
    console.log("twtt");
}
function ShareFacebook(idrecurso){
    var opciones = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
    var url = window.location.origin+"/SigUV/index.html?id="+idrecurso;
    var html = 'http://www.facebook.com/sharer.php?u='+url+'&t=Texto';
    window.open(html, '_blank',opciones);
    console.log("Face");
}

function ModalClose(){
    map.closeModal();
}


function CallSucceed(json){
    console.log("dentro");
    query = json;
}
    

