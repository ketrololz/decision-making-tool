import type { Route } from '../types/route';
import type BaseComponent from '../utils/baseComponent';

export default class Router {
  private routes: Route[] = [];
  private outlet: BaseComponent;

  constructor(routes: Route[], outlet: BaseComponent) {
    this.routes = routes;
    this.outlet = outlet;

    window.addEventListener('DOMContentLoaded', () => 
      this.createPage(window.location.pathname),
    )

    window.addEventListener('popstate', () =>
      this.createPage(window.location.pathname),
    );
  }

  public createPage(path: string): void {
    const route = this.routes.find((route) => route.path === path);

    if (route) {
      this.outlet.destroyChildren();
      route
        .page(this)
        .then((page) => this.outlet.appendChildren([page.getNode()]));
    }
  }

  public navigate(path: string): void {
    window.history.pushState(null, '', path);

    this.createPage(path);
  }
}