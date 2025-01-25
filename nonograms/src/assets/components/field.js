import { Cell } from "./cell";
import { Hint } from "./hints";

export class Field {
  #node = null;
  #fieldSize = 0;
  #cellSize = 0;

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
    this.#node = grid;
  }

  appendNode(parent) {
    parent.append(this.#node);
  }

  createCells(style) {
    const cellsCount = this.#fieldSize * this.#fieldSize;

    for (let i = 0; i < cellsCount; i += 1) {

      if (i === 0) {
        const cell = new Cell(this.#node, this.#cellSize, `empty-cell`);
      } else if (i < this.#fieldSize || i % this.#fieldSize === 0) {
        const cell = new Hint(this.#node, `hint`);
      } else {
        const cell = new Cell(this.#node, this.#cellSize, `${style}`);
        cell.element.addEventListener('click', cell.paint);
      }
    }
  }

  pictures = {
    cross: [[1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1]],
  }

  checkInput() {

  }
}