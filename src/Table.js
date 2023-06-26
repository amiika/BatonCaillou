import { Cell } from './Cell.js';

export class Table {
  constructor(application, width, height) {
    this.app = application;
    this.width = width;
    this.height = height;
    this.content = this.createEmptyTable();
  }

  get length() {
    return this.content.length;
  }
  
  createEmptyTable() {
    let table = [];
    for (var i=0; i < this.height; i++) {
      table[i] = [];
      for (var j=0; j < this.width; j++) {
        table[i][j] = new Cell(" ")
      }
    }
    return table;
  }

  copyZone = (cursor) => {
    let accumulator = [], char_zone = []
    for (var i=cursor.y; i < cursor.y + cursor.y_size + 1; i++) {
      if (i > cursor.y) {
        char_zone.push(accumulator)
      }
      accumulator = []
      for (var j=cursor.x; j < cursor.x + cursor.x_size; j++) {
        accumulator.push(this.content[i][j].content)
      }
    }
    return char_zone;
  }

  copyZoneToText = (cursor) => {
    let zone = this.copyZone(cursor);
    console.log(zone)
    let final_text = []
    zone.forEach((element) => {
      final_text.append(''.join(element))
    })
    console.log(final_text)
  }

  getZoneInCopyBuffer = (cursor) => {
    this.app.state.copy_buffer = this.copyZone(cursor);
  }

  pasteZone = (cursor) => {
    let copy_buffer = this.app.state.copy_buffer;
    copy_buffer.forEach((element, outerIndex) => {
      element.forEach((innerElement, innerIndex) => {
        this.content[cursor.y + outerIndex][cursor.x + innerIndex]
          .replaceContent(innerElement)
      })
    })
  }
}
