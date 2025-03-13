import type { State } from '../types/state';
import type { WheelItem } from '../types/wheelItem';

export function isWheelItem(item: State): item is WheelItem {
  return Boolean(item.title && item.weight);
}
