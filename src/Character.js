export class Character {
  constructor() {
  }
}

export class EmptyChar extends Character {
  constructor() {
    super();
    this.repr = ".";
  }
}

export class NumberChar extends Character {
  constructor(number) {
    super();
    this.repr = number.toString();
  }
}

export class TestChar extends Character {
  constructor() {
    super();
    this.repr = "x";
  }
}
