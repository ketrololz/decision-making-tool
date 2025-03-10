import BaseComponent from './utils/baseComponent';
import './pages/options-page/options';
import Options from './pages/options-page/options';

export default class App extends BaseComponent {
  private body = document.body;
  private app;

  constructor() {
    super({ tag: 'div', className: 'app' });
    this.app = this;
    this.body.appendChild(this.app.getNode());
  }

  public createApp(): void {
    // const wrapper = new BaseComponent({ tag: 'div', className: 'wrapper' });
    const optionsPage = new Options();
    console.log(optionsPage);

    this.app.appendChildren([optionsPage.getNode()]);
  }
}
