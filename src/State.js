import { Cursor } from './Cursor.js';
import { Table } from './Table.js';
import { Range } from './Range.js';
import { Cell } from './Cell.js';

export class State {
  constructor(application, table_number, saved_tables) {
    this.app = application;
    this.cursor = new Cursor(
      Math.floor(this.app.grid.width / 2),
      Math.floor(this.app.grid.height / 2)
    );
    this.copy_buffer = [];
    this.command_buffer = "";
    this.command_memory = [];
    this.tables = {}
    for (let i = 0; i < table_number; i++) {
      this.tables[i] = new Table(this.app, this.app.grid.width, this.app.grid.height);
    }
    if (saved_tables !== null) {
      saved_tables = JSON.parse(atob(saved_tables))
      // Iterating over each table
      for (const [tables_key, tables_index] of Object.entries(saved_tables)) {
        // Iterating over each row in each table
        for (const [table_key, table_index] of Object.entries(tables_index)) {
          const makeNewCellArray = (value) => {
            return new Cell(value.content);
          }
          let reconstructed_array = table_index.map(makeNewCellArray);
          this.tables[tables_key].content[table_key] = reconstructed_array;
        }
      }
    }
    this.table_index = new Range(0, table_number);
    this.table = this.tables[this.table_index.value];
  }

  encodeToBase64 = () => {
    // There is no way to store a class instance with all methods.
    // Thus we will only store the content of each Cell and we will
    // trust the program to recompose each grid on loading.
    let saved_tables = {}
    for (const key in this.tables) {
      if (this.tables.hasOwnProperty(key)) {
        saved_tables[key] = this.tables[key].content;
      }
    }
    return btoa(JSON.stringify(saved_tables))
  }
}
