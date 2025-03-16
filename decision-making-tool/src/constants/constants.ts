import type { Options } from '../pages/options.ts';
import type { Wheel } from '../pages/wheel.ts';
import type Router from '../router/router.ts';

export const DEFAULT_ID = 1;
export const CIRCLE = Math.PI * 2;
export const MAX_TITLE_LENGTH = 10;
export const WHEEL_SIZE_RATIO = 0.65;

export const PULSE_ANIMATION_MS = 200;

export const MIN_SPIN_SECONDS = 5;
export const MAX_SPIN_SECONDS = 500;
export const AUDIO_VOLUME = 0.3;

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

export const AUDIO_PATHS = {
  'spin': '../../src/assets/sounds/spin.mp3',
  'end': '../../src/assets/sounds/end.mp3',
  'baraban': '../../src/assets/sounds/baraban.mp3'
}
