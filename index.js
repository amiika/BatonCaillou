import { Application } from './src/Application.js';

// Read tables data from Local Storage
let saved_tables = localStorage.getItem("tables");
const app = new Application(saved_tables)

window.onbeforeunload = function(){
  // Save state before leaving the page
  localStorage.setItem("tables", app.state.encodeToBase64())
}

// Global main loop
function screenDraw() {
  app.process();
}

function loop(timeStamp) {
  screenDraw();

  window.requestAnimationFrame(loop);
  // Request an animation frame
}

loop()
