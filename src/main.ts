const projectElement = document.querySelector<HTMLDivElement>("#projects")!;

const ulLinks = `
  <li><a href="/src/cube/index.html">Cube</a></li>
  <li><a href="/src/sphere/index.html">Sphere</a></li>
  <li><a href="/src/starfield/index.html">Starfield</a></li>
  <li><a href="/src/lights/index.html">Lights</a></li>
`;
projectElement.innerHTML = ulLinks;
