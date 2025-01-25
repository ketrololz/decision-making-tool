import { Field } from "./field";

export class Hint {
  #node = null;

  constructor(parent, size = 10, ...classList) {
    const cell = document.createElement('div');

    if (classList) {
      cell.classList.add(classList);
    }

    cell.style.width = `${size}px`;
    cell.style.height = `${size}px`;
    parent.append(cell);

    this.#node = cell;
  }
}