/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




/* global _serverDB */

function DefaultMap(){
    _nivel = "0";
    centro = [39.512859, -0.4244782];
    _currentPosition = centro;
    _zoom = 18;
}

function init() {
    /* Recogemos variable de query String */
    queryString = GetQueryStringParams("id");
    _data = "";
    
    /* Consulta de Query */
    if (typeof (queryString) !== 'undefined'){
        var req = $.ajax({
        type: 'GET',
        url: _serverDB + 'webresources/espacios/' + queryString,
        dataType: 'json',
        success: function(response, textStatus, errorThrown) {
                /* Respuesta correcta */
                if(textStatus === 'success'){
                    //console.log("done");
                    _nivel = response.piso;
                    //console.log(response.idcoordenada.latitud);
                    centro = [response.idcoordenada.latitud, response.idcoordenada.longitud];
                    _currentPosition = centro;
                    _zoom = 22;
                    _queryMode = true;
                    _data = response;
                    
                }
                /* Respuesta errónea */
                else{
                    //console.log("fail");
                    DefaultMap();
                }
        },
        async: false
    });
    /* Respuesta por defecto sin queryString */
    }
    else{
        DefaultMap();
    }
    
    /* Variables Globales   */
    _fondo = "plano";
    _tema = "b";
    _iconos = true;
    //_nivel = "0";
    _toponimo = "d";
    
    /* Variables  */
    var surOeste = new L.LatLng(39.51171412912667, -0.42497992515563965);
    var norEste = new L.LatLng(39.5138330698016, -0.42219042778015137);
    _mapBounds = new L.LatLngBounds(surOeste, norEste);
    _mapMinZoom = 5;
    _mapMaxZoom = 23;
    
    

    /* Inicialización Mapa */
    map = L.map('map', {center: centro, zoom: _zoom, zoomControl: false});

    /* Capas 
     * mapboxTiles = Mapbox.com  
     * osm = Open Street View    
     * googleLayer = Google Maps 
     * PB = Planos planta Baja   
     */
    mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/ubustus.p2c7e9pf/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>',
        minZoom: _mapMinZoom,
        maxZoom: _mapMaxZoom,
        unloadInvisibleTiles: true,
        opacity: 1.00
    });

    googleLayer = new L.Google('SATELLITE');
    
    //var points = [];
    //points.push(centro);
    //points.push(new L.LatLng(39.51171412912667, -0.42497992515563965));
    //points.push(new L.LatLng(39.51349371255555, -0.422447919845581));
    /*points.push(new L.LatLng(39.51251184338205, -0.4241621866822243));
    points.push(new L.LatLng(39.51253176025503, -0.4241863265633583));
    
    points.push(new L.LatLng(39.51252425909576, -0.4241973906755447));
    points.push(new L.LatLng(39.51254521060758, -0.4242201894521713));
    points.push(new L.LatLng(39.5125586609575, -0.42419973760843277));
    points.push(new L.LatLng(39.512556591673054, -0.42419638484716415));*/
    //var p = new R.Polygon(points);
    //map.addLayer(p);
    //map.addLayer(new R.Marker(centro));
    

    /*osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: _mapMinZoom,
        maxZoom: _mapMaxZoom,
        unloadInvisibleTiles: true,
        opacity: 1.00
    });*/
    
    ETSEmap = L.tileLayer(_server+ 'mapas/'+ _tema + _toponimo +_nivel+'/{z}/{x}/{y}.png', {
        minZoom: _mapMinZoom,
        maxZoom: _mapMaxZoom,
        bounds: _mapBounds,
        zIndex: 7
    });
    //console.log(_server+_tema + _toponimo +_nivel);
    /* Añadido de Capas */
    map.addLayer(mapboxTiles);
    map.addLayer(ETSEmap);
    
    


    //Sidebar
    sidebarLayers = L.control.sidebar('sidebarLayers', {
        closeButton: true,
        position: 'left'
    });
    map.addControl(sidebarLayers);

    sidebarFacultades = L.control.sidebar('sidebarFacultades', {
        closeButton: true,
        position: 'left'
    });
    map.addControl(sidebarFacultades);
    sidebarInfo = L.control.sidebar('sidebarInfo', {
        closeButton: true,
        position: 'left'
    });
    map.addControl(sidebarInfo);

    /*
     * Grupos de capas de Marcadores JSON
     */
    layerGroupFac = L.layerGroup().addTo(map);
    layerGroupCam = L.layerGroup().addTo(map);
    layerGroupGPS = L.layerGroup();
    layerGroupSearch = L.layerGroup().addTo(map);
    
    
    

    //map.addControl(new L.Control.Layers({ 'MBT': mapboxTiles, 'Google Terrain': googleLayer}, {'ETSE': ETSEmap, "Markers": layerGroup}));

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
        onEachFeature: onEachFeature
    }).addTo(map);

    L.geoJson(Campus, {
        pointToLayer: function (feature, coordinates) {
            var geoMarker = (L.marker(coordinates, {icon: L.AwesomeMarkers.icon({icon: 'university', markerColor: 'green', prefix: 'fa', iconColor: 'black'})}));
            layerGroupCam.addLayer(geoMarker);
            return geoMarker;
        },
        onEachFeature: onEachFeature
    }).addTo(map);
    
    /*
     * Funcion onEachFeature
     * @param {type} feature: características del JSON
     * @param {type} layer:   capas
     * 
     */

    function onEachFeature(feature, layer) {
        var popupContent = "<p>" + feature.properties.name + "</p>";

        if (feature.properties && feature.properties.popupContent) {
            popupContent += feature.properties.popupContent;
        }

        layer.bindPopup(popupContent);
    }

    
    map.on('click', function(e) {
     console.log(e.latlng.lat+","+e.latlng.lng);
     
     });
    

    /*
     * Función tras cambiar zoom en el mapa
     * Se ocultan y muestran las capas ...... y ....
     */
    map.on('zoomend', function () {

        // (map.getZoom > 10)
        
        if (map.getZoom() < 18) {
            $("#nivel").removeClass('level');
            $("#nivel").addClass('levelOFF');
            map.removeLayer(layerGroupFac);
            map.addLayer(layerGroupCam);
        } 
        if(map.getZoom() >= 18){
            $("#nivel").addClass('level');
            $("#nivel").removeClass('levelOFF');
            map.addLayer(layerGroupFac);
            map.removeLayer(layerGroupCam);
        }
        else {
            //map.featureLayer.setFilter(function() { return false; });
        }
    });
    //var group = new L.featureGroup([L, marker2]);
    if (_queryMode){
        openSidebarInfo(_data, "espacios");
        
    }
    
    SetOptionLayers();
    
}

/* Funciones */


function setPosition(lat, long, zoom){
    map.setView(new L.LatLng(lat, long), 22,{animation: true});
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
    //console.log(dat a);
    $('#profesor-info').empty();
    
    if (tipo === "profesores"){
        var html = '<div >'+data.nombre+'</div>';
        html += '<div>' + data.idespacio.idespacio + '</div>';
        html += '<div>' + data.correo + '</div>';
        html += '<div>' + data.idespacio.nombre + '</div>';
        html += '<div>' + data.idespacio.descripcion + '</div>';
        html += '<div><img width= "50px" src=" ' + _server+ data.idespacio.idedificio.chano + '">' + data.idespacio.idedificio.nombre + '</div>';
        addMarker(data.idespacio.idcoordenada.latitud, data.idespacio.idcoordenada.longitud);
        
        $('#sidebarInfo .sidebar-header .sidebar-header-icon span').attr('class', '').attr('class','fa fa-graduation-cap');
    }
    else{
        var html = '<div >'+data.nombre+'</div>';
        html += '<div>' + data.idespacio.idespacio + '</div>';
        html += '<div>' + data.bloque + '</div>';
        html += '<div>' + data.idespacio.nombre + '</div>';
        html += '<div>' + data.idespacio.descripcion + '</div>';
        html += '<div><img width= "50px" src=" ' + _server + data.idedificio.chano + '">' + data.idedificio.nombre + '</div>';
        addMarker(data.idcoordenada.latitud, data.idcoordenada.longitud);
    }
    //console.log(data.idespacio.boundingbox);
    //console.log(_server+data.chano);
    //alert(data.nombre);

    //html += "</tbody></table>";
    $(html).appendTo('#profesor-info');
    sidebarLayers.hide();
    sidebarInfo.toggle();
    
}

 /* Funcion closeAllSidebars
  * Cierra todos los sidebar existentes 
  */
function closeAllSidebars() {
    sidebarFacultades.hide();
    sidebarLayers.hide();
    sidebarInfo.hide();
    clearMarkerSearch();
}

/* Funcion MostrarArea
 * Muestra el area que ocupa el espacio
 * @param {Blob} data
 * 
 */
function MostrarArea(data){
    coords = data.split(',');
    //console.log(data);
    //console.log(coords);
    //console.log(coords.length);
    //console.log(coords.size());
    var points = [];
    /*for (i=0; i<coords.length-1;i++){
        //points.push(coords[i]);
        //points.push(coords[i+1]);
        console.log(coords[i]);
    
    }*/
    //points.push(centro);
    /*points.push(new L.LatLng(39.51171412912667, -0.42497992515563965));
    points.push(new L.LatLng(39.51349371255555, -0.422447919845581));
    points.push(new L.LatLng(39.51251184338205, -0.4241621866822243));
    points.push(new L.LatLng(39.51253176025503, -0.4241863265633583));
    
    points.push(new L.LatLng(39.51252425909576, -0.4241973906755447));
    points.push(new L.LatLng(39.51254521060758, -0.4242201894521713));
    points.push(new L.LatLng(39.5125586609575, -0.42419973760843277));
    points.push(new L.LatLng(39.512556591673054, -0.42419638484716415));*/
    var p = new R.Polygon(points);
    map.addLayer(p);
    //map.addLayer(new R.Marker(centro));
    
    
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
    ETSEmap = L.tileLayer(_server+ 'mapas/' + _tema + _toponimo + _nivel + '/{z}/{x}/{y}.png', {
        minZoom: _mapMinZoom,
        maxZoom: _mapMaxZoom,
        bounds: _mapBounds,
        zIndex: 7
    });
    
    map.addLayer(ETSEmap);
}


/*
 * Función de retorno GPS
 *  Recoge valores GPS y los envia a ShowPosition si es correcto
 *  Dispara showError si el GPS falla
 * 
 */
function getGPS(){
    navigator.geolocation.getCurrentPosition(showPosition,showError);
}
/*
 * Función que muestra Posicion del GPS y coloca una marca geográfica
 * en el mapa
 * @param LatLong position
 * 
 */
function showPosition(position){

   
    if ($('.dropdown-menu li:first-child span.labelGPS').hasClass('label-success')) {
        console.log("OFF");
        $('.dropdown-menu li:first-child span.labelGPS').removeClass('label-success');
        $('.dropdown-menu li:first-child span.labelGPS').addClass('label-danger');
        $('.dropdown-menu li:first-child span.labelGPS').html("OFF");
        map.removeLayer(layerGroupGPS);

    } else {
        console.log("ON");
        $('.dropdown-menu li:first-child span.labelGPS').removeClass('label-danger');
        $('.dropdown-menu li:first-child span.labelGPS').addClass('label-success');
        $('.dropdown-menu li:first-child span.labelGPS').html("ON");
        var marker = L.marker(new L.LatLng(position.coords.latitude, position.coords.longitude),
                {icon: L.AwesomeMarkers.icon({
                        icon: 'location-arrow',
                        markerColor: 'blue',
                        prefix: 'fa',
                        iconColor: 'black'})
                }
        );
        var marker2 = L.marker(new L.LatLng(map.getCenter().lat, map.getCenter().lng));
        layerGroupGPS.addLayer(marker);
        
        var group = new L.featureGroup([marker, marker2]);

        map.fitBounds(group.getBounds());
        map.addLayer(layerGroupGPS);
        
        //console.log(map.getCenter().lat);
        //console.log(map.getCenter().lng);
        
        //setPosition(position.coords.latitude, position.coords.longitude, 21);
       
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

function ShowArea(data){
    console.log();
    //var points = [];
    //points.push(centro);
    //points.push(new L.LatLng(39.51171412912667, -0.42497992515563965));
    //points.push(new L.LatLng(39.51349371255555, -0.422447919845581));
    /*points.push(new L.LatLng(39.51251184338205, -0.4241621866822243));
    points.push(new L.LatLng(39.51253176025503, -0.4241863265633583));
    
    points.push(new L.LatLng(39.51252425909576, -0.4241973906755447));
    points.push(new L.LatLng(39.51254521060758, -0.4242201894521713));
    points.push(new L.LatLng(39.5125586609575, -0.42419973760843277));
    points.push(new L.LatLng(39.512556591673054, -0.42419638484716415));*/
    //var p = new R.Polygon(points);
    //map.addLayer(p);
    //map.addLayer(new R.Marker(centro));
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
        //alert("The text has been changed."+iconos);
    });
    $("input[name=tema]").change(function () {
        var tema = $('input:radio[name=tema]:checked').attr("value");
        if (tema === "c") {
            _tema = "c";
        } else {
            _tema = "b";
        }
        ChangeMapLayer();
        //alert("The text has been changed."+iconos);
    });
    $("input[name=denominacion]").change(function () {
        var denominacion = $('input:radio[name=denominacion]:checked').attr("value");
        if (denominacion === "d") {   
            _toponimo = "d";
        } else {
            _toponimo = "c";
        }
        ChangeMapLayer();
        //alert("The text has been changed."+iconos);
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
        //alert("The text has been changed."+iconos);
    });
    
    
    $("input[name=nivel]").change(function () {
        var nivel = $('input:radio[name=nivel]:checked').attr("value");
        
        if (nivel === "0") {
            map.addLayer(layerGroupFac);
            _nivel = "0";
        }
        if (nivel === "1") {
            map.addLayer(layerGroupFac);
            _nivel = "1";
        }
        if (nivel === "2") {
            map.addLayer(layerGroupFac);
            _nivel = "2";
        }
        if (nivel === "3") {
            map.addLayer(layerGroupFac);
            _nivel = "3";
        }
        ChangeMapLayer();
          //alert("The text has been changed."+iconos);
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
        $('#P'+i).removeClass('active');
        $('#P'+i).children('input').prop('checked', false);
    }
    $('#P'+ _nivel).addClass('active');
    $('#P'+_nivel).children('input').prop('checked',true);
}