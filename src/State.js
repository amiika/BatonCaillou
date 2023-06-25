import { Cursor } from './Cursor.js';
import { Table } from './Table.js';
import { Range } from './Range.js';

export class State {
  constructor(application) {
    this.app = application;
    this.cursor = new Cursor();
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
}
