import { Cell } from "./cell";
import { Hint } from "./hints";

export class Field {
  element = null;
  #fieldSize = 0;
  #cellSize = 0;
  #currImageArr = [];
  currFieldElements = [];
  currFieldValue = [];
  currHintElements = [];

  constructor(fieldSize = 5, cellSize = 20, cellInterval = 10, ...classList) {
    const grid = document.createElement('div');
    if (classList) {
      grid.classList.add(...classList);
    }

    grid.style.gridTemplateColumns = `${cellSize * 3}px repeat(${fieldSize}, ${cellSize}px)`;
    grid.style.gridTemplateRows = `${cellSize * 3}px repeat(${fieldSize}, ${cellSize}px)`;
    grid.style.gap = `${cellInterval}px`;

    this.#fieldSize = fieldSize + 1;
    this.#cellSize = cellSize;
    this.element = grid;
  }

  appendNode(parent) {
    parent.append(this.element);
  }

  createCells(style) {
    const cellsCount = this.#fieldSize * this.#fieldSize;
    let position = 0;

    for (let i = 0; i < cellsCount; i += 1) {

      if (i === 0) {
        const emptyCell = new Cell(this.element, this.#cellSize, `empty-cell`);
      } else if (i < this.#fieldSize || i % this.#fieldSize === 0) {
        const hint = new Hint(this.element, `hint`);
        this.currHintElements.push((hint));
      } else {
        const cell = new Cell(this.element, this.#cellSize, `${style}`);
        cell.position = position;
        this.currFieldElements.push(cell);
        this.currFieldValue.push(cell.state);
        position += 1;
      }
    }
    this.currFieldElements.forEach((cell) => cell.element.addEventListener('click', () => {
      cell.paint();
      this.currFieldValue[cell.position] = cell.state;
      console.log(this.currFieldValue);
      console.log(this.currFieldValue.flat().join('') === this.pictures.cross.flat().join(''));
      console.log(this.currHintElements);
    }));
    
  }

  updateState() {
    console.log(this.currFieldElements);
  }

  pictures = {
    cross: [[1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1]],
  }

  choosePicture(pic) {
    this.#currImageArr = this.pictures.pic;
  }

  checkInput() {
    console.log('t', this)
  }
}