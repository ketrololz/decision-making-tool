export class Cell {

  element = null;
  state = 0;

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
      this.style.backgroundColor = 'aqua';
      this.state = 0;
      console.log(this.state)
      return;
    }
    this.style.backgroundColor = 'green';
    this.state = 1;
    console.log(this.state)
  }
}