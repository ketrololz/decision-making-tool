import { PULSE_ANIMATION_MS } from '../constants/constants';
import { DataType } from '../types/dataType';
import type { State } from '../types/state';
import BaseComponent from '../utils/baseComponent';

export default class OptionComponent extends BaseComponent<'li'> {
  constructor(
    state: State,
    onUpdate: (newState: State, dataType: DataType) => void,
  ) {
    super({ tag: 'li', className: 'options-item' });
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

    if (state.title) {
      optionTitle.setAttribute('value', state.title);
    }

    optionTitle.setAttribute('id', `option-${position}`);
    optionTitle.setAttribute('placeholder', 'title');
    optionTitle.setAttribute('autocomplete', 'off');
    optionTitle.addListener('input', (e) => {
      if (e.target instanceof HTMLInputElement) {
        onUpdate({ id: state.id, title: e.target.value }, DataType.title);
      }
    });

    const optionWeight = new BaseComponent({
      tag: 'input',
      className: 'position-weight',
      text: state.weight ? String(state.weight) : '',
    });

    optionWeight.setAttribute('type', 'number');
    optionWeight.setAttribute('placeholder', 'weight');
    optionWeight.setAttribute('autocomplete', 'off');
    optionWeight.addListener('input', (e) => {
      if (e.target instanceof HTMLInputElement) {
        onUpdate(
          { id: state.id, title: state.title, weight: Number(e.target.value) },
          DataType.weight,
        );
      }
    });

    if (state.weight) {
      optionWeight.setAttribute('value', String(state.weight));
    }

    this.pulse()

    this.appendChildren([
      optionPosition.getNode(),
      optionTitle.getNode(),
      optionWeight.getNode(),
    ]);
  }

  private pulse(): void {
    this.toggleClass('pulse');
    setTimeout(() => this.toggleClass('pulse'), PULSE_ANIMATION_MS);
  }
}
