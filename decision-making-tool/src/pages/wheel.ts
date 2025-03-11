import ButtonComponent from '../components/buttonComponent';
import type Router from '../router/router';
import BaseComponent from '../utils/baseComponent';

export class Wheel extends BaseComponent {
  private container;
  private router: Router;

  constructor(router: Router) {
    super({ tag: 'div', className: 'container' });
    this.container = this;
    const test = new BaseComponent({
      tag: 'div',
      className: 'test',
      text: 'testtest',
    });

    this.router = router;

    const startButton = new ButtonComponent({
      className: 'options-button start-button',
      text: 'back',
      event: 'click',
      listener: (): void => this.router.navigate('/options'),
    });

    this.container.appendChildren([test.getNode(), startButton.getNode()]);
  }
}
