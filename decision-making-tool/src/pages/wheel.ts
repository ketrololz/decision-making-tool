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
      this.state.loadState();
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

    const russianRouletteModeBtn = new ButtonComponent({
      className: 'russian-roulette-btn',
      text: 'russian roulette mode',
      event: 'click',
      listener: (): void => {
        wheelElement.toggleRusRouletteMode();
        russianRouletteModeBtn.toggleClass('active');
      },
    });

    const startButton = new ButtonComponent({
      className: 'options-button',
      text: 'start',
      event: 'click',
      listener: async (): Promise<void> => {
        if (this.rotationDuration < 2) {
          alert('The rotation time should be from 2 to 500 seconds');
          return;
        }
        if (this.rotationDuration > 500) {
          alert('The rotation time should be from 2 to 500 seconds');
          return;
        }
        startButton.getNode().disabled = true;
        timerInput.getNode().disabled = true;
        backButton.getNode().disabled = true;
        russianRouletteModeBtn.getNode().disabled = true;

        wheelElement.rotate(this.rotationDuration).then(() => {
          startButton.getNode().disabled = false;
          timerInput.getNode().disabled = false;
          backButton.getNode().disabled = false;
          russianRouletteModeBtn.getNode().disabled = false;
        });
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

    window.addEventListener('resize', () => wheelElement.updateSize());

    buttonsContainer.appendChildren([
      backButton.getNode(),
      timerInput.getNode(),
      russianRouletteModeBtn.getNode(),
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
  };

  public getSectorOptions(): WheelItem[] {
    return this.state.getOptions().filter(isWheelItem);
  }
}
