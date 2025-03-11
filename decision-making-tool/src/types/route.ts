import type Router from '../router/router';
import type BaseComponent from '../utils/baseComponent';

export type Route<T extends BaseComponent = BaseComponent> = {
  path: string;
  page: (router: Router) => Promise<T>;
};
