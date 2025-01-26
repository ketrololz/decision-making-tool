export class Selector{
  element = null;

  constructor() {
    const form = document.createElement('select');
    form.classList.add('selector');

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

  appendNode(parent) {
    parent.append(this.element);
  }
}