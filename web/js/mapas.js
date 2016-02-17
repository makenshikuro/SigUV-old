/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global L, Facultades, restaurants, map */

function init() {

    /* Variables  */
    var mapBounds = new L.LatLngBounds(
            new L.LatLng(39.511948, -0.425012),
            new L.LatLng(39.513769, -0.422732));
    var mapMinZoom = 5;
    var mapMaxZoom = 25;


    map = L.map('map', {center: [39.512859, -0.4244782], zoom: 18});

    L.mapbox.accessToken = 'pk.eyJ1IjoidWJ1c3R1cyIsImEiOiJjaWs2bjhidDMwMHc1cDdrc2o4cnpkdWhkIn0.Nrk8FVCyADAGWSIGm86yBQ';
    // Replace 'mapbox.streets' with your map id.

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
    custom = L.tileLayer('http://www.adretse.es/mapEtse/{z}/{x}/{y}.png', {
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        bounds: mapBounds,
        zIndex: 7
    });

    // control


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


    layerGroup = L.layerGroup().addTo(map);

    //GeoJSON
    L.geoJson(Facultades, {
        pointToLayer: function (feature, coordinates) {
            var geoMarker = (L.marker(coordinates, {icon: L.AwesomeMarkers.icon({icon: 'graduation-cap', markerColor: 'red', prefix: 'fa', iconColor: 'black'})}));
            layerGroup.addLayer(geoMarker);
            return geoMarker;
        },
        onEachFeature: onEachFeature
    }).addTo(map);

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
    map.addLayer(mapboxTiles);
    map.addLayer(custom);
    map.addControl(new L.Control.Layers({'OSM': osm, 'MBT': mapboxTiles, 'Google Terrain': googleLayer}, {'ETSE': custom, "Markers": layerGroup}));
    
}
function hdd() {
    
    sidebarLayers.show();
}

function hdd2() {
    
    sidebarFacultades.show();
}


$(document).ready(function(){
    $("input[name=icons]").change(function(){
       
        var iconos =  $('input:radio[name=icons]:checked').attr("value");
        if (iconos === "on"){
            map.addLayer(layerGroup);
        }
        else{
            
            map.removeLayer(layerGroup);
        }
        //alert("The text has been changed."+iconos);
        
        
        
    });
    $("input[name=tipologia]").change(function(){
       
        var iconos =  $('input:radio[name=tipologia]:checked').attr("value");
        if (iconos === "on"){
            map.addLayer(custom);
        }
        else{
            
            map.removeLayer(custom);
        }
        //alert("The text has been changed."+iconos);
        
        
        
    });
    $("input[name=fondo]").change(function(){
       
        var iconos =  $('input:radio[name=fondo]:checked').attr("value");
        if (iconos === "on"){
            map.removeLayer(osm);
            map.addLayer(mapboxTiles);
        }
        else{
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