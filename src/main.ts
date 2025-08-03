const projectElement = document.querySelector<HTMLDivElement>("#projects")!;

const ulLinks = [
  // From Free Code Camp https://www.youtube.com/watch?v=UMqNHi1GDAE
  '<li><a href="/src/fcc-p1/index.html">Free Code Camp Project 1</a></li>',
  '<li><a href="/src/fcc-p2/index.html">Free Code Camp Project 2</a></li>',
  '<li><a href="/src/fcc-p3/index.html">Free Code Camp Project 3</a></li>',
  '<li><a href="/src/fcc-p4/index.html">Free Code Camp Project 4</a></li>',
  '<li><a href="/src/fcc-p5/index.html">Free Code Camp Project 5</a></li>',
  // From Documentation
  '<li><a href="/src/cube/index.html">Cube</a></li>',
  '<li><a href="/src/sphere/index.html">Sphere</a></li>',
  '<li><a href="/src/starfield/index.html">Starfield</a></li>',
  '<li><a href="/src/lights/index.html">Lights</a></li>',
].join("");
projectElement.innerHTML = ulLinks;
