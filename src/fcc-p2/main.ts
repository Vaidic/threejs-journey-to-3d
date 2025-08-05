import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import starfield from "./starfield";

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
  earthGroup.rotation.y += 0.002;
  // lightMesh.rotation.y += 0.02;
  // cloudMesh.rotation.y += 0.002;
  renderer.render(scene, camera);
  controls.update();
}

// Create a texture loader
const loader = new THREE.TextureLoader();

// geometry
const geometry = new THREE.IcosahedronGeometry(1, 12);
// material
const material = new THREE.MeshStandardMaterial({
  map: loader.load("/src/assets/earthmap1k.jpg"),
});
// mesh
const object = new THREE.Mesh(geometry, material);

// Add Light for MeshStandardMaterial
const sunlight = new THREE.DirectionalLight(0xffffff, 1);
sunlight.position.set(-2, -0.5, 1.5);
const lightMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/src/assets/earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
  transparent: true,
  opacity: 0.5,
});
const lightMesh = new THREE.Mesh(geometry, lightMaterial);
const cloudMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/src/assets/earthcloudmap.jpg"),
  blending: THREE.AdditiveBlending,
  transparent: true,
  opacity: 0.5,
});
const cloudMesh = new THREE.Mesh(geometry, cloudMaterial);
cloudMesh.scale.setScalar(1.03);

// Create a group
const earthGroup = new THREE.Group();
earthGroup.add(object);
// tilt 23.5 degrees
earthGroup.rotation.z = -23.5 * (Math.PI / 180);
earthGroup.add(lightMesh);
earthGroup.add(cloudMesh);

// Add Object to Scene and light
scene.add(earthGroup);
scene.add(sunlight);

// Add starfield
const stars = starfield({ numStars: 2000 });
scene.add(stars);

// start Animation
animate();

// maps from https://planetpixelemporium.com/earth.html

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
