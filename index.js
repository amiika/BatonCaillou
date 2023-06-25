import { Application } from './src/Application.js';

const page = {
  'canvas': document.getElementById("canvas"),
  'scale': window.devicePixelRatio,
  'context': canvas.getContext("2d"),
  'width': Math.floor(window.innerWidth * window.devicePixelRatio || 2),
  'height': Math.floor(window.innerHeight * window.devicePixelRatio || 2),
};

page.canvas.width = page.width;
page.canvas.height = page.height;
page.context.scale(page.scale, page.scale);
page.canvas.style.width = page.width / page.scale + 'px';
page.canvas.style.height = page.height / page.scale + 'px';



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
