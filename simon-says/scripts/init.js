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

export { bodyElem, gameFieldContainer, title };