export class Cell {

  element = null;
  state = 0;
  position = 0;

  constructor(parent, size = 10, ...classList) {
    const cell = document.createElement('div');

    if (classList) {
      cell.classList.add(classList);
    }

    cell.style.width = `${size}px`;
    cell.style.height = `${size}px`;
    parent.append(cell);

    this.element = cell;
  }

  paint() {
    if (this.state === 1) {
      this.element.style.backgroundColor = 'aqua';
      this.state = 0;
      return this.state;
    }
    this.element.style.backgroundColor = 'green';
    this.state = 1;
    return this.state;
  }
}