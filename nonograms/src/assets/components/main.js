import { Field } from './field.js';
import { Selector } from './selector.js';

const body = document.body;
const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

const gameField = new Field();

gameField.appendNode(wrapper);
body.appendChild(wrapper);

gameField.createField('easy', 5, 1, 'game-field');

const difficultySelector = new Selector();

difficultySelector.element.addEventListener('change', (e) => {
  gameField.clear()
  gameField.createField(e.target.value, 5, 1, 'game-field');
})


difficultySelector.appendNode(wrapper);
difficultySelector.addOptions('easy', 'medium', 'hard');