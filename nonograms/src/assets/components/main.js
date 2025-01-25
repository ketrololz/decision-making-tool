import { Field } from './field.js';
import { Hint } from './hints.js';

const body = document.body;
const gameField = new Field(5, 30, 10, 'game-field');

gameField.appendNode(body);
gameField.createCells('cell');
