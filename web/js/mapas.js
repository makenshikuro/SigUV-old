/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global L */

function init() {

    /* Variables  */
    var mapBounds = new L.LatLngBounds(
            new L.LatLng(39.511948, -0.425012),
            new L.LatLng(39.513769, -0.422732));
    var mapMinZoom = 5;
    var mapMaxZoom = 25;


    var map = L.map('map', {center: [39.512859, -0.4244782], zoom: 18});

    L.mapbox.accessToken = 'pk.eyJ1IjoidWJ1c3R1cyIsImEiOiJjaWs2bjhidDMwMHc1cDdrc2o4cnpkdWhkIn0.Nrk8FVCyADAGWSIGm86yBQ';
    // Replace 'mapbox.streets' with your map id.

    var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/ubustus.p2c7e9pf/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>',
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        unloadInvisibleTiles: true,
        opacity: 1.00
    });

    var googleLayer = new L.Google('ROADMAP');
    map.addLayer(mapboxTiles);
    
    

    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        unloadInvisibleTiles: true,
        opacity: 1.00
    });
    var custom = L.tileLayer('http://www.adretse.es/mapEtse/{z}/{x}/{y}.png', {
        minZoom: mapMinZoom,
        maxZoom: mapMaxZoom,
        bounds: mapBounds,
        zIndex: 7
    });
    
    map.addControl(new L.Control.Layers({'OSM': osm, 'MBT': mapboxTiles, 'Google Terrain': googleLayer}, {'ETSE': custom}));
    
    sidebar = L.control.sidebar('sidebar', {
            closeButton: true,
            position: 'left'
        });
    map.addControl(sidebar);
    
     // Add markers to map
    // Font-Awesome markers
   /* L.marker([39.512877, -0.423967], {
        icon: L.AwesomeMarkers.icon({
            icon: 'graduation-cap', markerColor: 'red', prefix: 'fa' , iconColor: 'black'
        }) 
    }).addTo(map);*/
       
    
    
    //////////////////////////////////
   

//L.geoJson(geojsonFeature).addTo(map);

L.geoJson(Facultades, {
    pointToLayer: function (feature, coordinates) {
        return L.marker(coordinates, {
        icon: L.AwesomeMarkers.icon({
            icon: 'graduation-cap', 
            markerColor: 'red', 
            prefix: 'fa' , 
            iconColor: 'black'
        }) 
    });
    }
}).addTo(map);


   

}
function hdd(){
    sidebar.show();
}