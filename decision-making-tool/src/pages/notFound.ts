import ButtonComponent from '../components/buttonComponent';
import type Router from '../router/router';
import BaseComponent from '../utils/baseComponent';

export class NotFound extends BaseComponent<'div'> {
  constructor(router: Router) {
    super({ tag: 'div', className: 'container not-found' });
    const backButton = new ButtonComponent({
      className: 'options-button start-button',
      text: 'back to options',
      event: 'click',
      listener: (): void => router.navigate('/options'),
    });

    const title = new BaseComponent({
      tag: 'h3',
      text: 'You shall not pass!'
    })

    this.appendChildren([title.getNode(), backButton.getNode()]);
  }
}
