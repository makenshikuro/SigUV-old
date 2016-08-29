            _nivelActual = '';
            _nivelBusqueda = '';
            _zoom = '';
            _fondo = '';
            _tema = '';
            _toponimo = '';
            _currentPosition = '';
            _server = "http://adretse.uv.es/";
            _serverPano="http://147.156.82.219/recursos/panoramicas/";
            _listaPanos = '';

            //_server = "http://www.adretse.es/siguv/";
            //_serverDB = "http://adrserverpc.uv.es:8282/SiguvRest/";
            _serverDB = "http://147.156.85.92:8282/ServerRest/";
            //_serverDB = "http://localhost:8080/ServerRest/";
            L.mapbox.accessToken = 'pk.eyJ1IjoidWJ1c3R1cyIsImEiOiJjaWs2bjhidDMwMHc1cDdrc2o4cnpkdWhkIn0.Nrk8FVCyADAGWSIGm86yBQ';
            var camera, scene, renderer;

			isUserInteracting = false,
			onMouseDownMouseX = 0, onMouseDownMouseY = 0,
			lon = 0, onMouseDownLon = 0,
			lat = 0, onMouseDownLat = 0,
			phi = 0, theta = 0;
            isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
