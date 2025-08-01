import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

const canvas = document.querySelector<HTMLCanvasElement>("#three-canvas")!;
const scene = new THREE.Scene();
// renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(3, 3, 5);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// CUBE
const shape = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(shape, material);
cube.castShadow = true;
scene.add(cube);
// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);
ground.receiveShadow = true;
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Enable shadow rendering
renderer.shadowMap.enabled = true;

// Animate Loop
function animate() {
  requestAnimationFrame(animate);
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  controls.update();
}

// Light
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(0, 1, 1);
// light.castShadow = true;
// light.shadow.radius = 4;
// light.shadow.mapSize.set(1024, 1024);
// light.shadow.camera.visible = true;
// scene.add(light);
// const ambientLight = new THREE.AmbientLight(0x0ffffff, 0.7);
// scene.add(ambientLight);
// const light = new THREE.PointLight(0xffffff, 1);
// light.position.set(2, 4, 2);
// light.castShadow = true;
// scene.add(light);

// const light = new THREE.SpotLight(0xffffff, 1);
// light.position.set(2, 5, 12);
// light.angle = Math.PI / 6; // cone angle
// light.penumbra = 0.3; // softness at the edges
// light.castShadow = true;
// light.target = cube;
// scene.add(light);

const light = new THREE.HemisphereLight(0x00aaff, 0xffaa00, 1); // skyColor, groundColor, intensity
scene.add(light);

animate();

// dat.GUI controls
const gui = new dat.GUI();

const lightFolder = gui.addFolder("Directional Light");

// Position
lightFolder.add(light.position, "x", -10, 10, 0.1).name("posX");
lightFolder.add(light.position, "y", -10, 10, 0.1).name("posY");
lightFolder.add(light.position, "z", -10, 10, 0.1).name("posZ");

// Intensity
lightFolder.add(light, "intensity", 0, 5, 0.1).name("Intensity");

// Color
const lightColor = { color: light.color.getHex() };
lightFolder
  .addColor(lightColor, "color")
  .onChange((value: THREE.ColorRepresentation) => {
    light.color.set(value);
  })
  .name("Color");

lightFolder.open(); // open the folder by default
