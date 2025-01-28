import { Field } from './field.js';
import { Selector } from './selector.js';
import pictures from "./../nonograms.json";
import { Modal } from './modal.js';
import { createElem } from './create-element.js';

const body = document.body;
const wrapper = createElem({
  parent: body,
  classes: ['wrapper'],
})

const gameField = new Field();

const difficultySelector = new Selector();

const topContainer = createElem({
  parent: wrapper,
  classes: ['top-container'],
})

const selectorContainer = createElem({
  parent: wrapper,
  classes: ['selectors-container'],
})

const solutionButton = createElem({
  tag: 'button',
  parent: topContainer,
  classes: ['solution-button', 'button'],
  text: 'solution'
})

solutionButton.addEventListener('mousedown', () => {
  gameField.showSolution();
})

const resetButton = createElem({
  tag: 'button',
  parent: topContainer,
  classes: ['reset-button', 'button'],
  text: 'reset'
})

resetButton.addEventListener('mousedown', () => {
  gameField.resetGame();
})

const saveGameButton = createElem({
  tag: 'button',
  parent: topContainer,
  classes: ['save-button', 'button'],
  text: 'save game'
})

saveGameButton.addEventListener('mousedown', () => {
  gameField.saveGame();
})

const loadGameButton = createElem({
  tag: 'button',
  parent: topContainer,
  classes: ['load-button', 'button'],
  text: 'load game'
})

loadGameButton .addEventListener('mousedown', () => {
  gameField.loadGame();
})

difficultySelector.element.addEventListener('change', (e) => {
  gameField.clear();
  gameField.changeDifficulty(e.target.value);
  gameField.changePicture(Object.keys(pictures[e.target.value])[0])
  gameField.createField('game-field');

  pictureSelector.clear();
  for (const picture in pictures[e.target.value]) {
    pictureSelector.addOptions(picture);
  }
})

const pictureSelector = new Selector();

pictureSelector.element.addEventListener('change', (e) => {
  gameField.clear();
  gameField.changePicture(e.target.value);
  gameField.createField('game-field');
})

function initGame() {
  gameField.appendNode(wrapper);
  gameField.createTimer(topContainer);
  gameField.createModal(body);


  gameField.createField('game-field');

  difficultySelector.appendNode(selectorContainer);
  difficultySelector.addOptions('easy', 'medium', 'hard');
  pictureSelector.appendNode(selectorContainer);
  for (const picture in pictures['easy']) {
    pictureSelector.addOptions(picture);
  }
}

initGame();

// const modal = new Modal();
// modal.appendNode(body);
// modal.showWindow();

// modal.getElem().addEventListener('mousedown', (e) => {if (e.target === modal.getElem()) modal.closeWindow()});


