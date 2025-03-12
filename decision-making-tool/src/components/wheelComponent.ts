import BaseComponent from "../utils/baseComponent";

export class WheelComponent extends BaseComponent<'canvas'> {
  private ctx;
  constructor() {
    super({ tag: 'canvas', className: 'wheel' });
    this.ctx = this.getNode().getContext('2d')
  }

}