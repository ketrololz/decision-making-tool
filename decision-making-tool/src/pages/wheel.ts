import ButtonComponent from '../components/buttonComponent';
import { WheelComponent } from '../components/wheelComponent';
import type Router from '../router/router';
import { optionsState } from '../state/optionsState';
import type { WheelItem } from '../types/wheelItem';
import BaseComponent from '../utils/baseComponent';
import { isWheelItem } from '../utils/itemIsWheelItem';

export class Wheel extends BaseComponent<'div'> {
  private router: Router;
  private state = optionsState;
  private rotationDuration = 0;

  private title;

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
    });

    timerInput.setAttribute('type', 'number');
    timerInput.setAttribute('placeholder', 'seconds');

    timerInput.addListener('input', (e) => {
      if (e.target instanceof HTMLInputElement) {
        this.rotationDuration = Number(e.target.value);
      }
    });

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
      listener: (): void => {
        if (this.rotationDuration < 2) {
          alert('invalid input');
          return;
        }
        wheelElement.rotate(this.rotationDuration);
      },
    });

    const segmentTitle = new BaseComponent({
      tag: 'h2',
      className: 'segment-title',
      text: 'press start',
    });

    this.title = segmentTitle;

    const wheelElement = new WheelComponent(
      this.getSectorOptions(),
      this.showCurrentTitle,
    );
    // wheelElement.showCurrentTitle(segmentTitle.getNode());

    window.addEventListener('resize', () => wheelElement.updateSize());

    buttonsContainer.appendChildren([
      backButton.getNode(),
      timerInput.getNode(),
      startButton.getNode(),
    ]);

    this.appendChildren([
      buttonsContainer.getNode(),
      segmentTitle.getNode(),
      wheelElement.getNode(),
    ]);
  }

  public showCurrentTitle = (text: string): void => {
    this.title.setText(text);
  }

  public getSectorOptions(): WheelItem[] {
    return this.state.getOptions().filter(isWheelItem);
  }
}
