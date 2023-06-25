export class Screen {

  constructor(application, canvas, context) {
    this.app = application;
    this.canvas = canvas;
    this.context = context;
    this.pixel = {
      'height': 10, 'width': 10,
    };
    this.fontSize = this.pixel.height;
    this.fontName = "jgs5";
  }

  drawPixel(x, y, color, character) {
    // Character
    this.context.fillStyle = color;
    this.context.textAlign = "center";
    this.context.font = `${this.fontSize}px ${this.fontName}`;
    this.context.fillText(character, 
      (this.pixel.width * x) + Math.floor(this.pixel.width / 2),
      (this.pixel.height * y) + Math.floor(this.pixel.height / 1.5))
  }

  drawPixelWithBackground(x, y, front, back, character) {
    //Background
    this.context.fillStyle = back;
    this.context.textAlign = "center";
    this.context.font = `${this.fontSize}px ${this.fontName}`;
    this.context.fillText("██",
      (this.pixel.width * x) + Math.floor(this.pixel.width / 2),
      (this.pixel.height * y) + Math.floor(this.pixel.height / 1.5))
    // Character
    this.context.fillStyle = front;
    this.context.fillText(character, 
      (this.pixel.width * x) + Math.floor(this.pixel.width / 2),
      (this.pixel.height * y) + Math.floor(this.pixel.height / 1.5))
  }

  drawCursor(x, y, color) {
    this.context.fillStyle = color;
    this.context.font = `${this.fontSize}px ${this.fontName}`;
    this.context.fillText("@", this.pixel.width*x, this.pixel.height*y);
  }

  computePixelSize() {
    this.pixel.height = this.canvas.height / this.app.grid.height;
    this.pixel.width = (this.canvas.width / this.app.grid.width);
    this.fontSize = this.pixel.height / 1.25;
  }

  refresh() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.computePixelSize();
  }

  clean() {
    console.log('Cleaning the screen');
  }
}


