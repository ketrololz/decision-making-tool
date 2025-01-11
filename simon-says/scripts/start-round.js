import { generateSequence } from "./generate-sequence.js";
import { keyboardContainer } from "./difficulty-selector.js";
import { startGameBtn, changeButton } from "./start-game.js";
import { difficultyButtons } from "./difficulty-selector.js";
import { gameFieldContainer } from "./init.js";
import { title } from "./init.js";
import { createInitialScreen } from "./new-game.js";
import { createElem } from "./create-element.js";
import { attempIcons, rounds } from "./top-bar.js";
import { endRound, nextGameButton } from "./end-round.js";

let round = 1;
let currentAttemp = 0;
let pressedKey = '';
let inputCount = 0;
let isGameStopped = false;
let currentSequence = [];
let isShowingSequence = false;

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
  console.log(sequence);
  
  input.textContent = '_'.repeat(sequenceLength);
  difficultyButtons.forEach((e) => { if (!e.classList.contains('active-difficulty')) disableButton(e) });
  disableButton(newGameButton);
}

repeatGameBtn.addEventListener('click', () => {
  showSequence(currentSequence);
  input.textContent = '_'.repeat(currentSequence.length);
  inputCount = 0;
  isGameStopped = false;
  disableButton(repeatGameBtn);
});

document.addEventListener('keydown', (key) => {
  if (pressedKey || isGameStopped || isShowingSequence) {
    return;
  }
  const keyValue = String.fromCharCode(key.keyCode);
  regUserInputByDifficulty(keyValue, keyboardContainer.dataset.diff, currentSequence);
}); 

keyboardContainer.addEventListener('mousedown', (e) => {
  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  if (pressedKey || isGameStopped || isShowingSequence) {
    return;
  }

  const keyValue = e.target.id;
  regUserInputByDifficulty(keyValue, keyboardContainer.dataset.diff, currentSequence);
  pressedKey = '';
})

nextGameButton.addEventListener('click', () => nextRound());

function clearData() {
  currentAttemp = 0;
  inputCount = 0;
  isGameStopped = false;
  rounds.textContent = `${round}/5`;
  attempIcons.forEach((e) => e.classList.remove('spent'));
}

function nextRound() {
  if (round < 5) {
    round += 1;
    rounds.textContent = `${round}/5`;
    startRound(round, input);
  }
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function showSequence(sequence) {

  isShowingSequence = true;
  keyboardContainer.childNodes.forEach((e) => disableButton(e));
  disableButton(newGameButton);
  disableButton(repeatGameBtn);

  for (const char of sequence) {
    showKey(char);
    await delay(700).then(() => stopShowing(char));
    await delay(300);
  }

  function showKey(key) {
    document.getElementById(key.toUpperCase()).classList.add('highlight');
  }

  function stopShowing(key) {
    document.getElementById(key.toUpperCase()).classList.remove('highlight');
  }

  keyboardContainer.childNodes.forEach((e) => enableButton(e));
  enableButton(newGameButton);
  if (currentAttemp < 1) {
    enableButton(repeatGameBtn);
  }
  isShowingSequence = false;
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

  if (keysArr.includes(key)) {
    pressedKey = key;

    if (inputCount >= sequence.length) {
      return;
    }

    if (pressedKey === sequence[inputCount] && inputCount === sequence.length - 1 && round === 5) {
      updateInput(pressedKey);
      congrats();
      endRound('win', input);
      showActiveKey(pressedKey, 'correct');
      return;
    }

    if (pressedKey === sequence[inputCount] && inputCount === sequence.length - 1) {
      updateInput(pressedKey);
      congrats();
      endRound('correct', input);
      showActiveKey(pressedKey, 'correct');
    }

    if (pressedKey === sequence[inputCount]) {
      updateInput(pressedKey);
      showActiveKey(pressedKey, 'correct');
    }

    if (!(pressedKey === sequence[inputCount])) {
      updateInput('×');
      shake();
      changeAttempColor(attempIcons);
      isGameStopped = true;
      currentAttemp += 1;
      showActiveKey(pressedKey, 'incorrect');
    }

    if(currentAttemp >= 2) {
      endRound('lose', input);
      showActiveKey(pressedKey, 'incorrect');
    }

    inputCount += 1;

    return key;
  }
}

function disableButton(button) { 
  button.disabled = true;
}

function enableButton(button) {
    button.disabled = false;
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

function showActiveKey(key, status) {
  const currentKey = document.getElementById(key);

  if (status === 'incorrect') {
    currentKey.classList.add('incorrect');
    setTimeout(() => { currentKey.classList.remove('incorrect') }, 200);
  }
  
  currentKey.classList.add('correct');
  setTimeout(() => { currentKey.classList.remove('correct') }, 200);
}

const newGameButton = createElem({
  tag: 'button',
  text: 'New game',
  classes: ['new-game-button', 'button'],
});

newGameButton.addEventListener('click', () => {
  clearData();
  createInitialScreen();
  round = 1;
})

export { startRound, disableButton, input, nextRound, repeatGameBtn, clearData, newGameButton };
