import { audioController } from '../audio/audio';
import ButtonComponent from '../components/buttonComponent';
import { WheelComponent } from '../components/wheelComponent';
import {
  DEFAULT_SPIN_DURATION,
  MAX_SPIN_SECONDS,
  MIN_SPIN_SECONDS,
} from '../constants/constants';
import type Router from '../router/router';
import { optionsState } from '../state/optionsState';
import { AudioType } from '../types/audioTypes';
import BaseComponent from '../utils/baseComponent';

export class Wheel extends BaseComponent<'div'> {
  private router: Router;
  private state = optionsState;
  private rotationDuration = DEFAULT_SPIN_DURATION;

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
    timerInput.getNode().value = String(DEFAULT_SPIN_DURATION);

    timerInput.addListener('input', (e) => {
      if (e.target instanceof HTMLInputElement) {
        this.rotationDuration = Number(e.target.value);
      }
    });

    const soundButton = new ButtonComponent({
      className: 'options-button sound-btn',
      event: 'click',
      listener: (): void => {
        if (soundButton.getNode().classList.contains('mute')) {
          soundButton.toggleClass('mute');
          this.state.changeSoundState(false);
          audioController.unMute();
        } else {
          soundButton.toggleClass('mute');
          audioController.mute();
          this.state.changeSoundState(true);
        }
      },
    });

    if (this.state.isSoundMuteState()) {
      soundButton.getNode().classList.add('mute');
      audioController.mute();
    }

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
        if (this.rotationDuration < MIN_SPIN_SECONDS) {
          this.showAttention(
            `The rotation time should be from ${MIN_SPIN_SECONDS} to ${MAX_SPIN_SECONDS} seconds`,
          );
          return;
        }
        if (this.rotationDuration > 500) {
          this.showAttention(
            `The rotation time should be from ${MIN_SPIN_SECONDS} to ${MAX_SPIN_SECONDS} seconds`,
          );
          return;
        }
        this.disableButtons([startButton, timerInput, backButton, soundButton]);
        eliminationModeBtn.getNode().disabled = true;
        audioController.playSound('baraban', AudioType.sound).then(() => {
          audioController.playSound('spin', AudioType.sound);
        });
        wheelElement.rotate(this.rotationDuration).then(() => {
          audioController.playSound('end', AudioType.sound);
          this.enableButtons([
            startButton,
            timerInput,
            backButton,
            soundButton,
          ]);
          eliminationModeBtn.getNode().disabled = false;
        });
      },
    });

    this.enableButtonIfCanPlay(startButton);

    const segmentTitle = new BaseComponent({
      tag: 'h2',
      className: 'segment-title',
      text: 'SPIN IT!',
    });

    this.title = segmentTitle;

    const wheelElement = new WheelComponent(
      this.state.getSectorOptions(),
      this.showCurrentTitle,
    );

    window.addEventListener('resize', () => wheelElement.updateSize());

    timerContainer.appendChildren([timerInput.getNode()]);

    settingsContainer.appendChildren([
      soundButton.getNode(),
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
    const buttonStatus =
      this.state.getSectorOptions().length < 2 ? true : false;
    button.getNode().disabled = buttonStatus;
  }

  private disableButtons(
    buttons: (ButtonComponent | BaseComponent<'input'>)[],
  ): void {
    buttons.forEach((button) => (button.getNode().disabled = true));
  }

  private enableButtons(
    buttons: (ButtonComponent | BaseComponent<'input'>)[],
  ): void {
    buttons.forEach((button) => (button.getNode().disabled = false));
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
