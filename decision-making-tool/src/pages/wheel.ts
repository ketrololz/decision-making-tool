import ButtonComponent from '../components/buttonComponent';
import { WheelComponent } from '../components/wheelComponent';
import type Router from '../router/router';
import { optionsState } from '../state/optionsState';
import BaseComponent from '../utils/baseComponent';

export class Wheel extends BaseComponent<'div'> {
  private router: Router;
  private state = optionsState;
  private rotationDuration = 0;

  private isShowingAttention = false;

  private title;

  constructor(router: Router) {
    super({ tag: 'div', className: 'container' });
    this.router = router;

    
    if (this.state.getOptions().length < 1) {
      this.state.loadState();
    }

    const buttonsContainer = new BaseComponent<'div'>({
      tag: 'div',
      className: 'buttons-container wheel-buttons-container',
    });

    const timerContainer = new BaseComponent<'div'>({
      tag: 'div',
      className: 'timer-container',
    });

    const timerInput = new BaseComponent<'input'>({
      tag: 'input',
      className: 'timer',
    });

    timerInput.setAttribute('type', 'number');
    timerInput.setAttribute('placeholder', 'sec');

    timerInput.addListener('input', (e) => {
      if (e.target instanceof HTMLInputElement) {
        this.rotationDuration = Number(e.target.value);
      }
    });

    const backButton = new ButtonComponent({
      className: 'options-button back-btn',
      text: 'back',
      event: 'click',
      listener: (): void => this.router.navigate('/options'),
    });

    const eliminationModeBtn = new ButtonComponent({
      className: 'elimination-btn',
      text: 'elimination mode',
      event: 'click',
      listener: (): void => {
        wheelElement.toggleEliminationMode();
        eliminationModeBtn.toggleClass('active');
      },
    });

    const settingsContainer = new BaseComponent({
      tag: 'div',
      className: 'settings-container',
    });

    const startButton = new ButtonComponent({
      className: 'start-button',
      text: 'spin the wheel',
      event: 'click',
      listener: async (): Promise<void> => {
        if (this.rotationDuration < 2) {
          this.showAttention(
            'The rotation time should be from 2 to 500 seconds',
          );
          return;
        }
        if (this.rotationDuration > 500) {
          this.showAttention(
            'The rotation time should be from 2 to 500 seconds',
          );
          return;
        }
        startButton.getNode().disabled = true;
        timerInput.getNode().disabled = true;
        backButton.getNode().disabled = true;
        eliminationModeBtn.getNode().disabled = true;

        wheelElement.rotate(this.rotationDuration).then(() => {
          startButton.getNode().disabled = false;
          timerInput.getNode().disabled = false;
          backButton.getNode().disabled = false;
          eliminationModeBtn.getNode().disabled = false;
        });
      },
    });

    this.enableButtonIfCanPlay(startButton);

    const segmentTitle = new BaseComponent({
      tag: 'h2',
      className: 'segment-title',
      text: 'press start',
    });

    this.title = segmentTitle;

    const wheelElement = new WheelComponent(
      this.state.getSectorOptions(),
      this.showCurrentTitle,
    );

    window.addEventListener('resize', () => wheelElement.updateSize());

    timerContainer.appendChildren([timerInput.getNode()]);

    settingsContainer.appendChildren([
      timerContainer.getNode(),
      eliminationModeBtn.getNode(),
    ]);

    buttonsContainer.appendChildren([
      backButton.getNode(),
      settingsContainer.getNode(),
    ]);

    this.appendChildren([
      buttonsContainer.getNode(),
      startButton.getNode(),
      segmentTitle.getNode(),
      wheelElement.getNode(),
    ]);
  }

  public showCurrentTitle = (text: string): void => {
    if (this.title) {
      this.title.setText(text);
    }
  };

  private enableButtonIfCanPlay(button: ButtonComponent): void {
    const buttonStatus = this.state.getSectorOptions().length < 2 ? true : false;
    button.getNode().disabled = buttonStatus;
  }

  private showAttention(text: string): void {
    if (!this.isShowingAttention) {
      const plate = new BaseComponent({
        tag: 'div',
        className: 'attention-plate slide',
        text: text,
      });

      this.appendChildren([plate.getNode()]);
      this.isShowingAttention = true;

      setTimeout(() => {
        plate.destroyNode();
        this.isShowingAttention = false;
      }, 2500);
    }
  }
}
