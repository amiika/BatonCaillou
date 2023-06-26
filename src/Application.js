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

  process() {
    this.iterator = this.iterator >= 100 ? 0 : this.iterator + 1;
    let table = this.state.table;
    let cursor = this.state.cursor;
  }
}
