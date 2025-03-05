type Element = {
  tag: string;
  className: string;
  text: string;
};

export class BaseComponent {
  private _node;

  constructor(
    { tag = 'div', className = '', text = '' }: Element,
    ...children: HTMLElement[]
  ) {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = text;
    this._node = node;

    if (children) {
      this.appendChildren(children);
    }
  }

  public appendChildren(children: HTMLElement[]): void {
    children.forEach((child) => this._node.appendChild(child));
  }

  public getNode(): HTMLElement {
    return this._node;
  }

  public getChildren(): HTMLElement[] {
    const children: HTMLElement[] = [];
    this._node.childNodes.forEach((elem) => {
      if (elem instanceof HTMLElement) {
        children.push(elem);
      }
    });
    return children;
  }

  public setText(text: string): void {
    this._node.textContent = text;
  }

  public setAttribute(attribute: string, value: string): void {
    this._node.setAttribute(attribute, value);
  }

  public removeAttribute(attribute: string): void {
    this._node.removeAttribute(attribute);
  }

  public toggleClass(className: string): void {
    this._node.classList.toggle(className);
  }

  public addListener(
    event: string,
    listener: EventListenerOrEventListenerObject,
    options?: EventListenerOptions | boolean,
  ): void {
    this._node.addEventListener(event, listener, options);
  }

  public removeListener(
    event: string,
    listener: EventListenerOrEventListenerObject,
    options?: EventListenerOptions | boolean,
  ): void {
    this._node.removeEventListener(event, listener, options);
  }

  public destroyChildren(): void {
    this.getChildren().forEach((child) => child.remove());
  }

  public destroyNode(): void {
    this.destroyChildren();
    this._node.remove();
  }
}
