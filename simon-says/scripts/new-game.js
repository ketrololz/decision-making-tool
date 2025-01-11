import { difficultyContainer, difficultyButtons } from "./difficulty-selector.js";
import { createElem } from './create-element.js';
import { gameFieldContainer, title } from "./init.js";
import { topBar } from './top-bar.js';
import { startGameBtn } from "./start-game.js";
import { newGameButton } from "./start-round.js";
import { keyboardContainer } from "./difficulty-selector.js";

function createInitialScreen() {
  clearChilds(topBar);
  clearChilds(gameFieldContainer);
  newGameButton.remove();
  difficultyButtons.forEach((e) => e.disabled = false);

  gameFieldContainer.append(topBar);
  gameFieldContainer.append(title);
  gameFieldContainer.append(keyboardContainer);
  gameFieldContainer.append(startGameBtn);
}

function clearChilds(parent) {
  while(parent.firstChild) {
    parent.lastChild.remove();
  }
}

export { createInitialScreen };