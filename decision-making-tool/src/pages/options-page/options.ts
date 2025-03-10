import OptionComponent from '../../components/optionComponent';
import OptionsState from '../../state/optionsState';
import BaseComponent from '../../utils/baseComponent';
// import ButtonComponent from '../../components/buttonComponent';


export default class Options extends BaseComponent {
  private container;
  private optionsList: BaseComponent;
  private state = new OptionsState();

  constructor() {
    super({ tag: 'div', className: 'container' });
    this.container = this;
    const optionsList = new BaseComponent({ tag: 'ul', className: 'options'});
    this.optionsList = optionsList;
    this.container.appendChildren([optionsList.getNode()]);
    this.addOption();
    this.addOption();

  }

  public addOption(): void {
    const option = new OptionComponent({ id: this.state.getNextId() });
    this.state.add({ id: this.state.getNextId() });
    this.optionsList.appendChildren([option.getNode()]);
  }

  // public addOption(): void {
  //   const position = String(this.optionsList.getLength() + 1);

  //   const optionPosition = new BaseComponent({
  //     tag: 'label',
  //     className: 'position-num',
  //     text: position,
  //   });

  //   optionPosition.setAttribute('for', `option-${position}`);

  //   const optionTitle = new BaseComponent({
  //     tag: 'input',
  //     className: 'position-title',
  //   });

  //   optionTitle.setAttribute('id', `option-${position}`);
  //   optionTitle.setAttribute('placeholder', 'title');

  //   const optionWeight = new BaseComponent({
  //     tag: 'input',
  //     className: 'position-weight',
  //   });

  //   optionWeight.setAttribute('type', 'number');
  //   optionWeight.setAttribute('placeholder', 'weight');

  //   const crossIconLink = new BaseComponent({
  //     tag: 'use',
  //   });

  //   crossIconLink.setAttribute('href', './../../svg/cross.svg#cross');

  //   const crossIcon = new BaseComponent(
  //     {
  //       tag: 'svg',
  //       className: 'cross-btn',
  //     },
  //     crossIconLink.getNode(),
  //   );

  //   // crossIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  //   crossIcon.setAttribute('height', '50');
  //   crossIcon.setAttribute('width', '50');

  //   const crossButton = new BaseComponent({
  //     tag: 'button',
  //     className: 'cross-btn',
  //   });

  //   crossButton.addListener('click', () => {
  //     crossButton.getNode().parentElement?.remove();
  //   });

  //   const option = new BaseComponent({
  //     tag: 'li',
  //     className: 'list-option',
  //   });

  //   option.appendChildren([
  //     optionPosition.getNode(),
  //     optionTitle.getNode(),
  //     optionWeight.getNode(),
  //     crossButton.getNode(),
  //   ]);

  //   this.optionsList.appendChildren([option.getNode()]);
  // }

  // public deleteOption(optionId: ButtonComponent): void {

  //   if (optionId.getNode().parentNode) {
  //       optionId.getNode().parent;
  //   }
  // }
}
