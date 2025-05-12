import { optionsState } from '../state/optionsState.ts';
import type { Route } from '../types/route';
import type BaseComponent from '../utils/baseComponent';

export default class Router {
  private routes: Route[] = [];
  private outlet: BaseComponent<'div'>;
  private state = optionsState;

  constructor(routes: Route[], outlet: BaseComponent<'div'>) {
    this.routes = routes;
    this.outlet = outlet;

    this.navigate(window.location.pathname);

    window.addEventListener('popstate', () =>
      this.navigate(window.location.pathname),
    );
  }

  public canCreateWheel(): boolean {
    return this.state.getSectorOptions().length > 1
  }

  public createPage(path: string): void {
    const route = this.routes.find((route) => route.path === path);

    if (route) {
      this.outlet.destroyChildren();
      route
        .page(this)
        .then((page) => this.outlet.appendChildren([page.getNode()]));
    } else {
      this.outlet.destroyChildren();
      import('../pages/notFound.ts')
        .then((module) => new module.NotFound(this))
        .then((page) => this.outlet.appendChildren([page.getNode()]));
    }
  }

  public navigate(path: string): void {
    this.state.loadState()
    if (path === '/wheel' && !this.canCreateWheel()) {
      path = '/options';
    }
    window.history.pushState(null, '', `${window.location.origin}${path}`);

    this.createPage(path);
  }
}
