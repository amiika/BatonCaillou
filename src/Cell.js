import { EmptyChar, NumberChar, TestChar } from "./Character.js";

export class Cell {
  constructor() {
    this.content = [
      new EmptyChar(),
      new TestChar(),
    ]
  }
  get length() {
    return this.content.length;
  }
}
