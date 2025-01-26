export class Cell {

  element = null;
  state = 0;
  position = 0;

  constructor(parent, size = 1, ...classList) {
    const cell = document.createElement('div');

    if (classList) {
      cell.classList.add(classList);
    }

    cell.style.width = `${size}vmin`;
    cell.style.height = `${size}vmin`;
    parent.append(cell);

    this.element = cell;
  }

  paint() {
    if (this.state === 1) {
      this.element.classList.remove('painted');
      this.state = 0;
      return this.state;
    }
    this.element.classList.add('painted');
    this.element.classList.remove('cross');
    this.state = 1;
    return this.state;
  }

  markWithCross() {
    this.element.classList.toggle('cross');

    if (this.state === 1) {
      this.element.classList.remove('painted');
      this.state = 0;
      return this.state;
    }
  }
}