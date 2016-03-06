/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global L, Facultades, restaurants, map */



function init() {
    
    /* Variables Globales   */
    _fondo = true;
    _tema = true;
    _iconos = true;
    _nivel = "PB";
    
    /* Variables  */
    var surOeste = new L.LatLng(39.511948, -0.425012);
    var norEste = new L.LatLng(39.513769, -0.422732);
    var mapBounds = new L.LatLngBounds(surOeste, norEste);
    var mapMinZoom = 5;
    var mapMaxZoom = 25;
    var centro = [39.512859, -0.4244782];
    L.mapbox.accessToken = 'pk.eyJ1IjoidWJ1c3R1cyIsImEiOiJjaWs2bjhidDMwMHc1cDdrc2o4cnpkdWhkIn0.Nrk8FVCyADAGWSIGm86yBQ';


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
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        unloadInvisibleTiles: true,
        opacity: 1.00
    });

    googleLayer = new L.Google('SATELLITE');
    
    var points = [];
    //points.push(centro);
    points.push(new L.LatLng(39.51259, -0.42414));
    points.push(new L.LatLng(39.51256, -0.42409));
    points.push(new L.LatLng(39.51251, -0.42416));
    points.push(new L.LatLng(39.51253, -0.42419));
    var p = new R.Polygon(points);
    map.addLayer(p);
    //map.addLayer(new R.Marker(centro));
    

    osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        unloadInvisibleTiles: true,
        opacity: 1.00
    });
    /*PB = L.tileLayer('http://www.adretse.es/mapEtse/{z}/{x}/{y}.png', {
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        bounds: mapBounds,
        zIndex: 7
    });*/
    PB = L.tileLayer('http://www.adretse.es/siguv/bc0/{z}/{x}/{y}.png', {
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        bounds: mapBounds,
        zIndex: 7
    });

    /* Añadido de Capas */
    map.addLayer(mapboxTiles);
    map.addLayer(PB);
    


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

    /*
     * Grupos de capas de Marcadores JSON
     */
    layerGroup = L.layerGroup().addTo(map);
    layerGroupC = L.layerGroup().addTo(map);

    map.addControl(new L.Control.Layers({'OSM': osm, 'MBT': mapboxTiles, 'Google Terrain': googleLayer}, {'ETSE': PB, "Markers": layerGroup}));

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


    /*map.on('click', function(e) {
     alert(e.latlng);
     });*/

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

 /* Funcion closeAllSidebars
  * Cierra todos los sidebar existentes 
  */
function closeAllSidebars() {
    sidebarFacultades.hide();
    sidebarLayers.hide();
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
    $("input[name=tipologia]").change(function () {

        var iconos = $('input:radio[name=tipologia]:checked').attr("value");
        if (iconos === "on") {
            map.addLayer(PB);
            _tema = true;
        } else {

            map.removeLayer(PB);
            _tema = false;
        }
        //alert("The text has been changed."+iconos);



    });
    $("input[name=fondo]").change(function () {

        var iconos = $('input:radio[name=fondo]:checked').attr("value");
        if (iconos === "on") {
            map.removeLayer(osm);
            map.addLayer(mapboxTiles);
            _fondo = true;
        } else {
            map.removeLayer(mapboxTiles);
            map.addLayer(osm);
            _fondo = false;

        }
        //alert("The text has been changed."+iconos);



    });
    
    
    $("input[name=nivel]").change(function () {

        var iconos = $('input:radio[name=nivel]:checked').attr("value");
        if (iconos === "PB") {
            map.addLayer(layerGroup);
            _nivel = "PB";
        }
        if (iconos === "P1") {
            map.addLayer(layerGroup);
            _nivel = "P1";
        }
        if (iconos === "P2") {
            map.addLayer(layerGroup);
            _nivel = "P2";
        }
        if (iconos === "P3") {
            map.addLayer(layerGroup);
            _nivel = "P3";
        }
        
        
        
        //alert("The text has been changed."+iconos);



    });

});

/*
 function toogleIcons(){
 
 
 
 $('#iconsOFF').on('click',function (e){
 //$("#building").click(function (event) {
 e.preventDefault();
 
 alert('hala');
 if (aux) {
 //$(this).removeClass('selected');
 map.removeLayer(layerGroup);
 
 
 } else {
 map.addLayer(layerGroup);
 //$(this).addClass('selected');
 
 }
 });
 aux = !aux;
 }*/