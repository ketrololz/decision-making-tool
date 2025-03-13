import ButtonComponent from '../components/buttonComponent';
import OptionComponent from '../components/optionComponent';
import type Router from '../router/router';
import { optionsState } from '../state/optionsState';
import type { State } from '../types/state';
import BaseComponent from '../utils/baseComponent';

export class Options extends BaseComponent<'div'> {
  private optionsList: BaseComponent<'ul'>;
  private state = optionsState;
  private router: Router;

  constructor(router: Router) {
    super({ tag: 'div', className: 'container' });
    this.destroyChildren();
    this.state.loadState();

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

    const saveButton = new ButtonComponent({
      className: 'options-button',
      text: 'save',
      event: 'click',
      listener: (): void => {
        saveLink.getNode().href = URL.createObjectURL(new Blob([JSON.stringify({ list: this.state.getOptions() })]));
        console.log(JSON.stringify(this.state.getOptions()))
        saveLink.getNode().click();
      },
    });

    const saveLink = new BaseComponent({
      tag: 'a',
    })

    saveLink.setAttribute("download", "data.json");

    const loadButton = new ButtonComponent({
      className: 'options-button',
      text: 'load',
      event: 'click',
      listener: (): void => {
        loadInput.getNode().click();
      },
    });

    const loadInput = new BaseComponent({
      tag: 'input',
    });

    loadInput.setAttribute('type', 'file');
    loadInput.setAttribute('accept', '.json');

    loadInput.addListener('change', (e) => {
      return new Promise((resolve) => {
        if (e.target instanceof HTMLInputElement) {
          e.target.files?.item(0)?.text().then(resolve);
        }
      }).then((data) => {
        this.clearOptions();
        this.state.setState(JSON.parse(String(data)).list);
        this.loadOptions();
      });
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
      saveButton.getNode(),
      loadButton.getNode(),
    ]);

    this.appendChildren([
      optionsList.getNode(),
      buttonsContainer.getNode(),
      startButton.getNode(),
    ]);
  }

  public addOption(state: State, isLoaded: boolean = false): void {
    const option = new OptionComponent(
      {
        id: state.id,
        title: state.title,
        weight: state.weight,
      },
      this.state.updateOptionState,
    );

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
