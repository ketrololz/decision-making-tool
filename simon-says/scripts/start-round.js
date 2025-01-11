import { generateSequence } from "./generate-sequence.js";
import { keyboardContainer } from "./difficulty-selector.js";
import { startGameBtn, changeButton } from "./start-game.js";
import { difficultyButtons } from "./difficulty-selector.js";
import { gameFieldContainer } from "./init.js";
import { title } from "./init.js";
import { newGameButton } from "./new-game.js";
import { createElem } from "./create-element.js";
import { attempIcons, rounds } from "./top-bar.js";
import { endRound, nextGameButton } from "./end-round.js";

let round = 1;
let currentAttemp = 0;
let pressedKey = '';
let inputCount = 0;
let isGameStopped = false;
let currentSequence = [];

const repeatGameBtn = createElem({
  tag: 'button',
  text: 'Repeat the sequence',
  classes: ['repeat-btn', 'button'],
})

function startRound(roundNum, input) {
  currentSequence = [];

  const sequenceLength = 2 * roundNum;
  const sequence = generateSequence(keyboardContainer.dataset.diff, sequenceLength);

  sequence.forEach((e) => currentSequence.push(e));

  enableButton(repeatGameBtn);
  clearData();
  changeButton(nextGameButton, repeatGameBtn);
  gameFieldContainer.classList.remove('congratulations');
  
  showSequence(sequence);
  
  input.textContent = '_'.repeat(sequenceLength);
  difficultyButtons.forEach((e) => { if (!e.classList.contains('active-difficulty')) disableButton(e) });
  disableButton(newGameButton);
  
  console.log('seq', sequence)
  
}

repeatGameBtn.addEventListener('click', () => {
  showSequence(currentSequence);
  input.textContent = '_'.repeat(currentSequence.length);
  inputCount = 0;
  isGameStopped = false;
  disableButton(repeatGameBtn);
});

document.addEventListener('keydown', (key) => {
  if (pressedKey || isGameStopped) {
    return;
  }
  regUserInputByDifficulty(key, keyboardContainer.dataset.diff, currentSequence);
});

nextGameButton.addEventListener('click', () => nextRound());

function clearData() {
  currentAttemp = 0;
  inputCount = 0;
}

function nextRound() {
  round += 1;
  rounds.textContent = `${round}/5`;
  startRound(round, input);
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

    if (inputCount >= sequence.length) {
      return;
    }
    if (pressedKey === sequence[inputCount] && inputCount === sequence.length - 1) {
      updateInput(pressedKey);
      congrats();
      endRound('win', input);
    }

    if (pressedKey === sequence[inputCount]) {
      updateInput(pressedKey);
    }

    if (!(pressedKey === sequence[inputCount])) {
      updateInput('×');
      shake();
      changeAttempColor(attempIcons);
      isGameStopped = true;
      currentAttemp += 1;
    }

    if(currentAttemp >= 2) {
      endRound('lose', input);
    }

    inputCount += 1;

    return key;
  }
}

function disableButton(button) { 
  button.disabled = 'true';
}

function enableButton(button) {
  if (button.disabled) {
    button.disabled = 'false';
  }
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

function congrats() {
  gameFieldContainer.classList.add('congratulations');
}

function changeAttempColor(attempContainer, index = 0) {
  if (!attempContainer[index]) {
    return;
  }

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

export { startRound, disableButton, input, nextRound, repeatGameBtn };
