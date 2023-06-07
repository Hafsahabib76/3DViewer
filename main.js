import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js";


//scene renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xD3D3D3);

//camera
const camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(1, 2, 1);
//ambient light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//directional light
const directionalLight = new THREE.DirectionalLight(0x000, 3);
scene.add(directionalLight);

//controls for oribiting around the object
const controls = new OrbitControls (camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown' // down arrow
}
controls.enableZoom = true;
controls.addEventListener('change', () => {
    renderer.render(scene, camera);
});
controls.target.set(0, 0, 0);
controls.update();

//load the GL object
const loader = new GLTFLoader();
loader.load('GWE_new.glb', function(gltf){
    const model = gltf.scene;
    model.position.set(0,0,0);
    // model.setSize(window.innerWidth, window.innerHeight);
    scene.add(model);

    //render the scene
    renderer.render(scene, camera);
}, undefined, function(error){
    console.error(error);
})


// Define the fixed point to zoom towards
const fixedPoint = new THREE.Vector3(0, 0, 0); // Adjust the coordinates as needed

// Function to zoom the model towards the fixed point
function zoomModel(zoomAmount) {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);

  const zoomVector = direction.clone().multiplyScalar(zoomAmount);
  const newPosition = camera.position.clone().add(zoomVector);

  camera.position.copy(newPosition);
  controls.target.copy(fixedPoint);
}

// Call the zoomModel function with a zoom amount when needed
zoomModel(2); // Adjust the zoom amount as needed



//update scene on window resize
window.onresize = function(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

