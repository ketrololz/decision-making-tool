export class Records {
  #element = null;

  constructor() {
    const bestResults = document.createElement('div');
    bestResults.classList.add('best-results');

    this.#element = bestResults;
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

  appendNode(parent) {
    parent.append(this.#element);
  }
}