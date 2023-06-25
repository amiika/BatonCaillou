import { Application } from './src/Application.js';

const page = {
  'dpr': window.devicePixelRatio || 1,
  'canvas': document.getElementById("canvas"),
  'context': canvas.getContext("2d"),
  'scale': window.devicePixelRatio,
  'width': Math.floor(window.innerWidth * window.devicePixelRatio),
  'height': Math.floor(window.innerHeight * window.devicePixelRatio),
};

const app = new Application(
  page['canvas'], page['context']
)

// page['canvas'].style.imageRendering = "pixelated";

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
