var SEPARATION = 100;
var AMOUNTX = 50;
var AMOUNTY = 50;

var container, stats;
var camera, scene, renderer, particle;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

	container = document.getElementById( 'three' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;

	scene = new THREE.Scene();

	var material = new THREE.SpriteMaterial();

	for ( var ix = 0; ix < AMOUNTX; ix++ ) {

		for ( var iy = 0; iy < AMOUNTY; iy++ ) {

			particle = new THREE.Sprite( material );
			particle.scale.y = 20;
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
			scene.add( particle );

		}

	}

	renderer = new THREE.CanvasRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	stats = new Stats();
	// container.appendChild( stats.dom );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseMove( event ) {

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart( event ) {

	if ( event.touches.length > 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}

function onDocumentTouchMove( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}

}

//

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

}

function render() {

	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	camera.lookAt( scene.position );

	renderer.render( scene, camera );

}
// var SEPARATION = 100;
// var AMOUNTX = 50;
// var AMOUNTY = 50;

// var container, stats;

// var camera, scene, renderer;
// init();
// animate();

// function init() {

// 	container = document.getElementById( 'three' );

// 	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10 );
// 	camera.position.z = 2;

// 	scene = new THREE.Scene();

// 	// geometry

// 	var triangles = 500;

// 	var geometry = new THREE.BufferGeometry();

// 	var vertices = new THREE.BufferAttribute( new Float32Array( triangles * 3 * 3 ), 3 );

// 	for ( var i = 0; i < vertices.count; i ++ ) {

// 		vertices.setXYZ( i, Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );

// 	}

// 	geometry.addAttribute( 'position', vertices );

// 	var colors = new THREE.BufferAttribute(new Float32Array( triangles * 3 * 4 ), 4 );

// 	for ( var i = 0; i < colors.count; i ++ ) {

// 		colors.setXYZW( i,1.0, 1.0, 1.0, 1.0 );

// 	}

// 	geometry.addAttribute( 'color', colors );
// 	var vertexShaderString = "precision mediump float;\n"+
// 	"precision mediump int;\n"+
// 	"\n"+
// 	"uniform mat4 modelViewMatrix; // optional\n"+
// 	"uniform mat4 projectionMatrix; // optional\n"+
// 	"\n"+
// 	"attribute vec3 position;\n"+
// 	"attribute vec4 color;\n"+
// 	"\n"+
// 	"varying vec3 vPosition;\n"+
// 	"varying vec4 vColor;\n"+
// 	"\n"+
// 	"void main()	{\n"+
// 	"	\n"+
// 	"	vPosition = position;\n"+
// 	"	vColor = color;\n"+
// 	"	\n"+
// 	"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n"+
// 	"	\n"+
// 	" }";
// 	var fragmentShaderString = "precision mediump float;\n"+
// 	"precision mediump int;\n"+
// 	"\n"+
// 	"uniform float time;\n"+
// 	"\n"+
// 	" varying vec3 vPosition;\n"+
// 	"varying vec4 vColor;\n"+
// 	"\n"+
// 	"void main()	{\n"+
// 	"\n"+
// 	"vec4 color = vec4( vColor );\n"+
// 	"color.r += sin( vPosition.x * 10.0 + time ) * 0.5;\n"+
// 	"\n"+
// 	"gl_FragColor = color;\n"+
// 	"\n"+
// 	"}";
// 	// material

// 	var material = new THREE.RawShaderMaterial( {

// 		uniforms: {
// 			time: { type: "f", value: 1.0 }
// 		},
// 		vertexShader: vertexShaderString,
// 		fragmentShader: fragmentShaderString,
// 		side: THREE.DoubleSide,
// 		transparent: true

// 	} );



// 	var mesh = new THREE.Mesh( geometry, material );
// 	scene.add( mesh );

// 	renderer = new THREE.WebGLRenderer();
// 	renderer.setClearColor( 0x101010 );
// 	renderer.setPixelRatio( window.devicePixelRatio );
// 	renderer.setSize( window.innerWidth, window.innerHeight );
// 	container.appendChild( renderer.domElement );

// 	stats = new Stats();
// 	stats.domElement.style.position = 'absolute';
// 	stats.domElement.style.top = '0px';
// 	container.appendChild( stats.domElement );

// 	window.addEventListener( 'resize', onWindowResize, false );

// }

// function onWindowResize( event ) {

// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();

// 	renderer.setSize( window.innerWidth, window.innerHeight );

// }
// function animate() {

// 	requestAnimationFrame( animate );

// 	render();
// 	stats.update();

// }

// function render() {

// 	var time = performance.now();

// 	var object = scene.children[ 0 ];

// 	object.rotation.y = time * 0.0005;
// 	object.material.uniforms.time.value = time * 0.005;
// 	if(renderer!=null){
// 		renderer.render( scene, camera );
// 	}

// }