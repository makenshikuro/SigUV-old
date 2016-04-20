/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


<<<<<<< HEAD
/* global L, Facultades, restaurants, map, Campus, query */


=======
function showPosition(position){
    console.log(position.coords.latitude);
}
function showError(error){
    console.log(error.code);
}

/* global _serverDB */

function DefaultMap(){
    _nivel = "2";
    centro = [39.512859, -0.4244782];
    _zoom = 18;
}
>>>>>>> parent of 9ed79e0... GPS y Markers

function init() {
   
    /* Recogemos variable de query String */
    queryString = GetQueryStringParams("id");
    //console.log(queryString);
    
    
    /*$.getJSON(_serverDB + 'webresources/espacios/'+ queryString , function (data) {
        console.log(data);
    });*/
    
    if (typeof (queryString) !== 'undefined'){
<<<<<<< HEAD
        var query = BuscarEspacio(queryString);
        console.log("query");
        console.log(query);
=======
        var req = $.ajax({
        type: 'GET',
        url: _serverDB + 'webresources/espacios/' + queryString,
        dataType: 'json',
        success: function(response, textStatus, errorThrown) {
                /* Respuesta correcta */
                if(textStatus === 'success'){
                    console.log("done");
                    _nivel = response.piso;
                    //console.log(response.idcoordenada.latitud);
                    centro = [response.idcoordenada.latitud, response.idcoordenada.longitud];
                    _zoom = 22;
                }
                /* Respuesta errónea */
                else{
                    console.log("fail");
                    DefaultMap();
                }
        },
        async: false
    });
    /* Respuesta por defecto sin queryString */
    }
    else{
        DefaultMap();
>>>>>>> parent of 9ed79e0... GPS y Markers
    }
    
    //console.log(queryString);
    
    
    /* Variables Globales   */
    _fondo = "plano";
    _tema = "c";
    _iconos = true;
    _denominacion = "d";
    _nivel = "0";
    _server = "http://www.adretse.es/siguv/";
    //_serverDB = "http://147.156.82.219:8080/siguvServer/";
    _serverDB = "http://localhost:8080/siguvServer/";
    
    /* Variables  */
    var surOeste = new L.LatLng(39.51171412912667, -0.42497992515563965);
    var norEste = new L.LatLng(39.51349371255555, -0.422447919845581);
    _mapBounds = new L.LatLngBounds(surOeste, norEste);
    //console.log("hola"+_mapBounds);
    _mapMinZoom = 5;
<<<<<<< HEAD
    _mapMaxZoom = 25;
    var centro = [39.512859, -0.4244782];
    L.mapbox.accessToken = 'pk.eyJ1IjoidWJ1c3R1cyIsImEiOiJjaWs2bjhidDMwMHc1cDdrc2o4cnpkdWhkIn0.Nrk8FVCyADAGWSIGm86yBQ';

=======
    _mapMaxZoom = 23;
    
    //navigator.geolocation.getCurrentPosition(showPosition,showError);
>>>>>>> parent of 9ed79e0... GPS y Markers

    /* Inicialización Mapa */
    map = L.map('map', {center: centro, zoom: 18, zoomControl: false});

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
    
    /*var points = [];
    //points.push(centro);
    points.push(new L.LatLng(39.512596166727214, -0.42413838207721705));
    points.push(new L.LatLng(39.51255788497585, -0.42409479618072504));
    points.push(new L.LatLng(39.51251184338205, -0.4241621866822243));
    points.push(new L.LatLng(39.51253176025503, -0.4241863265633583));
    
    points.push(new L.LatLng(39.51252425909576, -0.4241973906755447));
    points.push(new L.LatLng(39.51254521060758, -0.4242201894521713));
    points.push(new L.LatLng(39.5125586609575, -0.42419973760843277));
    points.push(new L.LatLng(39.512556591673054, -0.42419638484716415));
    var p = new R.Polygon(points);
    map.addLayer(p);*/
    //map.addLayer(new R.Marker(centro));
    

    /*osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: _mapMinZoom,
        maxZoom: _mapMaxZoom,
        unloadInvisibleTiles: true,
        opacity: 1.00
    });*/
    
    ETSEmap = L.tileLayer(_server+ _tema + _denominacion +'0'+'/{z}/{x}/{y}.png', {
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
    layerGroup = L.layerGroup().addTo(map);
    layerGroupC = L.layerGroup().addTo(map);

    map.addControl(new L.Control.Layers({ 'MBT': mapboxTiles, 'Google Terrain': googleLayer}, {'ETSE': ETSEmap, "Markers": layerGroup}));

    /* Marcadores GeoJSON
     *  Facultades:   Marcadores correspondientes a las facultades de la UV
     *  Campus:       Marcadores correspondientes a los campus de la UV
     * 
     */
    L.geoJson(Facultades, {
        pointToLayer: function (feature, coordinates) {
            var geoMarker = (L.marker(coordinates, {icon: L.AwesomeMarkers.icon({icon: 'graduation-cap', markerColor: 'red', prefix: 'fa', iconColor: 'black'})}));
            layerGroup.addLayer(geoMarker);
            return geoMarker;
        },
        onEachFeature: onEachFeature
    }).addTo(map);

    L.geoJson(Campus, {
        pointToLayer: function (feature, coordinates) {
            var geoMarker = (L.marker(coordinates, {icon: L.AwesomeMarkers.icon({icon: 'university', markerColor: 'green', prefix: 'fa', iconColor: 'black'})}));
            layerGroupC.addLayer(geoMarker);
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
     console.log(e.latlng);
     });

    /*
     * Función tras cambiar zoom en el mapa
     * Se ocultan y muestran las capas ...... y ....
     */
    map.on('zoomend', function () {
        // here's where you decided what zoom levels the layer should and should
        // not be available for: use javascript comparisons like < and > if
        // you want something other than just one zoom level, like
        // (map.getZoom > 10)
        console.log(map.getZoom());
        if (map.getZoom() < 18) {
            $("#nivel").removeClass('level');
            $("#nivel").addClass('levelOFF');
            
            // setFilter is available on L.mapbox.featureLayers only. Here
            // we're hiding and showing the default marker layer that's attached
            // to the map - change the reference if you want to hide or show a
            // different featureLayer.
            // If you want to hide or show a different kind of layer, you can use
            // similar methods like .setOpacity(0) and .setOpacity(1)
            // to hide or show it.
            //map.featureLayer.setFilter(function() { return true; });
        } 
        if(map.getZoom() >= 18){
            $("#nivel").addClass('level');
            $("#nivel").removeClass('levelOFF');
        }
        else {
            //map.featureLayer.setFilter(function() { return false; });
        }
    });

}

/* Funciones */

function setPosition(lat, long){
    //map.panTo(new L.LatLng(lat, long),{animation: true});
    map.setView(new L.LatLng(lat, long),21,{animation: true});
    
    //alert(lat, long);
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
function openSidebarInfo(data) {
    console.log(data);
    var html = '<div >'+data.nombre+'</div>';

    html += '<div>' + data.idespacio.idespacio + '</div>';
    html += '<div>' + data.correo + '</div>';
    html += '<div>' + data.idespacio.nombre + '</div>';
    html += '<div>' + data.idespacio.descripcion + '</div>';
    html += '<div><img width= "50px" src=" ' + _server + data.idespacio.idedificio.chano + '">' + data.idespacio.idedificio.nombre + '</div>';
    console.log(data.idespacio.boundingbox);
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
<<<<<<< HEAD
=======
    sidebarInfo.hide();
>>>>>>> parent of 9ed79e0... GPS y Markers
}
/*
 * Función que modifica el mapa activo de acuerdo a los valores globales de:
 * tema, denominacion y nivel
 * 
 */
function ChangeMapLayer(){
    ETSEmap = L.tileLayer('http://www.adretse.es/siguv/' + _tema + _denominacion + '0' + '/{z}/{x}/{y}.png', {
        minZoom: _mapMinZoom,
        maxZoom: _mapMaxZoom,
        bounds: _mapBounds,
        zIndex: 7
    });
    if (map.hasLayer(ETSEmap)) {
        map.removeLayer(ETSEmap);
    }
    map.addLayer(ETSEmap);
}

 /* Funciones JQuery
  * Disparadores para los cambios de estado de los
  * interruptores de las capas
  */
$(document).ready(function () {

    $("input[name=icons]").change(function () {
        var iconos = $('input:radio[name=icons]:checked').attr("value");
        if (iconos === "on") {
            map.addLayer(layerGroup);
            _iconos = true;
        } else {

            map.removeLayer(layerGroup);
            _iconos = false;
        }
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
            _denominacion = "d";
        } else {
            _denominacion = "c";
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
        //alert("The text has been changed."+iconos);
    });
    
    
    $("input[name=nivel]").change(function () {
        var nivel = $('input:radio[name=nivel]:checked').attr("value");
        if (nivel === "0") {
            map.addLayer(layerGroup);
            _nivel = "0";
        }
        if (nivel === "1") {
            map.addLayer(layerGroup);
            _nivel = "1";
        }
        if (nivel === "2") {
            map.addLayer(layerGroup);
            _nivel = "2";
        }
        if (nivel === "3") {
            map.addLayer(layerGroup);
            _nivel = "3";
        }
          //alert("The text has been changed."+iconos);
    });

});