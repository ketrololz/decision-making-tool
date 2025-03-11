import BaseComponent from './utils/baseComponent';
import './pages/options';
import { Options } from './pages/options';
import Router from './router/router';
import { ROUTES } from './constants/constants';

export default class App extends BaseComponent {
  private body = document.body;
  private router: Router;

  constructor() {
    super({ tag: 'div', className: 'app' });
    this.body.appendChild(this.getNode());
    this.router = new Router(ROUTES, this);
    const optionsPage = new Options(this.router);
    this.appendChildren([optionsPage.getNode()]);

  }

}
