// Taken from https://dev.to/jvon1904/how-to-wrap-around-a-range-of-numbers-with-the-modulo-cdo
export class Range {
  constructor(index, length) {
    this.index = index;
    this.length = length;
    this.incrementAmount = 1;
    this.decrementAmount = 1;
  }

  get value() {
    return this.index;
  }

  next() {
    this.index = (this.index + this.length + this.incrementAmount) % this.length;
    return this.index
  }

  previous() {
    this.index = (this.index + this.length - this.decrementAmount) % this.length;
    return this.index
  }
}
