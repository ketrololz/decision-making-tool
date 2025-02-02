import { createElem } from './create-element';

export class Switcher {
  #element = null;

  #switcherSlider = null;

  constructor() {
    const switcherContainer = createElem({
      tag: 'div',
      classes: ['switcher-container']
    });

    createElem({
      tag: 'p',
      parent: switcherContainer,
      classes: ['switcher-text'],
      text: 'sound'
    });

    const switcherSlider = createElem({
      tag: 'div',
      parent: switcherContainer,
      classes: ['toggle-slider', 'active']
    });

    this.#element = switcherContainer;
    this.#switcherSlider = switcherSlider;
  }

  clear() {
    while (this.#element.childNodes.length > 0) {
      this.#element.lastChild.remove();
    }
  }

  getElem() {
    return this.#element;
  }

  getSlider() {
    return this.#switcherSlider;
  }

  appendNode(parent) {
    parent.append(this.#element);
  }
}
