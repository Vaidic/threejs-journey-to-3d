import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Get Canvas
const canvas = document.querySelector<HTMLCanvasElement>("#three-canvas")!;

// Create Scene
const scene = new THREE.Scene();

// Create Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// Rendereer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Shape
const geometry = new THREE.SphereGeometry(1, 32, 32);

//Load Texture
const loader = new THREE.TextureLoader();
const dayTexture = loader.load("/src/assets/earth-day.jpg");
const nightTexture = loader.load("/src/assets/earth-night.jpg");

// Material
const material = new THREE.MeshStandardMaterial({
  map: dayTexture,
  emissiveMap: nightTexture,
  emissiveIntensity: 1,
  emissive: new THREE.Color(0xffffff),
});

//Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Add shape to scene
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Animate
function animate() {
  requestAnimationFrame(animate);
  // globe.rotation.x += 0.01;
  // globe.rotation.y += 0.01;
  renderer.render(scene, camera);
  controls.update();
}

animate();
