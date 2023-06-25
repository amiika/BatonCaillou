# Bâton Caillou

_Bâton Caillou_ is a canvas grid mimicking [ORCA](https://github.com/hundredrabbits/Orca) user interface. I just wanted to program it to see if I could then come up with a new different sequencer using the same format. This project does **NOTHING** for the moment. I also see it as a way to teach myself some JavaScript. You can test the app by visiting the [BâtonCaillou](https://batoncaillou.raphaelforment.fr) website.

# TODO

## Graphics

- [X] Better font!
- [ ] Proper scaling for the canvas (it is blurry and not nice to Retina screens)
- [ ] Inferior command line / writing zone
- [ ] Superior command line / writing zone

## Data

- [X] Read/Write to the grid.
  - [X] Store grid content in memory (using `localStorage`)
- [X] Support multiple grids in parallel.

## Interaction

- [X] Moving around
- [ ] Command Line Interaction for Grid Manipulation
- [X] Basic Shortcuts
  - **Shift** : create a zone selection.
  - **Ctrl** : move faster (5 by 5).
  - **PageUp** / **PageDown** for switching grid
- [X] Fix grid overflow when moving around with zone selection ON

## I/O

- [ ] Scheduler
- [ ] MIDI
- [ ] OSC

## Credits

- JGS Font by [Adel Faure](https://adelfaure.net/), released on [Velvetyne](https://velvetyne.fr/fonts/jgs-font/).
