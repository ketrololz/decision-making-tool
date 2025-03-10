import type { State } from '../types/state';
import BaseComponent from '../utils/baseComponent';

export default class OptionComponent extends BaseComponent {
  constructor(state: State) {
    super({ tag: 'li', className: 'option-item' });

    const position = String(state.id);
  
      const optionPosition = new BaseComponent({
        tag: 'label',
        className: 'position-num',
        text: position,
      });
  
      optionPosition.setAttribute('for', `option-${position}`);
  
      const optionTitle = new BaseComponent({
        tag: 'input',
        className: 'position-title',
        text: state.title,
      });
  
      optionTitle.setAttribute('id', `option-${position}`);
      optionTitle.setAttribute('placeholder', 'title');
  
      const optionWeight = new BaseComponent({
        tag: 'input',
        className: 'position-weight',
        text: state.weight ? String(state.weight) : '',
      });
  
      optionWeight.setAttribute('type', 'number');
      optionWeight.setAttribute('placeholder', 'weight');
  
      const crossIconLink = new BaseComponent({
        tag: 'use',
      });
  
      crossIconLink.setAttribute('href', './../../svg/cross.svg#cross');
  
      const crossIcon = new BaseComponent(
        {
          tag: 'svg',
          className: 'cross-btn',
        },
        crossIconLink.getNode(),
      );
  
      crossIcon.setAttribute('height', '50');
      crossIcon.setAttribute('width', '50');
  
      const crossButton = new BaseComponent({
        tag: 'button',
        className: 'cross-btn',
      });
  
      crossButton.addListener('click', () => {
        crossButton.getNode().parentElement?.remove();
      });
  
      this.appendChildren([
        optionPosition.getNode(),
        optionTitle.getNode(),
        optionWeight.getNode(),
        crossButton.getNode(),
      ]);
  }
}
