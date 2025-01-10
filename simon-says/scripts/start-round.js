import { generateSequence } from "./generate-sequence.js";
import { keyboardContainer } from "./difficulty-selector.js";
import { startGameBtn, repeatGameBtn } from "./start-game.js";
import { difficultyButtons } from "./difficulty-selector.js";
import { gameFieldContainer } from "./init.js";
import { title } from "./init.js";
import { newGameButton } from "./new-game.js";
import { createElem } from "./create-element.js";

let roundNum = 1;
let userInputArr = [];
let pressedKey = '';

function startRound(roundNum, input) {
  const sequenceLength = 2 * roundNum;
  const sequence = generateSequence(keyboardContainer.dataset.diff, sequenceLength);

  switchTitleToInput();
  
  input.textContent = '_'.repeat(sequenceLength);
  difficultyButtons.forEach((e) => { if (!e.classList.contains('active-difficulty')) disableButton(e) });
  disableButton(newGameButton);
}

function showSequence(sequence) {
  sequence.forEach((e, i) => showKey(e, i + 1, 1000));

  function showKey(key, i, timeout) {
    setTimeout(() => document.getElementById(key).classList.add('highlight'), timeout * i);
    setTimeout(() => document.getElementById(key).classList.remove('highlight'), (timeout * i) + timeout);
  }
}

function checkUserInputByDifficulty(userInput, diff) {
  
}

document.addEventListener('keydown', (key) => { 
  if (pressedKey) {
    return;
  }
  regUserInputByDifficulty(key, keyboardContainer.dataset.diff);
});

document.addEventListener('keyup', (key) => {
  if (key.keyCode === pressedKey) {
    pressedKey = '';
  }
});

function regUserInputByDifficulty(key, difficulty) {
  let keys = '';

  switch (difficulty) {
    case 'easy':
      keys = '1234567890';
      break;
    case 'medium':
      keys = 'qwertyuiopasdfghjklzxcvbnm';
      break;
    case 'hard':
      keys = '1234567890qwertyuiopasdfghjklzxcvbnm';
      break;
    default: 
      return;
  }

  const keysArr = keys.toUpperCase().split('');

  if (keysArr.includes(String.fromCharCode(key.keyCode))) {
    pressedKey = key.keyCode;
    userInputArr.push(key.keyCode);  
    return key;
  }

}

function disableButton(button) {
  button.disabled = 'true';
}

function enableButton(button) {
  button.disabled = 'false';
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

// showSequence([0, 2]);

export { startRound };
