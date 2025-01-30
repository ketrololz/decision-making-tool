import { createElem } from "./create-element";

createElem
export class Modal{
  element = null;

  constructor() {
    const modalContainer = document.createElement('dialog');
    modalContainer.classList.add('modal-container');

    this.element = modalContainer;
  }

  clear() {
    while (this.element.childNodes.length > 0) {
      this.element.lastChild.remove();
    }
  }
  
  showWindow(timer) {
    this.element.showModal();
    this.element.textContent = `Great! You have solved the nonogram in ${(timer.currTime() - 1000) / 1000} seconds!`;
    const closeButton = createElem({
      tag: 'button',
      classes: ['close-button', 'button'],
      text: 'close'
    })
    
    closeButton.addEventListener('mousedown', () => {
      this.closeWindow();
    })
    this.element.appendChild(closeButton)
  }

  closeWindow() {
    this.element.close();
  }

  getElem() {
    return this.element;
  }

  appendNode(parent) {
    parent.append(this.element);
  }
}