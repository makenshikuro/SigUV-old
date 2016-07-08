/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




/* global _serverDB, isMobile, _nivelBusqueda, _listaPanos, L, _server */

function DefaultMap(){
    _nivelActual = "0";
    centro = [39.512859, -0.4244782];
    _currentPosition = centro;
    _zoom = 18;
}


function init() {
    /* Recogemos variable de query String */
    queryString = GetQueryStringParams();
    
    _data = "";
    
    _nivelActual = "0";
    centro = [39.512859, -0.4244782];
    _currentPosition = centro;
    _zoom = 18;
    
    /* Variables Globales   */
    _fondo = "plano";
    _tema = "b";
    _iconos = true;
    _toponimo = "d";
    _area ="";
    
    /* Variables  */
    var surOeste = new L.LatLng(39.51178034700101,-0.4247921705245971);
    var norEste = new L.LatLng(39.51368822239936,-0.42276978492736816);
    _mapBounds = new L.LatLngBounds(surOeste, norEste);
    _mapMinZoom = 5;
    _mapMaxZoom = 25;


    /* Inicialización Mapa */
    map = L.map('map', {center: centro, zoom: _zoom, zoomControl: false});

   
    /* Capas 
     * mapboxTiles = Mapbox.com  
     * osm = Open Street View    
     * googleLayer = Google Maps 
     * PB = Planos planta Baja   
     */
    mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/ubustus.p2c7e9pf/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
        /*attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>',*/
        minZoom: _mapMinZoom,
        maxZoom: _mapMaxZoom,
        
        unloadInvisibleTiles: true,
        opacity: 1.00
    });

    googleLayer = new L.Google('SATELLITE');
    
    ETSEmap = L.tileLayer(_server+ 'mapas/'+ _tema + _toponimo +_nivelActual+'/{z}/{x}/{y}.png', {
        minZoom: _mapMinZoom,
        maxZoom: _mapMaxZoom,
        bounds: _mapBounds,
        zIndex: 7
    });
 
    /* Añadido de Capas */
    map.addLayer(mapboxTiles);
    map.addLayer(ETSEmap);

    //Sidebar
    sidebarLayers = L.control.sidebar('sidebarLayers', {
        closeButton: true,
        position: 'left',
        autoPan: false
    });
    map.addControl(sidebarLayers);

    sidebarFacultades = L.control.sidebar('sidebarFacultades', {
        closeButton: true,
        position: 'left',
        autoPan: false
    });
    map.addControl(sidebarFacultades);
    sidebarInfo = L.control.sidebar('sidebarInfo', {
        closeButton: true,
        position: 'left',
        autoPan: false
    });
    map.addControl(sidebarInfo);
    

    /*
     * Grupos de capas de Marcadores JSON
     */
    layerGroupFac = L.layerGroup().addTo(map);
    layerGroupCam = L.layerGroup().addTo(map);
    layerGroupGPS = L.layerGroup();
    layerGroupSearch = L.layerGroup().addTo(map);

    /* Marcadores GeoJSON
     *  Facultades:   Marcadores correspondientes a las facultades de la UV
     *  Campus:       Marcadores correspondientes a los campus de la UV
     * 
     */
    L.geoJson(Facultades, {
        pointToLayer: function (feature, coordinates) {
            var geoMarker = (L.marker(coordinates, {icon: L.AwesomeMarkers.icon({icon: 'graduation-cap', markerColor: 'red', prefix: 'fa', iconColor: 'black'})}));
            layerGroupFac.addLayer(geoMarker);
            return geoMarker;
        },
        onEachFeature: caracteristicasFacultades
    }).addTo(map);

    L.geoJson(Campus, {
        pointToLayer: function (feature, coordinates) {
            var geoMarker = (L.marker(coordinates, {icon: L.AwesomeMarkers.icon({icon: 'university', markerColor: 'green', prefix: 'fa', iconColor: 'black'})}));
            layerGroupCam.addLayer(geoMarker);
            return geoMarker;
        },
        onEachFeature: caracteristicasCampus
    }).addTo(map);
    //.bindPopup('<img class=popupStyle src=//www.uv.es/uwm/imatges/GMaps/logo_uv.png width=88% alt=LogoUV><div class=popupTitol>'+\""+titol+"\"+'</div><div class=popupStyle>"+webPopUp+telPopUp.replace("'","&apos;")+emailPopUp+" </div><div>"+descripcio.trim()+"</div>'+'<div id=pano class=googleView> </div>'+'<button class=botoGoogle onclick=ActivarGoogleViewd"+i+"("+contMarkers+");>"+verStreeView+"</button>')
    /* Boton Leaflet
     *  Permite abrir y cerrar el Sidebar de información de Profesores y Espacios dejando un marcador para no perder el resultado.
     * 
     */
    L.easyButton( '<span title="Marcap&aacute;ginas" class="fa fa-bookmark bookmark"></span>', function(){
        sidebarInfo.toggle();       
    }).addTo(map);
    
    /*
     * Funcion caracteristicasFacultades
     * @param {type} feature: características del JSON
     * @param {type} layer:   capas
     * 
     */

    function caracteristicasFacultades(feature, layer) {
        var popupContent = '<img class="popupStyle" src="//www.uv.es/uwm/imatges/GMaps/logo_uv.png" width="88%" alt="LogoUV">';
            popupContent += '<div class=popupTitol>'+feature.properties.name+'</div>';
            popupContent += '<div class=popupStyle>';
            if (feature.properties && feature.properties.web) {
            popupContent += '<p><i class="fa fa-globe" aria-hidden="true"></i><a href="http://www.uv.es/'+feature.properties.web+'">http://www.uv.es/'+feature.properties.web+'</a></p>';
        }
        if (feature.properties && feature.properties.telefono) {
            popupContent += '<p><i class="fa fa-phone" aria-hidden="true"></i>'+feature.properties.telefono+'</p>';
        }
        if (feature.properties && feature.properties.correo) {
            popupContent += '<p><i class="fa fa-envelope" aria-hidden="true"></i><a href="mailto:'+feature.properties.correo+'">'+feature.properties.correo+'</a></p>';
        }
            popupContent += '</div>';

        layer.bindPopup(popupContent);
    }
    function caracteristicasCampus(feature, layer) {
        var popupContent = '<img class="popupStyle" src="//www.uv.es/uwm/imatges/GMaps/logo_uv.png" width="88%" alt="LogoUV">';
            popupContent += '<div class=popupTitol>'+feature.properties.name+'</div>';
            popupContent += '<div class=popupStyle>';
            
            if (feature.properties && feature.properties.facultades) {
            var facultad = feature.properties.facultades.split(',');
            
            var contador = 0;
                while (contador < facultad.length) {
                   
                    popupContent += '<p><i class="fa fa-university" aria-hidden="true"></i>'+ facultad[contador] + '</p>';
                     contador++;
            }
            }
        
            popupContent += '</div>';

        layer.bindPopup(popupContent);
    }

    var pnt =0;
    var arrey='';
    map.on('click', function(e) {
        pnt++;
        arrey += e.latlng.lat+","+e.latlng.lng+";";
        
        if (pnt === 4){
            
            console.log(arrey);
            pnt = 0;
            arrey ='';
        }
     });
    

    /*
     * Función tras cambiar zoom en el mapa
     * Se ocultan y muestran las capas ...... y ....
     */
    map.on('zoomend', function () {

        // (map.getZoom > 10)
        
        if (map.getZoom() < 17) {
            $("#nivel").removeClass('level');
            $("#nivel").addClass('levelOFF');
            map.removeLayer(layerGroupFac);
            map.addLayer(layerGroupCam);
        } 
        if(map.getZoom() >= 17){
            $("#nivel").addClass('level');
            $("#nivel").removeClass('levelOFF');
            map.addLayer(layerGroupFac);
            map.removeLayer(layerGroupCam);
        }
        
    });
    
    /* Consulta de Query */
    if (queryString !== 'error') {
        
        if (queryString !== 'error'){
        var string = queryString.split(';');
        var recurso = string[0];
        var tipoRecurso = string[1];
        if (tipoRecurso === 'espacio') {
            var req = $.ajax({
                type: 'GET',
                url: _serverDB + 'webresources/espacios/' + recurso,
                dataType: 'json',
                success: function (response, textStatus, errorThrown) {
                    /* Respuesta correcta */
               
                    if (textStatus === 'success') {
                        _nivelActual = response.piso;
                        centro = [response.idcoordenada.latitud, response.idcoordenada.longitud];
                        _currentPosition = centro;
                        _zoom = 22;
                        _data = response;
                        
                        LocalizarEspacio(response.idespacio);
                        if (!$('.easy-button-container').hasClass("visible")) {
                        $('.easy-button-container').addClass("visible");
                    }
                    }
                    if (textStatus === 'nocontent') {
                        DefaultMap();
                        openModalError(queryString);
                    }
                },
                error: function (response, textStatu, error) {
                    
                    /* Respuesta errónea */
                    DefaultMap();
                    openModalError(queryString);
                },
                async: false
            });
        }
        else if (string[1] === 'profesor'){
            var req = $.ajax({
                type: 'GET',
                url: _serverDB + 'webresources/profesores/' + string[0],
                dataType: 'json',
                success: function (response, textStatus, errorThrown) {
                    /* Respuesta correcta */
                    
                    if (textStatus === 'success') {
                        _nivelActual = response.idespacio.piso;                 
                        centro = [response.idespacio.idcoordenada.latitud, response.idespacio.idcoordenada.longitud];
                        _currentPosition = centro;
                        _zoom = 22;
                        _data = response;
                        
                        LocalizarProfesor(response.idprofesor);
                        if (!$('.easy-button-container').hasClass("visible")) {
                            $('.easy-button-container').addClass("visible");
                        }
                    }
                    if (textStatus === 'nocontent') {
                        DefaultMap();
                        openModalError(queryString);
                    }

                },
                error: function (response, textStatu, error) {
                    /* Respuesta errónea */
                    DefaultMap();
                    openModalError(queryString);
                },
                async: false
            });
        }
        /* Respuesta por defecto sin queryString */
    }
    else{
        DefaultMap();
    }
    }
    else{
        openModalError(queryString);
    }

    SetOptionLayers();   
}

/* Funciones */

function setPosition(lat, long, zoom, cierre){
    map.setView(new L.LatLng(lat, long), zoom,{animation: true});

    if (String(cierre) === 'true'){
        
        sidebarInfo.hide();
        sidebarFacultades.hide();
    }
}

/* Funcion openModalError
 * Abre un modal informando del error en la queryString
 */
function openModalError(string){
    
    
    var cadena = string.split(";");
    var tipoRecurso = cadena[1];
    var idRecurso = cadena[0];
    var html= '';
    
    if (tipoRecurso === 'espacio'){
        html += '<div class="claseerror">El espacio "'+ idRecurso+'" no es v&aacute;lido. Por favor, revisa tu enlace</div>';
    }
    if (tipoRecurso === 'profesor'){  
        html += '<div class="claseerror">El profesor "'+ idRecurso+'" no es v&aacute;lido. Por favor, revisa tu enlace</div>';
    }
    if ((tipoRecurso !== 'espacio')&&(tipoRecurso !== 'profesor')){
        html += '<div class="claseerror">El recurso que est&aacute; buscando es err\u00F3neo. Verifique su b&uacute;squeda e int&eacute;ntelo de nuevo.</div>'; 
    }
    map.fire('modal', {content: html});
}

/* Funcion openModalPano
 * Abre un modal informando del error en la queryString
 */
function openModalPano(nombreEspacio){
    
    var html = '<div id="container" ><div class="panorama-name">'+ nombreEspacio+'</div>';
    html += '<div id="visor-panorama" ></div>';
        
    if (_listaPanos.length !== 0) {
        var j = 0;
        if (_listaPanos.length !== 1) {
            html += '<div class="panoramas"><ul class="pagination panorama tohide">';
            
            while (j <= _listaPanos.length - 1) {
                console.log(_listaPanos[j].panorama);
                html += '<li class="page-item ';
                if (j === 0){
                    html += 'active';
                }      
                html += '"><a href="#" onclick="Change(\''+_listaPanos[j].panorama+'\');">'+(j+1)+'</a></li>';
                j++;
            }
            
            html += '</ul></div>';
        }          
    } 
        
    map.fire('modal', {content: html, MODAL_CONTENT_CLS: 'modal-content pano'});
    
     initPanorama(_listaPanos[0].panorama);
     animate();
}

 /* Funcion openSidebarLayers
  * Abre un módulo lateral con opciónes 
  */
function openSidebarLayers() {
    sidebarFacultades.hide();
    sidebarLayers.toggle();
}

 /* Funcion openSidebarFacultades
  * Abre un módulo lateral con listado de Facultades 
  */
function openSidebarFacultades() {
    sidebarLayers.hide();
    sidebarFacultades.toggle();
}
/* Funcion openSidebarFacultades
  * Abre un módulo lateral con Información de profesores 
  */
function openSidebarInfo(data,tipo) {

    $('#profesor-info').empty();
    if (tipo === "profesores"){

        var asig = getAsignaturas(data.idprofesor);
        var panos = getPanoramas(data.idespacio.idespacio);
        var html = '<div class="list-group grupo-ficha">';
        
        html += '<div href="#" class="list-group-item active"><ul class="list-inline"><li><h4>'+data.nombre+'</h4></li>';    
        html += '<li class="icon-location" onclick="setPosition('+data.idespacio.idcoordenada.latitud+','+data.idespacio.idcoordenada.longitud+',21,\'true\')" ><img class="img-icon-location" src="images/social/location-inactivo.svg" title="Mostrar posici&oacute;n en el mapa" alt="Mostrar posici&oacute;n en el mapa"></li>';   
        html += '</ul>';
        html += '</div>';
        html += '<div class="redes-sociales list-group-item">';
        html += '<a class="redes" onclick="MostrarURL(\''+data.idprofesor+';profesor\');" title="Compartir Enlace" href="#"><img class="link" src="images/social/link-inactivo.svg" alt="enlace al Recurso"></a>';
        html += '<a class="redes" onclick="ShareTwitter(\''+data.idprofesor+';profesor\');" title="Compartir en Twitter" href="#"><img class="tw" src="images/social/tw-inactivo.svg" alt="Compartir Twitter"></a>';
        html += '<a class="redes" onclick="ShareFacebook(\''+data.idprofesor+';profesor\');" title="Compartir en Facebook" href="#"><img class="fb" src="images/social/fb-inactivo.svg" alt="Compartir Facebook"></a>';
        if (panos.length !== 0) {
            _listaPanos = panos;
            html += '<a class="redes" title="Ver Panoramas 360&deg;" onclick="openModalPano(\''+data.idespacio.nombre+'\');"><img class="icon-360" src="images/social/360-inactivo.png" alt="Panor&aacute;mica de 360 grados"></a>';
        }
        html += '</div>';
        html += '<div href="#" class="list-group-item"><h4>Departamento</h4><h5 class="ficha">'+data.departamento+'</h5></div>';
        html += '<div href="#" class="list-group-item"><h4>Correo</h4><h5 class="ficha"><a title="Enviar correo a '+data.nombre+'" alt="Enviar correo a '+data.nombre+'" href="mailto:'+data.correo+'">'+data.correo+'</a></h5></div>';
        html += '<div href="#" class="list-group-item"><h4>Despacho</h4><h5 class="ficha">'+data.idespacio.nombre+'</h5></div>';
        html += '<div href="#" class="list-group-item"><h4>Bloque</h4><h5 class="ficha">'+data.idespacio.bloque+'</h5></div>';
        html += '<div href="#" class="list-group-item"><h4>Piso</h4><h5 class="ficha">'+data.idespacio.piso+'</h5></div>';
        html += '<div href="#" class="list-group-item"><h4>Facultad</h4><div class="fichaFac"><img title="'+ data.idespacio.idedificio.nombre +'" class="img-fichaFac" src="' + _server+ data.idespacio.idedificio.chano + '" alt="'+ data.idespacio.idedificio.nombre +'"><h5 class="text-fichaFac">'+data.idespacio.idedificio.nombre+'</h5></div></div>';
        html += '<div href="#" class="list-group-item"><h4>Tutorias</h4>';
        
        if ((data.tutorias !== null)&&(String(data.tutorias) !== 'undefined')){
            
            var periodos = data.tutorias.split(';');
            if (periodos.length === 1){
                 if (periodos === 'yes'){
                     html += '<i class="material-icons md-36">contact_mail</i>';
                 } 
            }
            else if (periodos.length === 2 ){
                html += '<div class="row">';
                
                var tutos = periodos[0].split(',');
                var i = 0;
                while (i < tutos.length) {
                    if (i === 0){
                        html += '<div class="col-md-6">';
                    }
                    html += '<h5 class="ficha">' + tutos[i] + '</h5>';
                    if (i === tutos.length - 1){
                        html += '</div>';
                    }
                    i++;
                }
                
                if (periodos[1] === 'yes'){
                     html += '<div class="col-md-6 email" title="Participa en el programa de tutorias electrónicas" alt="Participa en el programa de tutorias electrónicas" ><i class="material-icons md-36">contact_mail</i><i class="material-icons md-36 done">done</i></div>';
                }
                else{
                    html += '<div class="col-md-6 email" title="No participa en el programa de tutorias electrónicas" alt="No participa en el programa de tutorias electrónicas" ><i class="material-icons md-36">contact_mail</i><i class="material-icons md-36 cross">clear</i></div>';
                }
                
                html += '</div>';
               
            }
            else if (periodos.length === 3){
                html += '<div class="row">';
                var tutos = periodos[0].split(',');
                var tutos2= periodos[1].split(',');
                var i = 0;
                
                html += '<div class="col-md-6">';
                html += '<h5>Primer Cuatrimestre</h5>';
                while (i < tutos.length) {
                    
                    html += '<h5 class="ficha">' + tutos[i] + '</h5>';
                    
                    i++;
                }
                i=0;
                
                html += '<h5>Segundo Cuatrimestre</h5>';
                while (i < tutos2.length) {
                    
                    html += '<h5 class="ficha">' + tutos2[i] + '</h5>';
                    i++;
                }
                html += '</div>';
                
                if (periodos[2] === 'yes'){
                     html += '<div class="col-md-6 email" title="Participa en el programa de tutorias electrónicas" alt="Participa en el programa de tutorias electrónicas" ><i class="material-icons md-36">contact_mail</i><i class="material-icons md-36 done">done</i></div>';
                }
                else{
                    html += '<div class="col-md-6 email" title="No participa en el programa de tutorias electrónicas" alt="No participa en el programa de tutorias electrónicas" ><i class="material-icons md-36">contact_mail</i><i class="material-icons md-36 cross">clear</i></div>';
                }
                
                html += '</div>';
                
            }
            else{
                html += '<h5 class="ficha">' + 'Informaci&oacute;n disponible en breve' + '</h5>';
            }
 
        }
        else{
            html += '<h5 class="ficha">' + 'Informaci&oacute;n disponible en breve' + '</h5>';
        }
        
        html += '</div>';
        
        html += '<div href="#" class="list-group-item"><h4>Asignaturas</h4>';
        if (asig.length !== 0) {
            var j=0;
            while (j <= asig.length - 1) {
                html += '<h5 class="ficha">' + asig[j].nombre + '</h5>';
                j++;
            }
        }
        else{
            html += '<h5 class="ficha">' + 'Información disponible en breve' + '</h5>';
        }
        html += '</div></div>';
        html += '<script>$(document).ready(function(){ $( "img.fb" ).hover( function() {$( this ).attr("src","images/social/fb-activo.svg" ); }, function() { $( this ).attr("src","images/social/fb-inactivo.svg");});});  </script>';
        html += '<script>$(document).ready(function(){ $( "img.tw" ).hover( function() {$( this ).attr("src","images/social/tw-activo.svg" ); }, function() { $( this ).attr("src","images/social/tw-inactivo.svg");});});  </script>';
        html += '<script>$(document).ready(function(){ $( "img.link" ).hover( function() {$( this ).attr("src","images/social/link-activo.svg" ); }, function() { $( this ).attr("src","images/social/link-inactivo.svg");});});  </script>';
        html += '<script>$(document).ready(function(){ $( "img.icon-360" ).hover( function() {$( this ).attr("src","images/social/360-activo.png" ); }, function() { $( this ).attr("src","images/social/360-inactivo.png");});});  </script>';
        
        addMarker(data.idespacio.idcoordenada.latitud, data.idespacio.idcoordenada.longitud);
        
        $('#sidebarInfo .sidebar-header .sidebar-header-icon span').attr('class', '').attr('class','fa fa-graduation-cap');
    }
    else if (tipo === "espacios"){
        var panos = getPanoramas(data.idespacio);
        var html = '<div class="list-group grupo-ficha">';
        
        html += '<div href="#" class="list-group-item active"><ul class="list-inline"><li><h4>'+data.nombre+'</h4></li>';
        html += '<li class="icon-location" onclick="setPosition('+data.idcoordenada.latitud+','+data.idcoordenada.longitud+',22,\'true\')" ><img class="img-icon-location" src="images/social/location-inactivo.svg" title="Mostrar posici&oacute;n en el mapa" alt="Mostrar posici&oacute;n en el mapa"></li>';    
        html += '</ul>';
        html += '</div>';
        html += '<div class="redes-sociales list-group-item">';
        html += '<a class="redes" onclick="MostrarURL(\''+data.idespacio+';espacio\');" title="Link" href="#"><img class="link" src="images/social/link-inactivo.svg" alt="enlace al Recurso"></a>';
        html += '<a class="redes" onclick="ShareTwitter(\''+data.idespacio+';espacio\');" title="Twitter" href="#"><img class="tw" src="images/social/tw-inactivo.svg" alt="Compartir Twitter"></a>';
        html += '<a class="redes" onclick="ShareFacebook(\''+data.idespacio+';espacio\');" title="Facebook" href="#"><img class="fb" src="images/social/fb-inactivo.svg" alt="Compartir Facebook"></a>';
        
        if (panos.length !== 0) {
            _listaPanos = panos;
            html += '<a class="redes" title="Ver Panoramas 360&deg;" onclick="openModalPano(\''+data.idespacio.nombre+'\');"><img class="icon-360" src="images/social/360-inactivo.png" alt="Panor&aacute;mica de 360 grados"></a>';
        }
        html += '</div>';
        html += '<div href="#" class="list-group-item"><h4>Descripcion</h4><h5 class="ficha">'+data.descripcion+'</h5></div>';
        html += '<div href="#" class="list-group-item"><h4>Bloque</h4><h5 class="ficha">'+data.bloque+'</h5></div>';
        html += '<div href="#" class="list-group-item"><h4>Piso</h4><h5 class="ficha">'+data.piso+'</h5></div>';
        html += '<div href="#" class="list-group-item"><h4>Facultad</h4><div class="fichaFac"><img class="img-fichaFac" src="' + _server+ data.idedificio.chano + '" alt="'+ data.idedificio.nombre +'"><h5 class="text-fichaFac">'+data.idedificio.nombre+'</h5></div></div>';
        html += '<div href="#" class="list-group-item"><h4>Tipo</h4><h5 class="ficha">'+data.tipo+'</h5></div>';
        html += '</div>';
       
        html += '<script>$(document).ready(function(){ $( "img.fb" ).hover( function() {$( this ).attr("src","images/social/fb-activo.svg" ); }, function() { $( this ).attr("src","images/social/fb-inactivo.svg");});});  </script>';
        html += '<script>$(document).ready(function(){ $( "img.tw" ).hover( function() {$( this ).attr("src","images/social/tw-activo.svg" );  }, function() { $( this ).attr("src","images/social/tw-inactivo.svg");});});  </script>';
        html += '<script>$(document).ready(function(){ $( "img.link" ).hover( function() {$( this ).attr("src","images/social/link-activo.svg" ); }, function() { $( this ).attr("src","images/social/link-inactivo.svg");});});  </script>';
        html += '<script>$(document).ready(function(){ $( "img.icon-360" ).hover( function() {$( this ).attr("src","images/social/360-activo.png" ); }, function() { $( this ).attr("src","images/social/360-inactivo.png");});});  </script>';
        
        addMarker(data.idcoordenada.latitud, data.idcoordenada.longitud);
    }

    $(html).appendTo('#profesor-info');
    sidebarLayers.hide();
    sidebarInfo.toggle();
    if (!$('.easy-button-container').hasClass("visible")){
        $('.easy-button-container').addClass("visible");
    }
}


 /* Funcion closeAllSidebars
  * Cierra todos los sidebar existentes 
  */
function closeAllSidebars() {
    sidebarFacultades.hide();
    sidebarLayers.hide();
    sidebarInfo.hide();
    clearMarkerSearch();
    BorrarArea();
    if ($('.easy-button-container').hasClass("visible")){
        $('.easy-button-container').removeClass("visible");  
    }
}

/* Funcion MostrarArea
 * Muestra el area que ocupa el espacio
 * @param {Blob} data
 * 
 */
function MostrarArea(data){
    var coords = data.split(',');
    var points = [];
    
    for (i=0; i < coords.length-1; i+=2){
        points.push(new L.LatLng(coords[i],coords[i+1]));
    }
    _area = new R.Polygon(points);
    map.addLayer(_area);    
}

/* Función BorrarArea
 * Elimina el area generada como resultado de una busqueda de espacio o profesor
 */
function BorrarArea(){
    map.removeLayer(_area);
}

/*
 * Función que modifica el mapa activo de acuerdo a los valores globales de:
 * tema, denominacion y nivel
 * 
 */
function ChangeMapLayer(){
    if (map.hasLayer(ETSEmap)) {
        map.removeLayer(ETSEmap);
    }
    ETSEmap = L.tileLayer(_server+ 'mapas/' + _tema + _toponimo + _nivelActual + '/{z}/{x}/{y}.png', {
        minZoom: _mapMinZoom,
        maxZoom: _mapMaxZoom,
        bounds: _mapBounds,
        zIndex: 7
    });
    
    map.addLayer(ETSEmap);

    if (_nivelActual === _nivelBusqueda){
             map.addLayer(_area);
    }
    else{
        map.removeLayer(_area);
    }
}


/*
 * Función de retorno GPS
 *  Recoge valores GPS y los envia a ShowPosition si es correcto
 *  Dispara showError si el GPS falla
 * 
 */
function getGPS() {
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, {enableHighAccuracy: true});
    } else {
        alert("NO GPS");
    }
}
/*
 * Función que muestra Posicion del GPS y coloca una marca geográfica
 * en el mapa
 * @param LatLong position
 * 
 */
function showPosition(position){
   
    if ($('.dropdown-menu li:first-child span.labelGPS').hasClass('label-success')) {
        //console.log("OFF");
        $('.dropdown-menu li:first-child span.labelGPS').removeClass('label-success');
        $('.dropdown-menu li:first-child span.labelGPS').addClass('label-danger');
        $('.dropdown-menu li:first-child span.labelGPS').html("OFF");
        map.removeLayer(layerGroupGPS);

    } else {
        //console.log("ON");
        $('.dropdown-menu li:first-child span.labelGPS').removeClass('label-danger');
        $('.dropdown-menu li:first-child span.labelGPS').addClass('label-success');
        $('.dropdown-menu li:first-child span.labelGPS').html("ON");
        var marker = L.marker(new L.LatLng(position.coords.latitude, position.coords.longitude),
                {icon: L.AwesomeMarkers.icon({
                        icon: 'location-arrow',
                        markerColor: 'lightblue',
                        prefix: 'fa',
                        iconColor: 'black'})
                }
        );
        var marker2 = L.marker(new L.LatLng(map.getCenter().lat, map.getCenter().lng));
        layerGroupGPS.addLayer(marker);
        
        var group = new L.featureGroup([marker, marker2]);

        map.fitBounds(group.getBounds());
        map.addLayer(layerGroupGPS);
       
    }    
}
/*
 * Añade Marcador al mapa
 * @returns {undefined}
 */
function addMarker(Lat,Lng){
    var marker = L.marker(new L.LatLng(Lat, Lng),
                {icon: L.AwesomeMarkers.icon({
                        icon: 'circle',
                        markerColor: 'blue',
                        prefix: 'fa',
                        iconColor: 'black'})
                }
        );
        layerGroupSearch.addLayer(marker);
    
}
function clearMarkerSearch (){
    layerGroupSearch.clearLayers();
      
}

function Buscador() {

    var html = '<div class="modal-header">';

    html += '   <h4 class="modal-title">Buscador</h4>';
    html += '            </div>';
    html += '           <div class="modal-body">';
    html += '              <p> Buscador que nos permite localizar cualquier estancia de la ETSE, desde el punto de vista de las personas, las estancias, las denominaciones de espacios, o las aulas .</p>';
    html += '              <ul class="nav nav-tabs">';
    html += '     <li class="active"><a data-toggle="tab" href="#busqueda-tab-todo"><span class="fa fa-search"></span><span class="modal-tab-text">Todo</span></a></li>';
    html += '     <li><a data-toggle="tab" href="#busqueda-tab-profesor"><span class="fa fa-users"></span><span class="modal-tab-text">Profesor</span></a></li>';
    html += '     <li><a data-toggle="tab" href="#busqueda-tab-asignatura"><span class="fa fa-graduation-cap"></span><span class="modal-tab-text">Asignatura</span></a></li>';
    html += '     <li><a data-toggle="tab" href="#busqueda-tab-espacio"><span class="fa fa-sitemap"></span><span class="modal-tab-text">Espacio</span></a></li>';
    html += ' </ul>';

    html += ' <div class="tab-content">';
    html += '     <div id="busqueda-tab-todo" class="tab-pane fade in active">';
    html += '         <div class="clearM1"></div>';
    html += '         <p><input type="text" class="typeahead" placeholder="Campo de texto"></p>';
    html += '         <div id="listaTodo">';

    html += '         </div>';
    html += '         <button id="localizar-all" type="button" class="btn btn-default" >Localizar</button>';
    html += '     </div>';

    html += '     <div id="busqueda-tab-profesor" class="tab-pane fade">';
    html += '         <div class="clearM1"></div>';
    html += '         <p><input type="text" class="typeahead" placeholder="Campo de texto"></p>';
    html += '         <input type="hidden" id="todo">';
    html += '         <div id = "resultados-profesor"></div>';
    html += '         <button id="localizar-profesor" type="button" class="btn btn-default"  >Localizar</button>';

    html += '     </div>';
    html += '     <div id="busqueda-tab-asignatura" class="tab-pane fade">';
    html += '         <div class="clearM1"></div>';
    html += '<p><input type="text" class="typeahead" placeholder="Campo de texto"></p>';

    html += '         <div id="listaDocentes">';

    html += '         </div>';
    html += '     </div>';
    html += '     <div id="busqueda-tab-espacio" class="tab-pane fade">';
    html += '         <div class="clearM1"></div>';
    html += '         <p><input type="text" class="typeahead" placeholder="Campo de texto"></p>';
    html += '         <button id="localizar-espacio" type="button" class="btn btn-default">Localizar</button>';

    html += '     </div>';
    html += '  </div>';
    html += '</div>';
    html += '<div class="modal-footer">';
    html += '      <button type="button" class="btn btn-default" onclick="ModalClose();">Close</button>';
    html += '     </div>';


    map.fire('modal', {content: html, MODAL_CONTENT_CLS: 'modal-content search'});
    typeahead();
    $('.search').css('margin-top', 100);
}

/*
 * Función que muestra en caso de error GPS
 * 
 */
function showError(error){
    console.log(error.code);
}

 /* Funciones JQuery
  * Disparadores para los cambios de estado de los
  * interruptores de las capas
  */
$(document).ready(function () {

    $("input[name=icons]").change(function () {
        var iconos = $('input:radio[name=icons]:checked').attr("value");
        if (iconos === "on") {
            map.addLayer(layerGroupFac);
            _iconos = true;
        } else {

            map.removeLayer(layerGroupFac);
            _iconos = false;
        }
        ChangeMapLayer();
    });
    $("input[name=tema]").change(function () {
        var tema = $('input:radio[name=tema]:checked').attr("value");
        if (tema === "c") {
            _tema = "c";
        } else {
            _tema = "b";
        }
        ChangeMapLayer();
    });
    $("input[name=denominacion]").change(function () {
        var denominacion = $('input:radio[name=denominacion]:checked').attr("value");
        if (denominacion === "d") {   
            _toponimo = "d";
        } else {
            _toponimo = "c";
        }
        ChangeMapLayer();
    });
    $("input[name=fondo]").change(function () {
        var fondo = $('input:radio[name=fondo]:checked').attr("value");
        if (fondo === "plano") {
            map.removeLayer(googleLayer);
            //map.removeLayer(osm);
            map.addLayer(mapboxTiles);
            _fondo = "plano";
        } else {
            map.removeLayer(mapboxTiles);
            //map.addLayer(osm);
            map.addLayer(googleLayer);
            _fondo = "sat";
        }
        ChangeMapLayer();
    });
    
    
    $("input[name=nivel]").change(function () {
        var nivel = $('input:radio[name=nivel]:checked').attr("value");
        
        if (nivel === "0") {
            map.addLayer(layerGroupFac);
            _nivelActual = "0";
        }
        if (nivel === "1") {
            map.addLayer(layerGroupFac);
            _nivelActual = "1";
        }
        if (nivel === "2") {
            map.addLayer(layerGroupFac);
            _nivelActual = "2";
        }
        if (nivel === "3") {
            map.addLayer(layerGroupFac);
            _nivelActual = "3";
        }
        ChangeMapLayer();
    });
     
    $(".nav a[data-colapse='true']").on('click', function () {
        if (isMobile.any()) {
            $('.btn-navbar').click(); //bootstrap 2.x
            $('.navbar-toggle').click(); //bootstrap 3.x by Richard
        }
});
    
    
    //SetOptionLayers();
});

function SetOptionLayers(){
    if (_fondo === "plano"){
        $('#fondoON').addClass('active');
        $('#fondoON input').prop('checked',true);
    }
    else{
        $('#fondoOFF').addClass('active');
        $('#fondoOFF input').prop('checked',true);
    }
    
    if (_tema === "c"){
        $('#temaON').addClass('active');
        $('#temaON input').prop('checked',true);
    }
    else{
        $('#temaOFF').addClass('active');
        $('#temaOFF input').prop('checked',true);
    }
    if (_toponimo === "d"){
        $('#topoON').addClass('active');
        $('#topoON input').prop('checked',true);
    }
    else{
        $('#topoOFF').addClass('active');
        $('#topoOFF input').prop('checked',true);
    }
    
    for (i=0; i<=3;i++){
        $('#P'+i).removeClass('lvlsearch');
        $('#P'+i).removeClass('active');
        $('#P'+i).children('input').prop('checked', false);
    }
    
    
    $('#P'+ _nivelActual).addClass('active');
    $('#P'+_nivelActual).children('input').prop('checked',true);
    $('#P'+ _nivelBusqueda).addClass('lvlsearch');
}

function showLegend(){
    var html = '<div class="tabbable" id="leyenda-tab"><ul class="nav nav-tabs"><li class="active"><a href="#panel-tema" data-toggle="tab">Tem&aacute;tico</a></li><li class=""><a href="#panel-iconos" data-toggle="tab">Iconos</a></li></ul></div>';
    html += '<div id="leyenda"><div class="tab-content">';
        html += '<div id="panel-tema" class="tab-pane active">';
        html += '<h3>Tem&aacute;tico</h3>';
        html += '<p>Composici&oacute;n optimizada para los que deseen diferenciar los distintos espacios que podemos encontrar en una planta de un edificio. Es al mismo tiempo muy &uacute;til s&iacute; deseamos hacer impresiones, en la que cada uso tiene un color diferenciado</p>';
        html += '<ul class="list-unstyled list-legend">';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #92cfea;"></div>Aula</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #c4fbdb;"></div>Laboratorio</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #c09f59;"></div>Despacho</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #5d8ddb;"></div>Aseo</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #f3d174;"></div>Cafeter&iacute;a</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #e299b8;"></div>Biblioteca</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #f5d940;"></div>Secretar&iacute;a</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #f38f2a;"></div>Conserjer&iacute;a</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #bcc3b9;"></div>Sala de Reuniones</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #000000;"></div>Sal&oacute;n de Actos</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #ad83c7;"></div>Varios</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #990000;"></div>Negocio</li>';
        html += '</ul></div>';
    
    html += '<div id="panel-iconos" class="tab-pane">';
        html += '<h3>Elementos gr&aacute;ficos</h3>';
        html += '<p>Podemos encontrar varios tipo de iconos en el mapa, algunos corresponden a edificios o campus y se muestran u ocultan en funcion del nivel de zoom o mediante configurción de las capas, permitiendo incluso hacer click para ver información adicional. El resto forman parte del GPS que nos indicará nuestra localización en el mapa respecto de nuestra visualización actual.</p>';
        html += '<div class="row clearfix">';
        html += '<div class="col-md-6 column">';
        html += '<h4>Iconos</h4>';
        html += '<ul class="list-unstyled list-graficos">';
            html += '<li><div class="legend-marker" data-icon="facultad"></div>Facultad o Escuela</li>';
            html += '<li><div class="legend-marker" data-icon="campus"></div>Campus</li>';
            html += '<li><div class="legend-marker" data-icon="gps"></div>Localizaci&oacute;n de GPS</li>';
            html += '<li><div class="legend-marker" data-icon="search"></div>Localizaci&oacute;n de b&uacute;squeda</li>';
        html += '</ul></div>';
    html += '<div class="col-md-6 column">';
        html += '<h4>Marcadores</h4>';
        html += '<ul class="list-unstyled list-icon">';
            html += '<li><div class="legend-icon"><img src="images/social/360-inactivo.png"></div>Panor&aacute;mica 360 grados</li>';
            html += '<li><div class="legend-icon"><i class="fa fa-link iconlegend" aria-hidden="true"></i></div>Compartir Enlace</li>';
            html += '<li><div class="legend-icon"><i class="fa fa-twitter iconlegend" aria-hidden="true"></i></div>Compartir en Twitter</li>';
            html += '<li><div class="legend-icon"><i class="fa fa-facebook iconlegend" aria-hidden="true"></i></div>Compartir en Facebook</li>';
            html += '<li><div class="legend-icon"><i class="fa fa-bookmark iconlegend" aria-hidden="true"></i></div>Marcador de b&uacute;squeda</li>';
        html += '</ul></div>';
    html += '</div></div>';
    html += '</div></div></div>';
    
    map.fire('modal',{content:html});
}
function showHelp(){ //cambiar contenido
    var html = '<div class="tabbable" id="leyenda-tab"><ul class="nav nav-tabs"><li class="active"><a href="#panel-tema" data-toggle="tab">Tem&aacute;tico</a></li><li class=""><a href="#panel-iconos" data-toggle="tab">Iconos</a></li></ul></div>';
    html += '<div id="leyenda"><div class="tab-content">';
        html += '<div id="panel-tema" class="tab-pane active">';
        html += '<h3>Tem&aacute;tico</h3>';
        html += '<p>Composici&oacute;n optimizada para los que deseen diferenciar los distintos espacios que podemos encontrar en una planta de un edificio. Es al mismo tiempo muy &uacute;til s&iacute; deseamos hacer impresiones, en la que cada uso tiene un color diferenciado</p>';
        html += '<ul class="list-unstyled list-legend">';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #92cfea;"></div>Aula</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #c4fbdb;"></div>Laboratorio</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #c09f59;"></div>Despacho</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #5d8ddb;"></div>Aseo</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #f3d174;"></div>Cafeter&iacute;a</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #e299b8;"></div>Biblioteca</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #f5d940;"></div>Secretar&iacute;a</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #f38f2a;"></div>Conserjer&iacute;a</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #bcc3b9;"></div>Sala de Reuniones</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #000000;"></div>Sal&oacute;n de Actos</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #ad83c7;"></div>Varios</li>';
            html += '<li class="categoria"><div class="legend-thumb" style="background-color: #990000;"></div>Negocio</li>';
        html += '</ul></div>';
    
    html += '<div id="panel-iconos" class="tab-pane">';
        html += '<h3>Elementos gr&aacute;ficos</h3>';
        html += '<p>Podemos encontrar varios tipo de iconos en el mapa, algunos corresponden a edificios o campus y se muestran u ocultan en funcion del nivel de zoom o mediante configurción de las capas, permitiendo incluso hacer click para ver información adicional. El resto forman parte del GPS que nos indicará nuestra localización en el mapa respecto de nuestra visualización actual.</p>';
        html += '<div class="row clearfix">';
        html += '<div class="col-md-6 column">';
        html += '<h4>Iconos</h4>';
        html += '<ul class="list-unstyled list-graficos">';
            html += '<li><div class="legend-marker" data-icon="facultad"></div>Facultad o Escuela</li>';
            html += '<li><div class="legend-marker" data-icon="campus"></div>Campus</li>';
            html += '<li><div class="legend-marker" data-icon="gps"></div>Localizaci&oacute;n de GPS</li>';
            html += '<li><div class="legend-marker" data-icon="search"></div>Localizaci&oacute;n de b&uacute;squeda</li>';
        html += '</ul></div>';
    html += '<div class="col-md-6 column">';
        html += '<h4>Marcadores</h4>';
        html += '<ul class="list-unstyled list-icon">';
            html += '<li><div class="legend-icon"><img src="images/social/360-inactivo.png"></div>Panor&aacute;mica 360 grados</li>';
            html += '<li><div class="legend-icon"><i class="fa fa-link iconlegend" aria-hidden="true"></i></div>Compartir Enlace</li>';
            html += '<li><div class="legend-icon"><i class="fa fa-twitter iconlegend" aria-hidden="true"></i></div>Compartir en Twitter</li>';
            html += '<li><div class="legend-icon"><i class="fa fa-facebook iconlegend" aria-hidden="true"></i></div>Compartir en Facebook</li>';
            html += '<li><div class="legend-icon"><i class="fa fa-bookmark iconlegend" aria-hidden="true"></i></div>Marcador de b&uacute;squeda</li>';
        html += '</ul></div>';
    html += '</div></div>';
    html += '</div></div></div>';
    
    map.fire('modal',{content:html});
}