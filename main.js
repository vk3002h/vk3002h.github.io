import * as THREE from 'three';

import { OBJLoader } from 'C:/DL/node_modules/three/examples/jsm/loaders/OBJLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xb9d3ff, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new OBJLoader();

const uvTxture = new THREE.TextureLoader().load('../uv.png')
const mat = new THREE.MeshStandardMaterial({
	mat:uvTxture,
})

loader.load( '../Lamp.obj', function ( obj ) {

	scene.add( obj.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
ambientLight.castShadow = true;
scene.add(ambientLight);

const spotLight = new THREE.DirectionalLight(0xffffff, 1);
spotLight.castShadow = true;
spotLight.position.set(0, 64, 32);
scene.add(spotLight);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();