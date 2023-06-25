import { Cell } from './Cell.js';

export class Table {
  constructor(application, width, height) {
    this.app = application;
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

  getZone = (cursor) => {
    let copy_buffer = this.app.state.copy_buffer;
    let accumulator = []
    let char_zone = [];

    for (var i=cursor.x; i < cursor.x + cursor.x_size + 1; i++) {
      if (i > cursor.x) {
        char_zone.push(accumulator)
      }
      accumulator = []
      for (var j=cursor.y; j < cursor.y + cursor.y_size; j++) {
        accumulator.push(this.content[i][j].content)
      }
    }
    this.app.state.copy_buffer = char_zone;
  }

  applyZone = (cursor) => {
    let copy_buffer = this.app.state.copy_buffer;
    copy_buffer.forEach((element, outerIndex) => {
      element.forEach((innerElement, innerIndex) => {
        this.content[cursor.x + outerIndex][cursor.y + innerIndex]
          .replaceContent(innerElement)
      })
    })
  }
}
