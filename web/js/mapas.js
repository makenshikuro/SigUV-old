/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global L, Facultades, restaurants, map */

function init() {

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

    googleLayer = new L.Google('ROADMAP');

    osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        unloadInvisibleTiles: true,
        opacity: 1.00
    });
    PB = L.tileLayer('http://www.adretse.es/maps/{z}/{x}/{y}.png', {
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        bounds: mapBounds,
        zIndex: 7
    });

    /* Añadido de Capas */
    map.addLayer(mapboxTiles);
    map.addLayer(PB);
    //map.addControl(new L.Control.Layers({'OSM': osm, 'MBT': mapboxTiles, 'Google Terrain': googleLayer}, {'ETSE': PB, "Markers": layerGroup}));


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
        if (map.getZoom() === 13) {
            // setFilter is available on L.mapbox.featureLayers only. Here
            // we're hiding and showing the default marker layer that's attached
            // to the map - change the reference if you want to hide or show a
            // different featureLayer.
            // If you want to hide or show a different kind of layer, you can use
            // similar methods like .setOpacity(0) and .setOpacity(1)
            // to hide or show it.
            //map.featureLayer.setFilter(function() { return true; });
        } else {
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
        } else {

            map.removeLayer(layerGroup);
        }
        //alert("The text has been changed."+iconos);



    });
    $("input[name=tipologia]").change(function () {

        var iconos = $('input:radio[name=tipologia]:checked').attr("value");
        if (iconos === "on") {
            map.addLayer(PB);
        } else {

            map.removeLayer(PB);
        }
        //alert("The text has been changed."+iconos);



    });
    $("input[name=fondo]").change(function () {

        var iconos = $('input:radio[name=fondo]:checked').attr("value");
        if (iconos === "on") {
            map.removeLayer(osm);
            map.addLayer(mapboxTiles);
        } else {
            map.removeLayer(mapboxTiles);
            map.addLayer(osm);

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