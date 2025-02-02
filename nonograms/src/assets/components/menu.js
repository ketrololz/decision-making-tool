export class Menu {
  #element = null;

  constructor() {
    const menu = document.createElement('div');
    menu.classList.add('menu');

    this.#element = menu;
  }

  clear() {
    while (this.#element.childNodes.length > 0) {
      this.#element.lastChild.remove();
    }
  }

  getElem() {
    return this.#element;
  }

  showWindow() {
    this.#element.classList.toggle('open');
  }

  hideWindow() {
    this.#element.classList.remove('open');
  }

  appendNode(parent) {
    parent.append(this.#element);
  }
}
