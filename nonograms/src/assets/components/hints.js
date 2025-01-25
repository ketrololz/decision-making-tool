import { Field } from "./field";

export class Hint {
  element = null;

  constructor(parent, ...classList) {
    const cell = document.createElement('div');

    if (classList) {
      cell.classList.add(classList);
    }

    cell.textContent = '1 2 3 4 5'
    
    parent.append(cell);

    this.element = cell;
  }
}