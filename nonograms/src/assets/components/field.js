import { Cell } from "./cell";

export class Field {
  #node = null;
  #blockSize = 0;

  constructor(blockSize = 5, cellInterval) {
    const grid = document.createElement('div');
    grid.classList.add('game-field');
    grid.style.gridTemplateColumns = `repeat(${blockSize}, ${cellInterval}px)`;
    grid.style.gridTemplateRows = `repeat(${blockSize}, ${cellInterval}px)`;

    this.#blockSize = blockSize;
    this.#node = grid;
  }

  appendNode(parent) {
    parent.append(this.#node);
  }

  createCells() {
    const cellsCount = this.#blockSize * this.#blockSize;

    for (let i = 0; i < cellsCount; i += 1) {
      const cell = new Cell(this.#node);
    }
  }

  createBlock(blockCount) {

  }
}