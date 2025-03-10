import ButtonComponent from '../../components/buttonComponent';
import OptionComponent from '../../components/optionComponent';
import OptionsState from '../../state/optionsState';
import BaseComponent from '../../utils/baseComponent';

export default class Options extends BaseComponent {
  private container;
  private optionsList: BaseComponent;
  private state = new OptionsState();

  constructor() {
    super({ tag: 'div', className: 'container' });
    this.container = this;
    const optionsList = new BaseComponent({ tag: 'ul', className: 'options' });
    this.optionsList = optionsList;

    const buttonsContainer = new BaseComponent({
      tag: 'div',
      className: 'buttons-container',
    });

    const addButton = new ButtonComponent({
      className: 'options-button',
      text: 'add option',
      event: 'click',
      listener: (): void => this.addOption(),
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
      listener: (): void => this.clearOptions(),
    });

    buttonsContainer.appendChildren([
      addButton.getNode(),
      clearButton.getNode(),
    ]);

    this.container.appendChildren([
      optionsList.getNode(),
      buttonsContainer.getNode(),
      startButton.getNode(),
    ]);
  }

  public addOption(): void {
    const option = new OptionComponent({ id: this.state.getNextId() });
    this.state.add({ id: this.state.getNextId() });
    this.optionsList.appendChildren([option.getNode()]);
  }

  public clearOptions(): void {
    this.state.clear();
    this.optionsList.destroyChildren();
  }
}
