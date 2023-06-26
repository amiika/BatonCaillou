import { Application } from './src/Application.js';

const page = {
  canvas: document.getElementById("canvas"),
  scale: window.devicePixelRatio,
  context: canvas.getContext("2d"),
  width: Math.floor(window.innerWidth  * window.devicePixelRatio || 2),
  height: Math.floor(window.innerHeight * window.devicePixelRatio || 2),
};

// Read tables data from Local Storage
let saved_tables = localStorage.getItem("tables");

const app = new Application(
  page['canvas'], page['context'],
  saved_tables,
)

window.onbeforeunload = function(){
  // Save state before leaving the page
  localStorage.setItem("tables", app.state.encodeToBase64())
}

window.onresize = function(){
  app.screen.refresh();
  app.forceRedraw = true;
}

// Global main loop
function screenDraw() {
  app.process();
}

function loop() {
  screenDraw();

  // Request an animation frame
  window.requestAnimationFrame(loop);
}

loop()