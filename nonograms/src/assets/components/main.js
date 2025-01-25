import { Field } from './field.js';
import { Cell } from './cell.js';

const body = document.body;
const gameField = new Field(15, 20);

gameField.appendNode(body);
gameField.createCells();