import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { color } from "three/tsl";

// Get Canvas
const canvas = document.querySelector<HTMLCanvasElement>("#three-canvas")!;
// Create Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
// Set Renderer Size
renderer.setSize(window.innerWidth, window.innerHeight);
// Create Scene
const scene = new THREE.Scene();
// create Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// Set Camera Position
camera.position.z = 3;

// create OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Animate Renderer to render the scene

function animate(t = 0) {
  console.log(t);
  requestAnimationFrame(animate);
  object.rotation.x = t / 10000;
  object.rotation.y = t / 10000;
  renderer.render(scene, camera);
  controls.update();
}

// geometry
const geometry = new THREE.IcosahedronGeometry(1, 2);
// material
const material = new THREE.MeshStandardMaterial({
  color: "0xffffff",
  flatShading: true,
});
// mesh
const object = new THREE.Mesh(geometry, material);

// Add wireframes
const wireframeMaterial = new THREE.MeshBasicMaterial({
  color: "0xff0000",
  wireframe: true,
});
const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
wireframe.scale.setScalar(1.01);
object.add(wireframe);

// Add Light for MeshStandardMaterial
const hemLight = new THREE.HemisphereLight(0x00aaff, 0xffaa00, 1); // skyColor, groundColor, intensity

// Add Object to Scene and light
scene.add(object);
scene.add(hemLight);

// start Animation
animate();
