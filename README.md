# Bâton Caillou

_Bâton Caillou_ is a canvas grid mimicking [ORCA](https://github.com/hundredrabbits/Orca) user interface. I just wanted to program it to see if I could then come up with a new different sequencer using the same format. This project does **NOTHING** for the moment. I also see it as a way to teach myself some JavaScript.

# TODO

## Graphics

- [ ] Better font!
- [ ] Proper scaling for the canvas (it is blurry and not nice to Retina screens)
- [ ] Inferior command line / writing zone
- [ ] Superior command line / writing zone

## Data

- [ ] Read/Write to the grid.
  - [ ] Store grid content in memory (cookies?)
- [ ] Support multiple grids in parallel.

## Interaction

- [X] déplacements
  - [X] déplacements simples
  - [X] déplacements rapides (Ctrl)
  - [X] curseur de zone
- [ ] Invité de commande pour scripter la grille
- [X] Raccourcis basiques
  - **Shift** : create a zone selection.
  - **Ctrl** : move faster (5 by 5).

## I/O

- [ ] Scheduler
- [ ] MIDI
- [ ] OSC
