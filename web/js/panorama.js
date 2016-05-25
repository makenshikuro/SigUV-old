/* global THREE */
var object;
function init2() {

				var container, mesh;
                                //THREE.ImageUtils.crossOrigin = '';
				container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
				camera.target = new THREE.Vector3( 0, 0, 0 );

				scene = new THREE.Scene();

				/*var geometry = new THREE.SphereGeometry( 500, 60, 40 );
				geometry.scale( - 1, 1, 1 );*/
                                
                                var loader = new THREE.TextureLoader();
                                loader.crossOrigin = true;
                                loader.load( 'http://147.156.82.219/recursos/panoramicas/R0010080.JPG', function ( texture ) {
					var geometry = new THREE.SphereGeometry( 500, 60, 40 );
                                        geometry.scale( - 1, 1, 1 );
					var mat = new THREE.MeshBasicMaterial( {
                                            map: texture
                                        } );
                                        
					
                                        mesh = new THREE.Mesh( geometry, mat );
                                        object = mesh;
					scene.add( mesh );
				} );

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth/3, window.innerHeight/3 );
				container.appendChild( renderer.domElement );

				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );
				document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
				document.addEventListener( 'MozMousePixelScroll', onDocumentMouseWheel, false);

				//

				document.addEventListener( 'dragover', function ( event ) {

					event.preventDefault();
					event.dataTransfer.dropEffect = 'copy';

				}, false );

				document.addEventListener( 'dragenter', function ( event ) {

					document.body.style.opacity = 0.5;

				}, false );

				document.addEventListener( 'dragleave', function ( event ) {

					document.body.style.opacity = 1;

				}, false );

				document.addEventListener( 'drop', function ( event ) {

					event.preventDefault();

					var reader = new FileReader();
					reader.addEventListener( 'load', function ( event ) {

						material.map.image.src = event.target.result;
						material.map.needsUpdate = true;

					}, false );
					reader.readAsDataURL( event.dataTransfer.files[ 0 ] );

					document.body.style.opacity = 1;

				}, false );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}
                        
function Change(idPano){
    //console.log(object);
    var loader = new THREE.TextureLoader();
    loader.crossOrigin = true;
    var tex = loader.load( _serverPano+idPano+'.jpg');
    object.material.map = tex;
    object.material.needsUpdate = true;
    
    
}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth/3, window.innerHeight/3 );

			}

			function onDocumentMouseDown( event ) {

				event.preventDefault();

				isUserInteracting = true;

				onPointerDownPointerX = event.clientX;
				onPointerDownPointerY = event.clientY;

				onPointerDownLon = lon;
				onPointerDownLat = lat;

			}

			function onDocumentMouseMove( event ) {

				if ( isUserInteracting === true ) {

					lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
					lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

				}

			}

			function onDocumentMouseUp( event ) {

				isUserInteracting = false;

			}

			function onDocumentMouseWheel( event ) {

				// WebKit

				if ( event.wheelDeltaY ) {

					camera.fov -= event.wheelDeltaY * 0.05;

				// Opera / Explorer 9

				} else if ( event.wheelDelta ) {

					camera.fov -= event.wheelDelta * 0.05;

				// Firefox

				} else if ( event.detail ) {

					camera.fov += event.detail * 1.0;

				}

				camera.updateProjectionMatrix();

			}

			function animate() {

				requestAnimationFrame( animate );
				update();

			}

			function update() {

				if ( isUserInteracting === false ) {

					lon += 0.1;

				}

				lat = Math.max( - 85, Math.min( 85, lat ) );
				phi = THREE.Math.degToRad( 90 - lat );
				theta = THREE.Math.degToRad( lon );

				camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
				camera.target.y = 500 * Math.cos( phi );
				camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

				camera.lookAt( camera.target );

				/*
				// distortion
				camera.position.copy( camera.target ).negate();
				*/

				renderer.render( scene, camera );

			}