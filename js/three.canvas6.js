
// (function () {
// 	init();
// 	animate();
// })();


var container, stats;

var camera, scene, renderer;

var uniforms;
init();
animate();

function init() {

	container = document.getElementById( 'three' );

	camera = new THREE.Camera();
	camera.position.z = 1;

	scene = new THREE.Scene();

	var geometry = new THREE.PlaneBufferGeometry( 100, 100 );

	uniforms = {
		tex: { value: new THREE.TextureLoader().load( "images/noise2.png" ) },
		time:       { value: 1.0 },
		resolution: { value: new THREE.Vector2() },
		iMouse: { value: new THREE.Vector2() },
		iChannelResolution: { value: new THREE.Vector2(32,32) },
		speed: {value: 1.0},
		color: { value: new THREE.Vector3(255,255,255) }

	};

	var vertStr = `
					precision highp float;
					precision highp int;

					// uniform mat4 modelMatrix;
					// uniform mat4 modelViewMatrix;
					// uniform mat4 projectionMatrix;
					// uniform mat4 viewMatrix;
					// uniform mat3 normalMatrix;

					// attribute vec3 position;
					// attribute vec3 normal;
					// attribute vec2 uv;
					// attribute vec2 uv2;

					varying vec2 vUv;

					void main() {
					  vUv = uv;
					  // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					  gl_Position = vec4( position, 1.0 );
					}
				`;
	
	var fragStr2 = `
					#extension GL_EXT_shader_texture_lod : enable
					#extension GL_OES_standard_derivatives : enable
	 				// Created by inigo quilez - iq/2013
					// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
					uniform vec2 resolution;
					uniform float time;
					uniform vec2 iMouse;
					uniform sampler2D tex;
					uniform vec2 iChannelResolution;
					varying vec2 vUv;
					#define NUM 9.0

					float noise( in vec2 x )
					{
					    vec2 p = floor(x);
					    vec2 f = fract(x);
						vec2 uv = p.xy + f.xy*f.xy*(3.0-2.0*f.xy);
						return texture2D( tex, (uv+118.4)/256.0, -100.0 ).x;
					}

					float map( in vec2 x, float t )
					{
					    return noise( 2.5*x - 1.5*t*vec2(1.0,0.0) );
					}


					float shapes( in vec2 uv, in float r, in float e )
					{
						float p = pow( 32.0, r - 0.5 );
						float l = pow( pow(abs(uv.x),p) + pow(abs(uv.y),p), 1.0/p );
						float d = l - pow(r,0.6) - e*0.2 + 0.05;
						float fw = fwidth( d )*0.5;
						fw *= 1.0 + 10.0*e;
						return (r)*smoothstep( fw, -fw, d ) * (1.0-0.2*e)*(0.4 + 0.6*smoothstep( -fw, fw, abs(l-r*0.8+0.05)-0.1 ));
					}


					void main(  )
					{
						vec2 qq = gl_FragCoord.xy/resolution.xy;
						vec2 uv = gl_FragCoord.xy/resolution.xx;
						
						float time = 11.0 + (time + 0.8*sin(time)) / 1.8;
						
						uv += 0.01*noise( 2.0*uv + 0.2*time );
						
					    vec3 col = 0.0*vec3(1.0) * 0.15 * abs(qq.y-0.5);
						
						vec2 pq, st; float f; vec3 coo;
						
					    // grey	
					    pq = floor( uv*NUM ) / NUM;
						st = fract( uv*NUM )*2.0 - 1.0;
						coo = (vec3(0.5,0.7,0.7) + 0.3*sin(10.0*pq.x)*sin(13.0*pq.y))*0.6;
						col += 1.0*coo*shapes( st, map(pq, time), 0.0 );
						col += 0.6*coo*shapes( st, map(pq, time), 1.0 );

						// orange
					    pq = floor( uv*NUM+0.5 ) / NUM;
						st = fract( uv*NUM+0.5 )*2.0 - 1.0;
					    coo = (vec3(1.0,0.5,0.3) + 0.3*sin(10.0*pq.y)*cos(11.0*pq.x))*1.0;
						col += 1.0*coo*shapes( st, 1.0-map(pq, time), 0.0 );
						col += 0.4*coo*shapes( st, 1.0-map(pq, time), 1.0 );

						col *= pow( 16.0*qq.x*qq.y*(1.0-qq.x)*(1.0-qq.y), 0.05 );
						
						gl_FragColor = vec4( col, 1.0 );
					}
	`;
	var material = new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader:vertStr ,
		fragmentShader: fragStr2

	} );

	var mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild( renderer.domElement );

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );

	onWindowResize();

	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

}

function onWindowResize( event ) {

	renderer.setSize( window.innerWidth, window.innerHeight );

	uniforms.resolution.value.x = renderer.domElement.width;
	uniforms.resolution.value.y = renderer.domElement.height;

}
function onDocumentMouseMove( event ) {

	uniforms.iMouse.x = event.clientX;
	uniforms.iMouse.y = event.clientY;
}
function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

}

function render() {

	uniforms.time.value += 0.05;
	if(renderer){
		renderer.render( scene, camera );
	}

}