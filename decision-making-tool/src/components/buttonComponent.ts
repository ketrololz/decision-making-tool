import type { Button } from '../types/button';
import BaseComponent from '../utils/baseComponent';

export default class ButtonComponent extends BaseComponent {
  constructor({ text = '', className = '', event, listener }: Button) {
    super({ tag: 'button', text: text, className: className });
    if (event && listener) {
      this.addListener(event, listener);
    }
  }
}
