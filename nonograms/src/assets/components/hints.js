export class Hint {
  element = null;

  constructor(parent, ...classList) {
    const cell = document.createElement('div');

    if (classList) {
      cell.classList.add(classList);
    }
    
    parent.append(cell);

    this.element = cell;
  }
}