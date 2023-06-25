export class InputHandler {
  constructor(application) {
    this.app = application;
    this.keyPresses = {};
    this.setupEventListeners();
    this.keyHandlerFunctions = [
      this.copyPasteHandler,
      this.keyDownHandler,
      this.keyUpHandler,
      this.keyLeftHandler,
      this.keyRightHandler,
      this.escapeKeyHandler,
      this.gridCharactersHandler,
      this.eraseCharacters,
      this.commandHandler,
      this.gridPageHandler,
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
    // console.log(`X: ${cursor.x}, Y: ${cursor.y}`);
    // console.log(`XS: ${cursor.x_size}, YS: ${cursor.y_size}`);
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
          cursor.y = cursor.y + cursor.y_size >= grid.height ? cursor.y : cursor.y + amount;
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
      if (shift) {
        if (amount == 1) {
            cursor.x_size = cursor.x <= grid.width - (cursor.x_size) - 1 ? cursor.x_size + 1 : cursor.x_size
          } else {
            cursor.x = cursor.x <= grid.width - cursor.x_size  ? cursor.x : cursor.x + amount
          }
        } else if (amount > 1) {
            cursor.x = cursor.x >= grid.width - 5 ? cursor.x : cursor.x + amount
        } else {
          cursor.x = cursor.x + cursor.x_size >= grid.width ? cursor.x : cursor.x + amount
        }
    }
  }

  escapeKeyHandler = (event) => {
    let cursor = this.app.state.cursor;
    if (event.key == "Escape") {
      // Resetting the cursor size
      cursor.y_size = 1; cursor.x_size = 1;
    }
  }

  gridCharactersHandler = (event) => {
    let cursor = this.app.state.cursor;
    let table = this.app.state.table.content;
    let validKeys = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    let control_pressed = this.keyPresses["Control"] ? true : false;
    if (validKeys.includes(event.key) && !control_pressed) {
      table[cursor.x][cursor.y].replaceContent(event.key);
    }
  }

  eraseCharacters = (event) => {
    let cursor = this.app.state.cursor;
    let table = this.app.state.table.content;

    if (event.key == "Backspace") {
      for (var i = cursor.x; i < cursor.x + cursor.x_size; i++) {
        for (var j = cursor.y; j < cursor.y + cursor.y_size; j++) {
          table[i][j].replaceContent(".");
        }
      }
    }

  }

  copyPasteHandler = (event) => {
    let cursor = this.app.state.cursor;
    let grid = this.app.grid;
    let copy_buffer = this.app.state.copy_buffer
    let control_pressed = this.keyPresses["Control"] ? true : false;
    if (control_pressed && event.key == "c") {
      let zone_content = this.app.state.table.getZone(cursor);
    } else if (control_pressed && event.key == "v") {
      this.app.state.table.applyZone(cursor)
    }
  }

  commandHandler = (event) => {
    if (event.key == "!") {
      console.log("User would like to type a command")
    }
  }

  gridPageHandler = (event) => {
    if (event.key == "PageUp") {
      this.app.state.table_index.next();
      this.app.state.table = this.app.state.tables[this.app.state.table_index.value];
    }
    if (event.key == "PageDown") {
      this.app.state.table_index.previous();
      this.app.state.table = this.app.state.tables[this.app.state.table_index.value];
    }
  }
}
