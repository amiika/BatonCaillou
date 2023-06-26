import { isNumeric, isLetter } from './Utils.js';

export class Cell {
  constructor(char) {
    if (char == null) {
      this.content = " ";
    } else {
      this.content = null;
      this.replaceContent(char);
    }
  }

  isEmpty() {
    return this.content == " " || this.content == ""
  }

  replaceContent = (event) => {
    if ("+/-*".includes(event)) {
      this.content = event.toString();
      return;
    }
    if (isNumeric(event)) {
      this.content = event.toString();
      return;
    }
    if (isLetter(event)) {
      this.content = event.toString();
      return;
    }
    if (event === " ") {
      this.content = event;
      return;
    }
  }
}
