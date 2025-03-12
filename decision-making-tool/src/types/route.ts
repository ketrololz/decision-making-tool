import type Router from '../router/router';
import type BaseComponent from '../utils/baseComponent';

export type Route<T extends BaseComponent<'div'> = BaseComponent<'div'>> = {
  path: string;
  page: (router: Router) => Promise<T>;
};
