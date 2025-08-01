import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Get target canvas
const canvas = document.querySelector<HTMLCanvasElement>("#three-canvas")!;
// const canvas = document.getElementById("three-canvas") as HTMLCanvasElement;

if (!canvas) {
  throw new Error("Canvas element not found!");
}

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

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x7f7fff });
const material = new THREE.MeshStandardMaterial({ color: 0x7f7fff });
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 3);
scene.add(light);

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animate
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  controls.update();
}

animate();
