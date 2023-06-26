import { State } from './State.js';
import { InputHandler } from './InputHandler.js';

export class Application {
  constructor(saved_tables) {
    // Table Grid Size
    this.grid = {
      height: 40, width: 60,
    }
    this.table_number = 48;

    // Application state
    this.state = new State(this, this.table_number, saved_tables);
    // Input handling
    this.keyboard = new InputHandler(this);
    // Global iterator for the number of updates
    this.iterator = 0;
  }

  process(format) {
    this.iterator = this.iterator >= 100 ? 0 : this.iterator + 1;
    let table = this.state.table;
    let cursor = this.state.cursor;

    return format == "text" ? this.process_text(table,cursor) : false;
  }

  process_text(table, cursor) {
    let text = "";

    // Y axis index
    let yi = -1;
    
    // Loop trough table lines
    while (yi++ < table.height-1) {
      // X axis index
      let xi = -1;
      
      // Loop trough line cells
      while (xi++ < table.width-1) {

        const cell = table.content[yi][xi];

        if(cursor.x == xi && cursor.y == yi) {
          text+="<span class='selection'>"+cell.content+"</span>";
        } else {
          // In selection
          if((xi >= cursor.x && xi < cursor.x + cursor.x_size)
          && ((yi >= cursor.y && yi < cursor.y + cursor.y_size))) {
            text+="<span class='selection'>"+cell.content+"</span>";
          } else {
            if(cell) {
              text += cell.content;
            }
          }
        }

      }

      // add new line to text
      text +='\n';
    }

    return text;
  }

  
}
