import ButtonComponent from '../components/buttonComponent';
import OptionComponent from '../components/optionComponent';
import type Router from '../router/router';
import { optionsState } from '../state/optionsState';
import type { State } from '../types/state';
import BaseComponent from '../utils/baseComponent';

export class Options extends BaseComponent {
  private optionsList: BaseComponent;
  private state = optionsState;
  private router: Router;

  constructor(router: Router) {
    super({ tag: 'div', className: 'container' });
    this.destroyChildren();
    this.state.setState(localStorage.getItem('ketrololz-state'));

    const optionsList = new BaseComponent({ tag: 'ul', className: 'options' });
    this.optionsList = optionsList;
    this.loadOptions(); 


    this.router = router;

    const buttonsContainer = new BaseComponent({
      tag: 'div',
      className: 'buttons-container',
    });

    const addButton = new ButtonComponent({
      className: 'options-button',
      text: 'add option',
      event: 'click',
      listener: (): void => this.addOption({ id: this.state.getId() }),
    });

    const clearButton = new ButtonComponent({
      className: 'options-button',
      text: 'clear options',
      event: 'click',
      listener: (): void => this.clearOptions(),
    });

    const startButton = new ButtonComponent({
      className: 'options-button start-button',
      text: 'to the Wheel',
      event: 'click',
      listener: (): void => this.router.navigate('/wheel'),
    });

    buttonsContainer.appendChildren([
      addButton.getNode(),
      clearButton.getNode(),
    ]);

    this.appendChildren([
      optionsList.getNode(),
      buttonsContainer.getNode(),
      startButton.getNode(),
    ]);
  }

  public addOption(state: State, isLoaded: boolean = false): void {
    const option = new OptionComponent({
      id: state.id,
      title: state.title,
      weight: state.weight,
    }, this.state.updateOptionState);
    const removeButton = new ButtonComponent({
      text: 'delete',
      className: 'remove-btn',
      event: 'click',
      listener: (): void => {
        option.destroyNode();
        this.state.remove(state.id);
      },
    });

    option.appendChildren([removeButton.getNode()]);
    if (!isLoaded) {
      this.state.add({ id: this.state.getId() });
    }
    this.optionsList.appendChildren([option.getNode()]);
  }

  public clearOptions(): void {
    this.state.clear();
    this.optionsList.destroyChildren();
  }

  private loadOptions(): void {
      for (const elem of this.state.getOptions()) {
        this.addOption(elem, true);
    }
  }
}
