import BaseComponent from './utils/baseComponent';
import './pages/options';
// import { Options } from './pages/options';
import Router from './router/router';
import { ROUTES } from './constants/constants';

export default class App extends BaseComponent<'div'> {
  private body = document.body;

  constructor() {
    super({ tag: 'div', className: 'app' });
    this.body.appendChild(this.getNode());
    new Router(ROUTES, this);
  }

}
