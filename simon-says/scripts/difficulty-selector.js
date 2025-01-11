import { bodyElem, gameFieldContainer } from "./init.js";
import { createElem } from './create-element.js';

const difficultyContainer = createElem({
  classes: ['difficulty-container'],
});

const difficults = ['Easy', 'Medium', 'Hard'];

const difficultyButtons = difficults.map((e) => createElem({
  tag: 'button',
  text: e,
  classes: ['difficulty-button', 'button'],
  id: `diff-${e.toLowerCase()}`
}));

bodyElem.append(difficultyContainer, gameFieldContainer);
difficultyButtons.forEach((e) => difficultyContainer.append(e));
difficultyContainer.firstChild.classList.add('active-difficulty');

const keyboardContainer = createElem({
  tag: 'div',
  classes: ['keyboard-container'],
})

function createKeyboard(keys) {
  const keyboard = keys.map((e) => {
    return createElem({
      tag: 'button',
      text: e,
      classes: ['button', 'keyboard-btn'],
      id: e,
    });
  });

  return keyboard;
}

const keys = '1234567890';
const keyboard = createKeyboard(keys.toUpperCase().split(''));
keyboardContainer.dataset.diff = 'easy';

function switchDifficulty(target, value, parent) {
  target.classList.add('active-difficulty');
  const keyboard = switchKeyboard(value);
  return keyboard.forEach((e) => parent.append(e));
}

function switchKeyboard(value) {
  while(keyboardContainer.firstChild) {
    keyboardContainer.lastChild.remove();
  }

  let keys = [];

  switch (value) {
    case 'easy':
      keys = '1234567890';
      keyboardContainer.dataset.diff = 'easy';
      break;
    case 'medium':
      keys = 'QWERTYUIOPASDFGHJKLZXCVBNM';
      keyboardContainer.dataset.diff = 'medium';
      break;
    case 'hard':
      keys = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
      keyboardContainer.dataset.diff = 'hard';
      break;
    default: 
      return;
  }

  return createKeyboard(keys.toUpperCase().split(''));
}

difficultyContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('difficulty-button')) {
    difficultyContainer.childNodes.forEach((e) => e.classList.remove('active-difficulty'));
  }

  switch (e.target.id) {
    case 'diff-easy':
      switchDifficulty(e.target, 'easy', keyboardContainer);
      break;
    case 'diff-medium':
      switchDifficulty(e.target, 'medium', keyboardContainer);
      break;
    case 'diff-hard':
      switchDifficulty(e.target, 'hard', keyboardContainer);
      break;
    default: 
      return;
  }
});

keyboard.forEach((e) => keyboardContainer.append(e));
gameFieldContainer.insertBefore(keyboardContainer, gameFieldContainer.lastChild);
gameFieldContainer.append(keyboardContainer);

export { difficultyContainer, keyboardContainer, difficultyButtons };