import { Application } from './src/Application.js';

const page = {
  'canvas': document.getElementById("canvas"),
  'scale': window.devicePixelRatio,
  'context': canvas.getContext("2d"),
  'width': Math.floor(window.innerWidth * window.devicePixelRatio || 2),
  'height': Math.floor(window.innerHeight * window.devicePixelRatio || 2),
};

function handleResize() {
  page.canvas = document.getElementById("canvas");
  page.scale = window.devicePixelRatio;
  page.canvas.width = Math.floor(window.innerWidth * window.devicePixelRatio || 2) ;
  page.canvas.height = Math.floor(window.innerHeight * window.devicePixelRatio || 2);
  page.context.scale(window.devicePixelRatio, window.devicePixelRatio);
  page.context.canvas.width = window.innerWidth;
  page.context.canvas.height = window.innerHeight;
  console.log("Resizing like a pro")
}
window.onresize = handleResize;
handleResize();

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

// Global main loop
function screenDraw() {
  app.screen.refresh();
  app.process();
}

function loop(timeStamp) {
  screenDraw();

  // Request an animation frame
  window.requestAnimationFrame(loop);
}

loop()
