import { createElem } from './create-element.js';

const bodyElem = document.body;

bodyElem.classList.add('background');


// game field

const gameFieldContainer = createElem({
  classes: ['game-field-container'],
});

// title

const title = createElem({
  tag: 'h1',
  text: 'SIMON_SAYS',
  classes: ['title'],
});

gameFieldContainer.append(title);

// start game

const startGameBtn = createElem({
  tag: 'button',
  text: 'Start',
  classes: ['start-game-btn', 'button'],
});

gameFieldContainer.append(startGameBtn);

export { bodyElem, gameFieldContainer };