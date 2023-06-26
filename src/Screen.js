export class Screen {

  constructor(application, canvas, context) {
    this.app = application;
    this.canvas = canvas;
    this.context = context;
    this.pixel = {
      'height': 10, 'width': 10,
    };
    this.fontSize = this.pixel.height;
    this.fontName = "jgs7"
    this.refresh()
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

  drawCursor(cursor, front, back, cell, blink) {
    if (cursor.x_size > 1 || cursor.y_size > 1) {
      this.drawPixelWithBackground(cursor.x, cursor.y, back, front, cell.content);
    } else {
      if(blink) { // Blink
        this.drawPixelWithBackground(cursor.x, cursor.y, back, front, cell.content);
      } else {
        this.drawPixelWithBackground(cursor.x, cursor.y, front, back, cell.content);
      }
    }
  }

  isInSelection(cursor, i, j) {
    return (i >= cursor.x && i < cursor.x + cursor.x_size)
            && ((j >= cursor.y && j < cursor.y + cursor.y_size))
  }

  drawSelection(i,j,back,front,cell) {
    this.drawPixelWithBackground(i, j, back, front, cell.content);
  }

  computePixelSize() {
   this.pixel.height = this.canvas.height / this.app.grid.height;
    this.pixel.width = (this.canvas.width / this.app.grid.width);
    this.fontSize = this.pixel.height * 1;
  }

  refresh() {
    this.canvas.width = window.innerWidth * 2;
    this.canvas.height = window.innerHeight * 2;
    this.computePixelSize();
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}


