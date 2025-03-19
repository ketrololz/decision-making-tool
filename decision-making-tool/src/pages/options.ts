import ButtonComponent from '../components/buttonComponent';
import OptionComponent from '../components/optionComponent';
import type Router from '../router/router';
import { optionsState } from '../state/optionsState';
import type { State } from '../types/state';
import type { WheelItem } from '../types/wheelItem';
import BaseComponent from '../utils/baseComponent';
import { isWheelItem } from '../utils/itemIsWheelItem';

export class Options extends BaseComponent<'div'> {
  private optionsList: BaseComponent<'ul'>;
  private state = optionsState;
  private router: Router;

  private isShowingAttention = false;

  constructor(router: Router) {
    super({ tag: 'div', className: 'container' });
    this.destroyChildren();
    this.state.loadState();

    const optionsTitle = new BaseComponent({
      tag: 'h3',
      className: 'options-title',
      text: 'Options',
    });

    const optionsList = new BaseComponent({ tag: 'ul', className: 'options' });
    this.optionsList = optionsList;
    this.loadOptions();

    this.router = router;

    const optionsContainer = new BaseComponent({
      tag: 'div',
      className: 'options-container',
    });

    const optionButtonsContainer = new BaseComponent({
      tag: 'div',
      className: 'buttons-container options-btn-container',
    });

    const addButton = new ButtonComponent({
      className: 'options-button add-btn',
      text: 'add option',
      event: 'click',
      listener: (): void => this.addOption({ id: this.state.getId() }),
    });

    const clearButton = new ButtonComponent({
      className: 'options-button clear-btn',
      text: 'delete options',
      event: 'click',
      listener: (): void => this.clearOptions(),
    });

    optionsContainer.appendChildren([
      optionsTitle.getNode(),
      optionsList.getNode(),
      optionButtonsContainer.getNode(),
    ]);

    const listContainer = new BaseComponent({
      tag: 'div',
      className: 'list-container',
    });

    const listTitle = new BaseComponent({
      tag: 'h3',
      className: 'list-title',
      text: 'List',
    });

    const listButtonsContainer = new BaseComponent({
      tag: 'div',
      className: 'buttons-container list-btn-container',
    });

    const saveButton = new ButtonComponent({
      className: 'options-button',
      text: 'save',
      event: 'click',
      listener: (): void => {
        saveLink.getNode().href = URL.createObjectURL(
          new Blob([JSON.stringify({ list: this.state.getOptions() })]),
        );
        saveLink.getNode().click();
      },
    });

    const saveLink = new BaseComponent({
      tag: 'a',
    });

    saveLink.setAttribute('download', 'data.json');

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

    loadInput.addListener('change', async (e) => {
      return new Promise((resolve) => {
        if (e.target instanceof HTMLInputElement) {
          e.target.files?.item(0)?.text().then(resolve);
        }
      }).then((data) => {
        this.clearOptions();
        this.state.setState(JSON.parse(String(data)).list);
        this.loadOptions();

        loadInput.getNode().value = '';
      });
    });

    const startButton = new ButtonComponent({
      className: 'options-button start-button',
      text: 'to the Wheel',
      event: 'click',
      listener: (): void => {
        if (this.getSectorOptions().length < 2) {
          this.showAttention('Please add at least 2 valid options');
          return;
        }
        this.router.navigate('/wheel');
      },
    });

    const pasteButton = new ButtonComponent({
      text: 'paste list',
      event: 'click',
      listener: (): void => this.createDialog(this),
    });

    optionButtonsContainer.appendChildren([
      addButton.getNode(),
      clearButton.getNode(),
    ]);

    listButtonsContainer.appendChildren([
      saveButton.getNode(),
      loadButton.getNode(),
      pasteButton.getNode(),
    ]);

    listContainer.appendChildren([
      listTitle.getNode(),
      listButtonsContainer.getNode(),
    ]);

    this.appendChildren([
      optionsContainer.getNode(),
      listContainer.getNode(),
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
      className: 'remove-btn',
      event: 'click',
      listener: (): void => {
        option.destroyNode();
        this.state.remove(state.id);
      },
    });

    option.appendChildren([removeButton.getNode()]);
    if (!isLoaded) {
      this.state.add({ id: this.state.getId(), title: state.title, weight: state.weight });
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

  private createOptionsFromList(text: string): State[] {
    const lines = text.split('\n');
    const splittedLines = lines.map((line) => line.split(','));
    const options: State[] = [];
    let lastOptionId = this.state.getId();
    splittedLines.forEach((line) => {
      if (line.length > 1) {
        const weight = parseInt(line.pop()!, 10);
        if (!Number.isNaN(weight)) {
          const option = {
            id: lastOptionId,
            weight: weight,
            title: line.join(','),
          };
          lastOptionId += 1
          options.push(option);
        }
      }
    });
    return options;
  }

  private getSectorOptions(): WheelItem[] {
    return this.state.getOptions().filter(isWheelItem);
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

  private createDialog(parent: BaseComponent<'div'>): void {
    const pasteListDialog = new BaseComponent({
      tag: 'dialog',
      className: 'list-dialog',
    });

    const pasteListDialogContainer = new BaseComponent({
      tag: 'div',
      className: 'paste-list-dialog-container',
    });

    pasteListDialog.addListener('click', (e) => {
      if (e.target === e.currentTarget) {
        pasteListDialog.destroyNode();
      }
    });

    const pasteListContainer = new BaseComponent({
      tag: 'form',
      className: 'list-container',
    });

    const pasteListArea = new BaseComponent({
      tag: 'textarea',
      className: 'list-area',
    });

    const pasteListTitle = new BaseComponent({
      tag: 'h3',
      className: 'paste-list-title',
      text: 'Paste a list of new options in a CSV-like format:',
    });

    const pasteListSubtitle = new BaseComponent({
      tag: 'h4',
      className: 'paste-list-subtitle',
      text: 'Write the name and its weight after the last comma. Each option is indicated on a new line.',
    });

    pasteListArea.setAttribute('cols', '60');
    pasteListArea.setAttribute('rows', '10');
    pasteListArea.setAttribute('autocomplete', 'off');
    pasteListArea.setAttribute(
      'placeholder',
      'example_1, 2   >   example_1 | 2 example_2, \nwith comma, 1   >   example_2, with comma | 1',
    );

    pasteListContainer.addListener('submit', (e) => {
      e.preventDefault();
    });

    const pasteListCancel = new ButtonComponent({
      text: 'cancel',
      className: 'cancel-btn',
    });

    const pasteListConfirm = new ButtonComponent({
      text: 'confirm',
      className: 'confirm-btn',
    });

    const pasteListButtonsContainer = new BaseComponent({
      tag: 'div',
      className: 'buttons-container paste-list-buttons-container',
    });

    pasteListButtonsContainer.appendChildren([
      pasteListCancel.getNode(),
      pasteListConfirm.getNode(),
    ]);

    pasteListCancel.addListener('click', () => {
      pasteListArea.getNode().value = '';
      pasteListDialog.destroyNode();
    });

    pasteListConfirm.addListener('click', () => {
      const options = this.createOptionsFromList(pasteListArea.getNode().value);
      if (options.length > 0) {
        options.forEach((option) => {
          this.addOption(option);
        });
      }
      pasteListDialog.destroyNode();
      pasteListArea.getNode().value = '';
    });

    pasteListContainer.appendChildren([
      pasteListTitle.getNode(),
      pasteListSubtitle.getNode(),
      pasteListArea.getNode(),
      pasteListButtonsContainer.getNode(),
    ]);

    pasteListDialogContainer.appendChildren([pasteListContainer.getNode()]);

    pasteListDialog.appendChildren([pasteListDialogContainer.getNode()]);

    parent.appendChildren([pasteListDialog.getNode()]);

    pasteListDialog.getNode().showModal();
  }
}
