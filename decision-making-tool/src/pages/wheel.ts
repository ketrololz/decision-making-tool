import ButtonComponent from '../components/buttonComponent';
import { WheelComponent } from '../components/wheelComponent';
import type Router from '../router/router';
import { optionsState } from '../state/optionsState';
import type { State } from '../types/state';
import BaseComponent from '../utils/baseComponent';

export class Wheel extends BaseComponent<'div'> {
  private router: Router;
  private state = optionsState;

  constructor(router: Router) {
    super({ tag: 'div', className: 'container' });

    this.router = router;

    if (this.state.getOptions().length < 1) {
      this.state.setState();
    }

    const buttonsContainer = new BaseComponent<'div'>({
      tag: 'div',
      className: 'buttons-container',
    });

    const timerInput = new BaseComponent<'input'>({
      tag: 'input',
      className: 'timer',
      // text: state.title,
    });

    timerInput.setAttribute('placeholder', 'seconds');

    // if (state.title) {
    //   optionTitle.setAttribute('value', state.title);
    // }

    const backButton = new ButtonComponent({
      className: 'options-button start-button',
      text: 'back',
      event: 'click',
      listener: (): void => this.router.navigate('/options'),
    });

    const startButton = new ButtonComponent({
      className: 'options-button',
      text: 'start',
      event: 'click',
      listener: (): void => wheelElement.rotate(4),
    });

    const wheelElement = new WheelComponent(this.getSectorOptions());

    window.addEventListener('resize', () => wheelElement.updateSize());

    buttonsContainer.appendChildren([
      backButton.getNode(),
      timerInput.getNode(),
      startButton.getNode(),
    ]);

    this.appendChildren([buttonsContainer.getNode(), wheelElement.getNode()]);
  }

  public getSectorOptions(): State[] {
    return this.state
      .getOptions()
      .filter((elem) => elem.title && elem.weight);
  }
}
