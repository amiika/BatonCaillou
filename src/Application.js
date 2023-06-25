import { Screen } from './Screen.js';
import { State } from './State.js';
import { InputHandler } from './InputHandler.js';

export class Application {
  constructor(canvas, context) {
    // Table Grid Size
    this.grid = {
      height: 10,
      width: 10,
    }

    // Graphical display
    this.screen = new Screen(this, canvas, context);
    // Application state
    this.state = new State(this);
    // Input handling
    this.keyboard = new InputHandler(this);
    // Global iterator for the number of updates
    this.iterator = 0;
  }

  process() {
    // Let's start by writing a table on the screen
    this.iterator++;
    let table = this.state.table;
    let cursor = this.state.cursor;

    // Grid drawing routine
    for (let i=0; i < table.length; i++) {
      for (let j=0; j < table.content[i].length; j++) {

        // Cursor Drawing
        if (i == cursor.x && j == cursor.y) {
          this.screen.drawPixelWithBackground(
            i, j, "white", "black", "@");
        } else {

          // A tile can either be in the selection zone or not
          if ((i >= cursor.x && i < cursor.x + cursor.x_size)
            && ((j >= cursor.y && j < cursor.y + cursor.y_size))){
            this.screen.drawPixelWithBackground(
              i, j, "white", "black", table.content[i][j].content[0].repr);
          } else {
            this.screen.drawPixel(i, j, "black", table.content[i][j].content[0].repr);
          }
        }
      }
    }
  }
}
