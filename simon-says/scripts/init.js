import { createElem } from './create-element.js';

const bodyElem = document.body;

bodyElem.classList.add('background');

// game field

const gameFieldContainer = createElem({
  classes: ['game-field-container'],
});

// difficults

const difficultyContainer = createElem({
  classes: ['difficulty-container'],
});

const difficults = ['Easy', 'Medium', 'Hard'];

const difficultButtons = difficults.map((e) => createElem({
  tag: 'button',
  text: e,
  classes: ['difficulty-button', 'button'],
}))

// new game

const newGameButton = createElem({
  tag: 'button',
  text: 'New game',
  classes: ['new-game-button', 'button'],
})


difficultButtons.forEach((e) => difficultyContainer.append(e));
difficultyContainer.append(newGameButton);

bodyElem.append(difficultyContainer, gameFieldContainer);