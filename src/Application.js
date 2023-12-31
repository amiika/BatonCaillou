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
    // Draw everything at first
    this.forceRedraw = true;
  }

  process() {
    this.screen.computePixelSize();
    this.iterator = this.iterator >= 100 ? 0 : this.iterator + 1;

    let table = this.state.table;
    let cursor = this.state.cursor;

    // Grid drawing routine
    for (let i=0; i < table.length; i++) {
      for (let j=0; j < table.content[i].length; j++) {

        const cell = table.content[i][j]

        if (i % 5 == 0 && j % 5 == 0) {
          if (table.content[i][j+1].content == " " && this.forceRedraw) {
            this.screen.drawPixel(i, j+1, this.textColor, "·")
          }
        }

        // Cursor Drawing
        if (i == cursor.x && j == cursor.y) {
          const blink = this.iterator % 30 < 15 == 0
          this.screen.drawCursor(cursor, this.textColor, this.bgColor, cell, blink)
          cell.redraw = true
        } else {
          // A tile can either be in the selection zone or not
          if (this.screen.isInSelection(cursor, i, j)){
            this.screen.drawSelection(i, j, this.bgColor, this.textColor, cell);
            cell.redraw = true
          } else {
            if(cell.redraw || this.forceRedraw) {
              this.screen.drawPixelWithBackground(i, j, this.textColor, this.bgColor, cell.content);
              cell.redraw = false
            }
          }
        }
        
      }
    }

    // Stop redrawing
    this.forceRedraw = false;

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
      2.15, 0.15, this.textColor, this.bgColor, `▶ ${this.state.command_buffer}`)

  }
}
