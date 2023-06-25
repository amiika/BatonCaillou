export class InputHandler {
  constructor(application) {
    this.app = application;
    this.keyPresses = {};
    this.setupEventListeners();
    this.keyHandlerFunctions = [
      this.keyDownHandler,
      this.keyUpHandler,
      this.keyLeftHandler,
      this.keyRightHandler,
      this.EscapeKeyHandler,
    ];
  }

  setupEventListeners = () => {
    window.addEventListener('keydown', this.keyDownListener, false);
    window.addEventListener('keyup', this.keyUpListener, false);
  }

  keyDownListener = (event) => {
    this.keyPresses[event.key] = true;
    let cursor = this.app.state.cursor;

    // Calling each registered key handler.
    this.keyHandlerFunctions.forEach(func => func(event));

    console.log(`X: ${cursor.x}, Y: ${cursor.y}`);
    console.log(`XS: ${cursor.x_size}, YS: ${cursor.y_size}`);
  }

  keyUpListener = (event) => {
    this.keyPresses[event.key] = false;
  }

  // KEYS //////////////////////////////////////////////////////

  keyDownHandler = (event) => {
    let cursor = this.app.state.cursor;
    let grid = this.app.grid;
    if (event.key === "ArrowDown") {
      let amount = this.keyPresses["Control"] ? 5 : 1;
      let shift = this.keyPresses["Shift"] ? true : false;

      if (amount == 1) {
        if (shift) {
          cursor.y_size = cursor.y + cursor.y_size >= grid.height ? cursor.y_size : cursor.y_size + 1
        } else {
          cursor.y = cursor.y + 1 >= grid.height ? cursor.y : cursor.y + amount;
        }
      } else if (amount > 1) {
        cursor.y = cursor.y + amount >= grid.height ? cursor.y : cursor.y + amount;
      } else {

      }
    }
  }

  keyUpHandler = (event) => {
    let cursor = this.app.state.cursor;
    let grid = this.app.grid;

    if (event.key === "ArrowUp") {
      let amount = this.keyPresses["Control"] ? 5 : 1;
      let shift = this.keyPresses["Shift"] ? true : false;

      if (amount == 1) {
        if (shift) {
          cursor.y_size =  cursor.y_size > 1 ? cursor.y_size - 1 : cursor.y_size
        } else {
          cursor.y = cursor.y <= 0 ? cursor.y : cursor.y -= amount;
        }
      } else if (amount > 1) {
        cursor.y = cursor.y - amount < 0 ? cursor.y : cursor.y - amount;
      } else {

      }
    }
  }

  keyLeftHandler = (event) => {
    let cursor = this.app.state.cursor;
    let grid = this.app.grid;

    if (event.key === "ArrowLeft") {
      let amount = this.keyPresses["Control"] ? 5 : 1;
      let shift = this.keyPresses["Shift"] ? true : false;

      if (amount == 1) {
        if (shift) {
          cursor.x_size = cursor.x_size > 1 ? cursor.x_size - 1 : cursor.x_size
        } else {
          cursor.x = cursor.x > 0 ? cursor.x - amount : cursor.x
        }
      } else if (amount > 1) {
        if (shift) {
          cursor.x_size = cursor.x_size > 5 ? cursor.x_size - 5 : cursor.x_size
        } else {
          cursor.x = cursor.x - 5 >= 0 ? cursor.x - amount : cursor.x
        }
      } else {

      }
    }
  }

  keyRightHandler = (event) => {
    let cursor = this.app.state.cursor;
    let grid = this.app.grid;

    if (event.key === "ArrowRight") {
      let amount = this.keyPresses["Control"] ? 5 : 1;
      let shift = this.keyPresses["Shift"] ? true : false;
      if (amount == 1) {
        if (shift) {
          cursor.x_size = cursor.x + (cursor.x_size - 2) <= grid.width - 1 ? cursor.x_size + 1 : cursor.x_size
        } else {
          cursor.x = cursor.x >= grid.width - 1 ? cursor.x : cursor.x + amount
        }
      } else if (amount > 1) {
        cursor.x = cursor.x >= grid.width - 5 ? cursor.x : cursor.x + amount
      } else {

      }
    }
  }

  EscapeKeyHandler = (event) => {
    let cursor = this.app.state.cursor;
    if (event.key == "Escape") {
      // Resetting the cursor size
      cursor.y_size = 1; cursor.x_size = 1;
    }
  }
}

