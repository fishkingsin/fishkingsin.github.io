var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

var container, stats;
var camera, scene, renderer;

var particles, particle, count = 0;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var PI2 = Math.PI * 2;
(function () {
	init();
	animate();
})();
var programFill = function ( context ) {

	context.beginPath();
	context.arc( 0, 0, 1, 0, PI2, true );
	context.closePath();
	context.fill();

}

var programStroke = function ( context ) {

	context.lineWidth = 0.05;
	context.beginPath();
	context.arc( 0, 0, 1, 0, PI2, true );
	context.closePath();
	context.stroke();

}

var mouse = { x: 0, y: 0 }, INTERSECTED;

function init() {

	container = document.getElementById('three');

	// document.body.appendChild( container );

	// var info = document.createElement( 'div' );
	// info.style.position = 'absolute';
	// info.style.top = '10px';
	// info.style.width = '100%';
	// info.style.textAlign = 'center';
	// info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> canvas - interactive particles';
	// container.appendChild( info );

	// camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	// camera.position.set( 0, 300, 500 );

	// scene = new THREE.Scene();

	
	// var PI2 = Math.PI * 2;
	// 			var material = new THREE.ParticleCanvasMaterial( {

	// 				color: 0xffffff,
	// 				program: function ( context ) {

	// 					context.beginPath();
	// 					context.arc( 0, 0, 1, 0, PI2, true );
	// 					context.closePath();
	// 					context.fill();

	// 				}

	// 			} );

	// 			for ( var i = 0; i < 1000; i ++ ) {

	// 				particle = new THREE.Particle( material );
	// 				particle.position.x = Math.random() * 2 - 1;
	// 				particle.position.y = Math.random() * 2 - 1;
	// 				particle.position.z = Math.random() * 2 - 1;
	// 				particle.position.normalize();
	// 				particle.position.multiplyScalar( Math.random() * 10 + 450 );
	// 				scene.add( particle );

	// 			}
	// projector = new THREE.Projector();

	// renderer = new THREE.CanvasRenderer();
	// renderer.setSize( window.innerWidth, window.innerHeight );

	// container.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;

	scene = new THREE.Scene();

	particles = new Array();

	var PI2 = Math.PI * 2;
	var material = new THREE.ParticleCanvasMaterial( {

		color: 0xffffff,
		program: function ( context ) {

			context.beginPath();
			context.arc( 0, 0, 1, 0, PI2, true );
			context.fill();

		}

	} );

	var i = 0;

	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

			particle = particles[ i ++ ] = new THREE.Particle( material );
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
			scene.add( particle );

		}

	}

	renderer = new THREE.CanvasRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );


	// stats = new Stats();
	// stats.domElement.style.position = 'absolute';
	// stats.domElement.style.top = '0px';
	// container.appendChild( stats.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

//

function animate() {

	requestAnimationFrame( animate );

	render();
	// stats.update();

}

var radius = 600;
var theta = 0;

function render() {

	// rotate camera

	theta += 0.1;

	/*camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.y = 0;//radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
	camera.lookAt( scene.position );

	// find intersections

	camera.updateMatrixWorld();

	// var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
	// projector.unprojectVector( vector, camera );

	// var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

	// var intersects = raycaster.intersectObjects( scene.children );

	// if ( intersects.length > 0 ) {

	// 	if ( INTERSECTED != intersects[ 0 ].object ) {

	// 		if ( INTERSECTED ) INTERSECTED.material.program = programStroke;

	// 		INTERSECTED = intersects[ 0 ].object;
	// 		INTERSECTED.material.program = programFill;

	// 	}

	// } else {

	// 	if ( INTERSECTED ) INTERSECTED.material.program = programStroke;

	// 	INTERSECTED = null;

	// }

	renderer.render( scene, camera );*/
	camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.y = 0;//radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
	camera.lookAt( scene.position );

	var i = 0;

	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

			particle = particles[ i++ ];
			particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
			particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;

		}

	}

	renderer.render( scene, camera );

	count += 0.1;


}