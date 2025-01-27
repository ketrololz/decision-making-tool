import { Field } from './field.js';
import { Selector } from './selector.js';
import pictures from "./../nonograms.json";

const body = document.body;
const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

const gameField = new Field();

// gameField.appendNode(wrapper);
// body.appendChild(wrapper);

// gameField.createField(5, 1, 'game-field');

const difficultySelector = new Selector();

difficultySelector.element.addEventListener('change', (e) => {
  gameField.clear()
  gameField.changeDifficulty(e.target.value);
  gameField.changePicture(Object.keys(pictures[e.target.value])[0])
  gameField.createField(5, 1, 'game-field');

  pictureSelector.clear();
  for (const picture in pictures[e.target.value]) {
    pictureSelector.addOptions(picture);
  }
})

// difficultySelector.appendNode(wrapper);
// difficultySelector.addOptions('easy', 'medium', 'hard');

const pictureSelector = new Selector();

pictureSelector.element.addEventListener('change', (e) => {
  gameField.clear()
  gameField.changePicture(e.target.value)
  gameField.createField(5, 1, 'game-field');
})

// pictureSelector.appendNode(wrapper);
// pictureSelector.addOptions('test');

function initGame() {
  gameField.appendNode(wrapper);
  body.appendChild(wrapper);

  gameField.createField(5, 1, 'game-field');
  difficultySelector.appendNode(wrapper);
  difficultySelector.addOptions('easy', 'medium', 'hard');
  pictureSelector.appendNode(wrapper);
  for (const picture in pictures['easy']) {
    pictureSelector.addOptions(picture);
  }
}

initGame();


