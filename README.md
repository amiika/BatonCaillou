# Bâton Caillou

_Bâton Caillou_ is a canvas grid mimicking [ORCA](https://github.com/hundredrabbits/Orca) user interface. I just wanted to program it to see if I could then come up with a new different sequencer using the same format. This project does **NOTHING** for the moment. I also see it as a way to teach myself some JavaScript. You can test the app by visiting the [BâtonCaillou](https://batoncaillou.raphaelforment.fr) website.

# TODO

## Graphics

- [ ] Fixing canvas drawing (proper pixel size, no blurriness)
- [ ] Proper resizing user pixel proportions
- [ ] Drawing loop Optimization
  - [ ] Do not redraw every tile (only update what has changed)
  - [ ] Optimize looping over screen and looping over data
- [ ] Determine the right behavior for blinking cursor
- [ ] Fix cursor movement: lots of corner cases currently ignored

## Data

- [ ] Library for grid text manipulation (copy / paste / cut)
  - [ ] rewrite current functionalities to use that base lib
- [ ] Split every table in two complementary views
  - [ ] grid view (as is currently implemented)
  - [ ] script view (40 lines long script attached to table)
  - [ ] Rewrite `localStorage` to store more information about tables

## Interaction

- [X] Moving around using arrow keys
  - [X] **Shift** : create a zone selection
  - [X] **Ctrl** : move faster (5 by 5)
  - [X] **PageUp** (**>**) / **PageDown** (**<**) for switching grid
  - [X] **Backspace** : Delete a character
  - [X] **Enter** : move one line down

## I/O

- [ ] Scheduler
- [ ] MIDI
- [ ] OSC

## Credits

- JGS Font by [Adel Faure](https://adelfaure.net/), released on [Velvetyne](https://velvetyne.fr/fonts/jgs-font/).
