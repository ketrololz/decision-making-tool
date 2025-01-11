import { generateSequence } from "./generate-sequence.js";
import { keyboardContainer } from "./difficulty-selector.js";
import { startGameBtn, repeatGameBtn } from "./start-game.js";
import { difficultyButtons } from "./difficulty-selector.js";
import { gameFieldContainer } from "./init.js";
import { title } from "./init.js";
import { newGameButton } from "./new-game.js";
import { createElem } from "./create-element.js";
import { attempIcons } from "./top-bar.js";

let roundNum = 1;
let currentAttemp = 0;
let pressedKey = '';
let inputCount = 0;

function startRound(roundNum, input) {
  const sequenceLength = 2 * roundNum;
  const sequence = generateSequence(keyboardContainer.dataset.diff, sequenceLength);

  showSequence(sequence);
  switchTitleToInput();
  
  input.textContent = '_'.repeat(sequenceLength);
  difficultyButtons.forEach((e) => { if (!e.classList.contains('active-difficulty')) disableButton(e) });
  disableButton(newGameButton);

  document.addEventListener('keydown', (key) => { 
    if (pressedKey) {
      return;
    }
    regUserInputByDifficulty(key, keyboardContainer.dataset.diff, sequence);
    inputCount += 1;
  });
}

function showSequence(sequence) {
  sequence.forEach((e, i) => showKey(e, i + 1, 1000));

  function showKey(key, i, timeout) {
    setTimeout(() => document.getElementById(key.toUpperCase()).classList.add('highlight'), timeout * i);
    setTimeout(() => document.getElementById(key.toUpperCase()).classList.remove('highlight'), (timeout * i) + timeout - 300);
  }
}

document.addEventListener('keyup', (key) => {
  if (String.fromCharCode(key.keyCode) === pressedKey) {
    pressedKey = '';
  }
});

function regUserInputByDifficulty(key, difficulty, sequence) {
  let keys = '';

  switch (difficulty) {
    case 'easy':
      keys = '1234567890';
      break;
    case 'medium':
      keys = 'QWERTYUIOPASDFGHJKLZXCVBNM';
      break;
    case 'hard':
      keys = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
      break;
    default: 
      return;
  }

  const keysArr = keys.toUpperCase().split('');

  if (keysArr.includes(String.fromCharCode(key.keyCode))) {
    pressedKey = String.fromCharCode(key.keyCode);
    console.log(sequence);
    console.log(pressedKey);
    
      if (pressedKey === sequence[inputCount]) {
        updateInput(pressedKey);
      } else {
        updateInput('×');
        shake();
        changeAttempColor(attempIcons);
      }

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
  title.remove();
  gameFieldContainer.insertBefore(input, keyboardContainer);
}

function updateInput(char) {
  const inputArr = input.textContent.split('');
  inputArr[inputArr.indexOf('_')] = char;
  input.textContent = inputArr.join('');
}

function shake() {
  gameFieldContainer.classList.add('shake');
  setTimeout(() => { gameFieldContainer.classList.remove('shake') }, 300);
}

function changeAttempColor(attempContainer, index = 0) {
  if (!attempContainer[index].classList.contains('spent')) {
    attempContainer[index].classList.add('spent');
    return;
  }

  else changeAttempColor(attempContainer, index += 1);
}

const input = createElem({
  tag: 'p',
  text: '__',
  classes: ['input-text'],
});

export { startRound };
