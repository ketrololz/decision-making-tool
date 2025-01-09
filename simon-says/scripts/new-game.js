import { difficultyContainer } from "./difficulty-selector.js";
import { createElem } from './create-element.js';

const newGameButton = createElem({
  tag: 'button',
  text: 'New game',
  classes: ['new-game-button', 'button'],
});

// difficultyContainer.append(newGameButton);