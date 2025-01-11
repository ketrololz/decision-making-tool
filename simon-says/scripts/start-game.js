import { gameFieldContainer } from "./init.js";
import { createElem } from "./create-element.js";
import { topBar, attempsContainer, attempIcons, rounds } from "./top-bar.js";
import { difficultyContainer, keyboardContainer } from "./difficulty-selector.js";
import { bodyElem } from "./init.js";
import { title } from "./init.js";
import { startRound, input, repeatGameBtn, newGameButton } from "./start-round.js";

const startGameBtn = createElem({
  tag: 'button',
  text: 'Start',
  classes: ['start-game-btn', 'button'],
});

startGameBtn.addEventListener('click', () => startGame());

function startGame() {
  createGameField();
  keyboardContainer.childNodes.forEach((e) => e.classList.add('keyboard-hover'));
  bodyElem.classList.add('playing');
  rounds.dataset.round = '1';
  startRound(1, input);
}

function createGameField() {
  topBar.append(attempsContainer);
  attempIcons.forEach((e) => attempsContainer.append(e));
  topBar.append(rounds);
  difficultyContainer.append(newGameButton);
  changeButton(startGameBtn);
  switchTitleToInput(title, input);
}

function changeButton(button, newButton = repeatGameBtn) {
    button.remove();
    gameFieldContainer.append(newButton);
}

function switchTitleToInput(title) {
  title.remove();
  gameFieldContainer.insertBefore(input, keyboardContainer);
}

gameFieldContainer.append(startGameBtn);

export { startGameBtn, repeatGameBtn, changeButton }