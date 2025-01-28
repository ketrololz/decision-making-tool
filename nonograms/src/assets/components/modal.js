export class Modal{
  element = null;

  constructor() {
    const modalContainer = document.createElement('dialog');
    modalContainer.classList.add('modal-container');

    const modal = document.createElement('div');
    modal.classList.add('modal');

    modalContainer.appendChild(modal);

    this.element = modalContainer;
  }

  clear() {
    while (this.element.childNodes.length > 0) {
      this.element.lastChild.remove();
    }
  }
  
  showWindow() {
    this.element.showModal();
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