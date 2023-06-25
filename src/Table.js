import { Cell } from './Cell.js';

export class Table {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.content = this.createEmptyTable();
  }

  get length() {
    return this.content.length;
  }
  
  createEmptyTable() {
    let table = [];
    for (var i=0; i < this.width; i++) {
      table[i] = [];
      for (var j=0; j < this.height; j++) {
        table[i][j] = new Cell()
      }
    }
    return table;
  }

  getZone() {
  }
}
