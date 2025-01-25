export class Cell {

  #node = null;

  constructor(parent, size = 10) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.width = `${size}px`;
    cell.style.height = `${size}px`;
    parent.append(cell);

    this.#node = cell;
  }
}