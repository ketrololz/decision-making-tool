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
}));

bodyElem.append(difficultyContainer, gameFieldContainer);
difficultyButtons.forEach((e) => difficultyContainer.append(e));

// keyboard

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
    });
  });

  return keyboard;
}

const keys = '1234567890qwertyuiopasdfghjklzxcvbnm';
const keyboard = createKeyboard(keys.toUpperCase().split(''));

keyboard.forEach((e) => keyboardContainer.append(e));
gameFieldContainer.insertBefore(keyboardContainer, gameFieldContainer.lastChild);

export { difficultyContainer };