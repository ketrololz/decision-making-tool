export class Selector{
  element = null;

  constructor() {
    const form = document.createElement('div');
    form.classList.add('modal');

    this.element = form;
  }

  addOptions(...options) {
    for(const value of options) {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      this.element.appendChild(option);
    }
  }

  clear() {
    while (this.element.childNodes.length > 0) {
      this.element.lastChild.remove()
    }
  }

  appendNode(parent) {
    parent.append(this.element);
  }
}