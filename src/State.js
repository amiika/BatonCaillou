import { Cursor } from './Cursor.js';
import { Table } from './Table.js';
import { Range } from './Range.js';

export class State {
  constructor(application, saved_tables) {
    this.app = application;
    this.cursor = new Cursor(
      Math.floor(this.app.grid.height / 2),
      Math.floor(this.app.grid.width / 2)
    );
    this.copy_buffer = [];
    this.tables = {
      0: new Table(this.app, this.app.grid.width, this.app.grid.height), 
      1: new Table(this.app, this.app.grid.width, this.app.grid.height),
      2: new Table(this.app, this.app.grid.width, this.app.grid.height),
      3: new Table(this.app, this.app.grid.width, this.app.grid.height),
      4: new Table(this.app, this.app.grid.width, this.app.grid.height),
      5: new Table(this.app, this.app.grid.width, this.app.grid.height),
      6: new Table(this.app, this.app.grid.width, this.app.grid.height),
      7: new Table(this.app, this.app.grid.width, this.app.grid.height),
      8: new Table(this.app, this.app.grid.width, this.app.grid.height),
      9: new Table(this.app, this.app.grid.width, this.app.grid.height),
    };

    this.table_index = new Range(0, 10);
    this.table = this.tables[this.table_index.value];
  }

  encodeToBase64 = () => {
    // There is no way to store a class instance with all methods.
    // Thus we will only store the repr for each Cell and trust the
    // system to recompose the grid on loading.
    let saved_tables = {}
    for (const key in this.tables) {
      if (this.tables.hasOwnProperty(key)) {
        saved_tables[key] = this.tables[key].content;
      }
    }
    return btoa(JSON.stringify(saved_tables))
  }
}
