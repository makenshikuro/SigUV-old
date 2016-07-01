/* global THREE */
var object;
function initPanorama(idPano) {

    var container, mesh;
    //THREE.ImageUtils.crossOrigin = '';
    container = document.getElementById('visor-panorama');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);

    scene = new THREE.Scene();

    var loader = new THREE.TextureLoader();
    loader.crossOrigin = true;
    loader.load('http://147.156.82.219/recursos/panoramicas/' + idPano + '.JPG', function (texture) {
        var geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);
        var mat = new THREE.MeshBasicMaterial({
            map: texture
        });

        mesh = new THREE.Mesh(geometry, mat);
        object = mesh;
        scene.add(mesh);
    });
    
    /*var html = '<div class="panorama-control">';
        html += '</div>';
        
    $( "canvas" ).after(html);*/
        

    renderer = new THREE.WebGLRenderer();
    //renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    //console.log($('#container').width());
    
    $('.pano').css('max-width', (window.innerWidth / 2)+30 );
     $('.pano').css('margin-top', 100 );
    /*$('.pano').css('height', (window.innerHeight / 2) );*/
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    container.appendChild(renderer.domElement);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mousewheel', onDocumentMouseWheel, false);
    document.addEventListener('MozMousePixelScroll', onDocumentMouseWheel, false);
  

    //

    document.addEventListener('dragover', function (event) {

        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';

    }, false);

    document.addEventListener('dragenter', function (event) {

        document.body.style.opacity = 0.5;

    }, false);

    document.addEventListener('dragleave', function (event) {

        document.body.style.opacity = 1;

    }, false);

    document.addEventListener('drop', function (event) {

        event.preventDefault();

        var reader = new FileReader();
        reader.addEventListener('load', function (event) {

            material.map.image.src = event.target.result;
            material.map.needsUpdate = true;

        }, false);
        reader.readAsDataURL(event.dataTransfer.files[ 0 ]);

        document.body.style.opacity = 1;

    }, false);

    //
    onWindowResize();
    //window.addEventListener('resize', onWindowResize, false);
    var html = '<div class="panorama-control">';
	html += '<button onclick="resizer();" class="button request"><i class="material-icons md-36">face</i>request fullscreen</button>';
	html += '<button onclick="onWindowResize();" class="button cancel"><i class="material-icons md-36">face</i>cancel fullscreen</button>';

html += '</div>';
     $('canvas').after(html);
     $('panorama-control').css("width",(window.innerWidth / 2));
     fullScree();
    
     $( "canvas" ).mousedown(function(event) {
        onDocumentMouseDown(event);
});
}

function Change(idPano) {
    
    var loader = new THREE.TextureLoader();
    loader.crossOrigin = true;
    var tex = loader.load(_serverPano + idPano + '.jpg');
    object.material.map = tex;
    object.material.needsUpdate = true;


}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    $('.pano').css('max-width', (window.innerWidth / 2)+30 );
    $('panorama-control').css("width",(window.innerWidth / 2));

    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

}
function resizer() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    $('.pano').css('max-width', (window.innerWidth));
    //$('panorama-control').css("width",(window.innerWidth));

    renderer.setSize(window.innerWidth, window.innerHeight);

}




function onDocumentMouseDown(event) {

    event.preventDefault();

    isUserInteracting = true;

    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;
    
    

}

function onDocumentMouseMove(event) {

    if (isUserInteracting === true) {

        lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
        lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
        
    }
}

function onDocumentMouseUp(event) {
    isUserInteracting = false;
}

function onDocumentMouseWheel(event) {

    // WebKit

    if (event.wheelDeltaY) {

        camera.fov -= event.wheelDeltaY * 0.05;

        // Opera / Explorer 9

    } else if (event.wheelDelta) {

        camera.fov -= event.wheelDelta * 0.05;

        // Firefox

    } else if (event.detail) {

        camera.fov += event.detail * 1.0;

    }

    camera.updateProjectionMatrix();

}

function animate() {

    requestAnimationFrame(animate);
    update();

}

function update() {

    if (isUserInteracting === false) {

        lon += 0.1;

    }

    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon);

    camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
    camera.target.y = 500 * Math.cos(phi);
    camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);

    camera.lookAt(camera.target);

    /*
     // distortion
     camera.position.copy( camera.target ).negate();
     */

    renderer.render(scene, camera);

}
function fullScree(){
                //document.querySelector(".available .value").innerHTML	= THREEx.FullScreen.available() ? "yes" : "no";
		//document.querySelector(".activated .value").innerHTML	= THREEx.FullScreen.activated() ? "yes" : "no";
		THREEx.FullScreen.bindKey({
			dblclick	: true
		});
		
		document.querySelector(".button.request").addEventListener('click', function(){
			THREEx.FullScreen.request();
			//document.querySelector(".activated .value").innerHTML	= THREEx.FullScreen.activated() ? "yes" : "no";
		}, false);
                
		document.querySelector(".button.cancel").addEventListener('click', function(){
			THREEx.FullScreen.cancel();
			//document.querySelector(".activated .value").innerHTML	= THREEx.FullScreen.activated() ? "yes" : "no";
		}, false);
}