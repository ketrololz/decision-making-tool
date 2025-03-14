import type { Options } from '../pages/options.ts';
import type { Wheel } from '../pages/wheel.ts';
import type Router from '../router/router.ts';

export const DEFAULT_ID = 1;
export const RADIAN = 180 / Math.PI;
export const CIRCLE = Math.PI * 2;

export const PULSE_ANIMATION_MS = 200;

export const ROUTES = [
  {
    path: '/',
    page: (router: Router): Promise<Options> =>
      import('../pages/options.ts').then((module) => new module.Options(router)),
  },
  {
    path: '/options',
    page: (router: Router): Promise<Options> =>
      import('../pages/options.ts').then((module) => new module.Options(router)),
  },
  {
    path: '/wheel',
    page: (router: Router): Promise<Wheel> => import('../pages/wheel.ts').then((module) => new module.Wheel(router)),
  },
];
