import { generateSequence } from "./generate-sequence.js";
import { keyboardContainer } from "./difficulty-selector.js";
import { changeButton } from "./start-game.js";
import { difficultyButtons } from "./difficulty-selector.js";
import { gameFieldContainer } from "./init.js";
import { createInitialScreen } from "./new-game.js";
import { createElem } from "./create-element.js";
import { attemptIcons, rounds } from "./top-bar.js";
import { endRound, nextGameButton } from "./end-round.js";
import { playSound, clickSound, wrongSound, correctSound } from "./sound.js";

let round = 1;
let currentAttempt = 0;
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
  isGameStopped = false;

  const sequenceLength = 2 * roundNum;
  const sequence = generateSequence(keyboardContainer.dataset.diff, sequenceLength);

  sequence.forEach((e) => currentSequence.push(e));
  keyboardContainer.childNodes.forEach((e) => e.classList.add('keyboard-hover'));

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
  disableButton(repeatGameBtn);
  showSequence(currentSequence);

  if (currentAttempt < 1) {
    currentAttempt += 1;
    changeAttemptColor(attemptIcons);
  }

  input.textContent = '_'.repeat(currentSequence.length);
  inputCount = 0;
  isGameStopped = false;
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

nextGameButton.addEventListener('click', () => playSound(clickSound));
nextGameButton.addEventListener('click', () => nextRound());

function clearData() {
  currentAttempt = 0;
  inputCount = 0;
  isGameStopped = false;
  rounds.textContent = `${round}/5`;
  attemptIcons.forEach((e) => e.classList.remove('spent'));
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
  let isDisabled = false;

  if (repeatGameBtn.disabled) {
    isDisabled = true;
  }

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
  keyboardContainer.childNodes.forEach((e) => e.classList.add('keyboard-hover'));
  enableButton(newGameButton);
  if (!isDisabled) {
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
      inputCount += 1;
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
      changeAttemptColor(attemptIcons);
      isGameStopped = true;
      currentAttempt += 1;
      enableButton(repeatGameBtn);
      keyboardContainer.childNodes.forEach((e) => e.classList.remove('keyboard-hover'));
      showActiveKey(pressedKey, 'incorrect');
    }

    if (currentAttempt >= 2) {
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

function changeAttemptColor(attemptContainer, index = 0) {
  if (!attemptContainer[index]) {
    return;
  }

  if (!attemptContainer[index].classList.contains('spent')) {
    attemptContainer[index].classList.add('spent');
    return;
  }

  else changeAttemptColor(attemptContainer, index += 1);
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
    playSound(wrongSound);
    setTimeout(() => { currentKey.classList.remove('incorrect') }, 200);
  } else {
    currentKey.classList.add('correct');
    playSound(correctSound);
    setTimeout(() => { currentKey.classList.remove('correct') }, 200);
  }
}

const newGameButton = createElem({
  tag: 'button',
  text: 'New game',
  classes: ['new-game-button', 'button'],
});

newGameButton.addEventListener('click', () => {
  playSound(clickSound);
})

newGameButton.addEventListener('click', () => {
  clearData();
  createInitialScreen();
  isGameStopped = true;
  round = 1;
})


export { startRound, disableButton, input, nextRound, repeatGameBtn, clearData, newGameButton };
