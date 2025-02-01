import { Field } from './field.js';
import { Selector } from './selector.js';
import pictures from "./../nonograms.json";
import { Modal } from './modal.js';
import { createElem } from './create-element.js';
import { Records } from './best-results.js';
import { Menu } from './menu.js';
import './sounds.js';
import { Switcher } from './switcher.js';
import { Sounds } from './sounds.js';

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

const sound = new Sounds;
sound.getSoundsObj().volume = 0.5;

gameField.setAudio(sound);

difficultySelector.getElem().addEventListener('mousedown', () => {
  sound.playSound('click');
})

const solutionButton = createElem({
  tag: 'button',
  parent: topContainer,
  classes: ['solution-button', 'button'],
  text: 'solution'
})

solutionButton.addEventListener('mousedown', () => {
  gameField.showSolution();
  sound.playSound('click');
})

// function playSound(soundName) {
//   sound.setSound(audio.getTracksList()[soundName]);
//   sound.getSoundsObj().play();
// }

const menuWindow = new Menu();

menuWindow.appendNode(wrapper);

const menuButton = createElem({
  tag: 'button',
  parent: topContainer,
  classes: ['menu-button', 'button'],
  text: 'menu'
})

menuButton.addEventListener('mousedown', () => {
  menuWindow.showWindow();
  sound.playSound('click');
})

wrapper.addEventListener('mousedown', (e) => {

  if (e.target === muteSwitcher.getSlider()) {
    wrapper.addEventListener('transitionend', hideMenu);
  } else {
    hideMenu(e);
  }
});

function hideMenu(element) {
  try {
    if (element.target !== menuWindow.getElem() && element.target !== menuButton) { menuWindow.hideWindow() }
    if (element.target !== bestResultsWindow.getElem() && element.target !== bestResultsButton) { bestResultsWindow.hideWindow() }
    this.removeEventListener('transitionend', hideMenu);
  } catch (e) {
    // console.log(e)
  }
}

const resetButton = createElem({
  tag: 'button',
  parent: menuWindow.getElem(),
  classes: ['reset-button', 'button'],
  text: 'reset'
})

resetButton.addEventListener('mousedown', () => {
  gameField.resetGame();
  sound.playSound('click');
})

const saveGameButton = createElem({
  tag: 'button',
  parent: menuWindow.getElem(),
  classes: ['save-button', 'button'],
  text: 'save game'
})

const savePlate = createElem({
  tag: 'div',
  parent: wrapper,
  classes: ['save-plate'],
  text: 'saved successfully'
})

savePlate.addEventListener('animationend', () => {
  savePlate.classList.remove('active');
})

saveGameButton.addEventListener('mousedown', () => {
  if (gameField.canSave()) {
    gameField.saveGame();
    savePlate.textContent = 'saved successfully'
    savePlate.classList.remove('error');
    savePlate.classList.add('active');
  } else {
    savePlate.textContent = 'nothing to save'
    savePlate.classList.add('active', 'error');
  }
  sound.playSound('click');
})

const loadGameButton = createElem({
  tag: 'button',
  parent: menuWindow.getElem(),
  classes: ['load-button', 'button'],
  text: 'load game'
})

gameField.setLoadButton(loadGameButton);

loadGameButton.addEventListener('mousedown', () => {
  gameField.loadGame();
  sound.playSound('click');
})

const randomGameButton = createElem({
  tag: 'button',
  parent: menuWindow.getElem(),
  classes: ['random-button', 'button'],
  text: 'random game'
})

randomGameButton.addEventListener('mousedown', () => {
  gameField.clear();
  gameField.getRandomImage();
  gameField.createField(bestResultsWindow, difficultySelector, pictureSelector);
  sound.playSound('click');
})

const bestResultsWindow = new Records();

bestResultsWindow.appendNode(wrapper);

const bestResultsButton = createElem({
  tag: 'button',
  parent: topContainer,
  classes: ['best-results-button', 'button'],
  text: 'best'
})

bestResultsButton.addEventListener('mousedown', () => {
  bestResultsWindow.showWindow();
  sound.playSound('click');
})

const switchThemeButton = createElem({
  tag: 'button',
  parent: menuWindow.getElem(),
  classes: ['switch-button', 'button'],
  text: 'switch theme'
})

switchThemeButton.addEventListener('mousedown', () => {
  body.classList.toggle('dark');
  sound.playSound('click');
})

const muteSwitcher = new Switcher;
muteSwitcher.appendNode(menuWindow.getElem());

difficultySelector.element.addEventListener('change', (e) => {
  gameField.clear();
  gameField.changeDifficulty(e.target.value);
  gameField.changePicture(Object.keys(pictures[e.target.value])[0])
  gameField.updateSelectors(difficultySelector, pictureSelector)
  gameField.createField(bestResultsWindow, difficultySelector, pictureSelector);
  
  pictureSelector.clear();
  for (const picture in pictures[e.target.value]) {
    pictureSelector.addOptions(picture);
  }
  sound.playSound('click');
})

const pictureSelector = new Selector();

pictureSelector.element.addEventListener('change', (e) => {
  gameField.clear();
  gameField.changePicture(e.target.value);
  gameField.updateSelectors(difficultySelector, pictureSelector)
  gameField.createField(bestResultsWindow, difficultySelector, pictureSelector);
  sound.playSound('click');
})

pictureSelector.getElem().addEventListener('mousedown', () => {
  sound.playSound('click');
})

const audio = new Sounds();

document.addEventListener('DOMContentLoaded', () => {
  // audio.setMusic(audio.getTracksList().theme)
  audio.getMusicObj().volume = 0.1;
  // audio.getMusicObj().play()
});

function initGame() {
  loadGameButton.disabled = true;
  gameField.appendNode(wrapper);
  gameField.createModal(body);

  gameField.createField(bestResultsWindow, difficultySelector, pictureSelector);

  difficultySelector.appendNode(selectorContainer);
  difficultySelector.addOptions('easy', 'medium', 'hard');
  pictureSelector.appendNode(selectorContainer);
}

initGame();

muteSwitcher.getElem().addEventListener('mousedown', () => {
  muteSwitcher.getSlider().classList.toggle("active")
  if (muteSwitcher.getSlider().classList.contains("active")) {
    audio.getMusicObj().muted = false;
  } else {
    audio.getMusicObj().muted = true;
  }
  sound.playSound('click');
})
