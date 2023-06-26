import { Application } from './src/Application.js';

// Read tables data from Local Storage
let saved_tables = localStorage.getItem("tables");
const app = new Application(saved_tables)

//window.onbeforeunload = function(){
//  // Save state before leaving the page
//  localStorage.setItem("tables", app.state.encodeToBase64())
//}

let pre_output = document.getElementById("pre_output");

// Global main loop
function screenDraw() {
  pre_output.innerHTML = app.process("text");
}

function loop(timeStamp) {
  screenDraw();

  window.requestAnimationFrame(loop);
  // Request an animation frame
}

loop();
console.log(app.process("text"));
