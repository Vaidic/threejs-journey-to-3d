import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Canvas
const canvas = document.querySelector<HTMLCanvasElement>("#three-canvas")!;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
// ❌ Not needed if you already have one like this:
// document.body.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0x0ffffff, 0.7);
scene.add(ambientLight);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Shape and Mateerial
const shape = new THREE.SphereGeometry(1, 32, 32);
const textureLoader = new THREE.TextureLoader();
const dayTexture = textureLoader.load("/src/assets/earth-day.jpg");
const nightTexture = textureLoader.load("/src/assets/earth-night.jpg");
const starTexture = textureLoader.load("/src/assets/skymap.jpg");

const material = new THREE.MeshStandardMaterial({
  map: dayTexture,
  emissiveMap: nightTexture,
  emissiveIntensity: 1,
  emissive: 0xff00000,
});
const globe = new THREE.Mesh(shape, material);

// Add to scene
scene.add(globe);
scene.background = starTexture;

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

animate();
