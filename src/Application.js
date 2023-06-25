import { Screen } from './Screen.js';
import { State } from './State.js';
import { InputHandler } from './InputHandler.js';

export class Application {
  constructor(canvas, context, saved_tables) {
    // Table Grid Size
    this.grid = {
      height: 48,
      width: 80,
    }

    // Graphical display
    this.screen = new Screen(this, canvas, context);
    // Application state
    this.state = new State(this, saved_tables);
    // Input handling
    this.keyboard = new InputHandler(this);
    // Global iterator for the number of updates
    this.iterator = 0;
  }

  process() {
    // Let's start by writing a table on the screen
    // if (this.iterator % 50 == 0) {
    //   console.log("Saving application state");
    //   localStorage.setItem("tables", this.state.encodeToBase64())
    // }
    this.iterator++;
    if (this.iterator >= 1000) {
      this.iterator = 0;
    }
    let table = this.state.table;
    let cursor = this.state.cursor;

    // Grid drawing routine
    for (let i=0; i < table.length; i++) {
      for (let j=0; j < table.content[i].length; j++) {

        // Cursor Drawing
        if (i == cursor.x && j == cursor.y) {
          if (cursor.x_size > 1 || cursor.y_size > 1) {
            this.screen.drawPixelWithBackground(
              i, j, "black", "white", "@");
          } else {
            this.screen.drawPixelWithBackground(
              i, j, "white", "black", "@");
          }
        } else {

          // A tile can either be in the selection zone or not
          if ((i >= cursor.x && i < cursor.x + cursor.x_size)
            && ((j >= cursor.y && j < cursor.y + cursor.y_size))){
            this.screen.drawPixelWithBackground(
              i, j, "black", "white", table.content[i][j].content);
          } else {
            this.screen.drawPixel(i, j, "white", table.content[i][j].content);
          }
        }
      }
    }

    // Drawing the status bar at the top
    [...Array(this.grid.width).keys()].forEach((element) => {
      this.screen.drawPixelWithBackground(element, 0, "black", "black", " ");
    });

    // Print grid index number
    this.screen.drawPixelWithBackground(
      this.grid.width - 1, 0,
      "white", "black", this.state.table_index.value.toString()
    )

    // Print iterator
    this.screen.drawPixelWithBackground(
      0, 0,
      "white", "black", this.iterator
    )

    // Print command line
    this.screen.drawPixelWithBackground(
      4, 0, "white", "black", ">")
  }
}
