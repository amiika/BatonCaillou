import { Screen } from './Screen.js';
import { State } from './State.js';
import { InputHandler } from './InputHandler.js';

export class Application {
  constructor(canvas, context, saved_tables) {
    // Table Grid Size
    this.grid = {
      height: 40, width: 60,
    }
    this.table_number = 48;

    // Graphical display
    this.screen = new Screen(this, canvas, context);
    // Application state
    this.state = new State(this, this.table_number, saved_tables);
    // Input handling
    this.keyboard = new InputHandler(this);
    // Global iterator for the number of updates
    this.iterator = 0;
    // Get text color from CSS
    this.textColor = getComputedStyle(canvas).getPropertyValue("--light-blue")
    // Get background color from CSS
    this.bgColor = getComputedStyle(canvas).getPropertyValue("--blue")
  }

  process() {
    this.screen.computePixelSize();
    this.iterator++;
    if (this.iterator >= 1000) {
      this.iterator = 0;
    }
    let table = this.state.table;
    let cursor = this.state.cursor;

    for (let i=0; i < table.length; i++) {
      for (let j=0; j < table.content[i].length; j++) {
        if (i % 5 == 0 && j % 5 == 0) {
          if (table.content[i][j+1].content == " ") {
            this.screen.drawPixel(i, j+1, this.textColor, "·")
          }
        }
      }
    }


    // Grid drawing routine
    for (let i=0; i < table.length; i++) {
      for (let j=0; j < table.content[i].length; j++) {

        // Cursor Drawing
        if (i == cursor.x && j == cursor.y) {
          if (cursor.x_size > 1 || cursor.y_size > 1 || !table.content[i][j].isEmpty()) {
            this.screen.drawPixelWithBackground(
              i, j, this.bgColor, this.textColor, table.content[i][j].content);
          } else {
            if(this.iterator%30<15) { // Blink
              this.screen.drawPixelWithBackground(
                i, j, this.bgColor, this.textColor, table.content[i][j].content);
            }
          }
        } else {
          // A tile can either be in the selection zone or not
          if ((i >= cursor.x && i < cursor.x + cursor.x_size)
            && ((j >= cursor.y && j < cursor.y + cursor.y_size))){
              this.screen.drawPixelWithBackground(
                i, j, this.bgColor, this.textColor, table.content[i][j].content);
          } else {
            this.screen.drawPixel(i, j, this.textColor, table.content[i][j].content);
          }
        }
      }
    }

    // Drawing the status bar at the top
    [...Array(this.grid.width).keys()].forEach((element) => {
      this.screen.drawPixelWithBackground(element, 0, this.bgColor, this.bgColor, " ");
    });

    // Print grid index number
    this.screen.drawPixelWithBackground(
      this.grid.width - 1, 0,
      this.textColor, this.bgColor, this.state.table_index.value.toString()
    )

    // Print iterator
    this.screen.drawPixelWithBackground(
      0.65, 0.15,
      this.textColor, this.bgColor, this.iterator
    )

    // Print command line
    this.screen.drawPixelWithBackground(
      2.15, 0.15, this.textColor, this.bgColor, "▶")
  }
}
