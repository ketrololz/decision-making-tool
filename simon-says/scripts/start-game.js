import { gameFieldContainer } from "./init.js";
import { createElem } from "./create-element.js";
import { topBar, attempsContainer, attempIcons, rounds } from "./top-bar.js";
import { newGameButton } from "./new-game.js";
import { difficultyContainer, keyboardContainer } from "./difficulty-selector.js";
import { bodyElem } from "./init.js";
import { title } from "./init.js";

const startGameBtn = createElem({
  tag: 'button',
  text: 'Start',
  classes: ['start-game-btn', 'button'],
});

const repeatGameBtn = createElem({
  tag: 'button',
  text: 'Repeat the sequence',
  classes: ['repeat-btn', 'button'],
})

startGameBtn.addEventListener('click', () => startGame());

function startGame() {
  createGameField();
  bodyElem.classList.add('playing');
  rounds.dataset.round = '1';
}

function createGameField() {
  topBar.append(attempsContainer);
  attempIcons.forEach((e) => attempsContainer.append(e));
  topBar.append(rounds);
  difficultyContainer.append(newGameButton);
  changeButton(startGameBtn);
  switchTitleToInput();
}

function switchTitleToInput() {
  title.remove()
  gameFieldContainer.insertBefore(input, keyboardContainer);
}

const input = createElem({
  tag: 'p',
  text: '__',
  classes: ['input-text'],
});

function changeButton(button) {
  if (button.classList.contains('start-game-btn')) {
    startGameBtn.remove();
    gameFieldContainer.append(repeatGameBtn);
  } else {
    repeatGameBtn.remove();
    gameFieldContainer.append(startGameBtn);
   }
}

gameFieldContainer.append(startGameBtn);