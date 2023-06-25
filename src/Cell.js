import { EmptyChar, NumberChar, LetterChar } from "./Character.js";
import { isNumeric, isLetter } from './Utils.js';

export class Cell {
  constructor() {
    this.content = new EmptyChar();
  }

  replaceContent = (event) => {
    if (isNumeric(event)) {
      this.content = new NumberChar(event);
    }
    if (isLetter(event)) {
      this.content = new LetterChar(event);
    }
  }
}
