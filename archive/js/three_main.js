var SEPARATION = 100;
var AMOUNTX = 50;
var AMOUNTY = 50;

var container, stats;
var camera, scene, renderer, particle;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

//initThree() window.onload = initThree;
//animate();

function initThree() {

	document.createElement('div');
	document.getElementById("main").appendChild(container);

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 1000;

	scene = new THREE.Scene();

	scene.add(camera);

	var PI2 = Math.PI * 2;
	var material = new THREE.ParticleCanvasMaterial({

		color : 0xffffff,
		program : function(context) {

			context.beginPath();
			context.arc(0, 0, 1, 0, PI2, true);
			context.closePath();
			context.fill();

		}
	});

	for (var ix = 0; ix < AMOUNTX; ix++) {

		for (var iy = 0; iy < AMOUNTY; iy++) {

			particle = new THREE.Particle(material);
			particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION ) / 2 );
			scene.add(particle);
		}
	}

	renderer = new THREE.CanvasRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById("main").appendChild(container);
	container.appendChild(renderer.domElement);

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild(stats.domElement);

	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);
	document.addEventListener('touchmove', onDocumentTouchMove, false);
	setInterval(update, 1000 / 60);




}

//

function onDocumentMouseMove(event) {

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {

	if (event.touches.length > 1) {

		event.preventDefault();

		mouseX = event.touches[0].pageX - windowHalfX;
		mouseY = event.touches[0].pageY - windowHalfY;
	}
}

function onDocumentTouchMove(event) {

	if (event.touches.length == 1) {

		event.preventDefault();

		mouseX = event.touches[0].pageX - windowHalfX;
		mouseY = event.touches[0].pageY - windowHalfY;
	}
}

//

function animate() {

	requestAnimationFrame(animate);

	render();
	stats.update();

}

function render() {

	camera.position.x += (mouseX - camera.position.x ) * .05;
	camera.position.y += (-mouseY - camera.position.y ) * .05;
	camera.lookAt(scene.position);

	renderer.render(scene, camera);

}

function update() {

	//add you update code here

	// and render the scene from the perspective of the camera
	/*camera.position.x += (mouseX - camera.position.x ) * 0.05;
	camera.position.y += (-mouseY - camera.position.y ) * 0.05;
	camera.lookAt(scene.position);
	renderer.render(scene, camera);
	camera.updateMatrixWorld();
	var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	projector.unprojectVector(vector, camera);

	var ray = new THREE.Ray(camera.position, vector.subSelf(camera.position).normalize());

	var intersects = ray.intersectScene(scene);

	if (intersects.length > 0) {

		if (INTERSECTED != intersects[0].object) {

			//if ( INTERSECTED )
			//video.pause();

			INTERSECTED = intersects[0].object;
			console.log(INTERSECTED.name);
			//INTERSECTED.material.program = programFill;
			//if(INTERSECTED== THREE.Mesh)
			//video.play();
		}

	} else {

		//if ( INTERSECTED ) INTERSECTED.material.program = programStroke;
		//  if ( INTERSECTED )
		//video.pause();
		INTERSECTED = null;

	}
	/*if ( video.readyState === video.HAVE_ENOUGH_DATA ) {

	imageContext.drawImage( video, 0, 0 );

	if ( texture ) texture.needsUpdate = true;

	}*/
	//stats.update();
	animate();
}

function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}
/*
function particleRender(context) {

	// we get passed a reference to the canvas context
	context.beginPath();
	// and we just have to draw our shape at 0,0 - in this
	// case an arc from 0 to 2Pi radians or 360º - a full circle!
	context.arc(0, 0, 1, 0, Math.PI * 2, true);
	context.fill();
}

function onMouseMove(event) {
	// store the mouseX and mouseY position
	mouseX = (event.clientX - (window.innerWidth / 2) );
	mouseY = (event.clientY - (window.innerHeight / 2) ) * 0.2;
	event.preventDefault();

	mouse.x = (event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight ) * 2 + 1;
};
var programFill = function(context) {

	context.beginPath();
	context.arc(0, 0, 1, 0, PI2, true);
	context.closePath();
	context.fill();

}
var programStroke = function(context) {

	context.lineWidth = 0.05;
	context.beginPath();
	context.arc(0, 0, 1, 0, PI2, true);
	context.closePath();
	context.stroke();

}*/	
