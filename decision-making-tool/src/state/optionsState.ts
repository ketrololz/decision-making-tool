import { DEFAULT_ID } from '../constants/constants';
import type { State } from '../types/state';

export default class OptionsState {
  private id = DEFAULT_ID;
  private stateItems: State[] = [];

  public add(item: State): void {
    this.stateItems.push(item);
    this.id += 1;
  }

  public remove(id: number): void {
    this.stateItems.filter((item) => item.id !== id);
  }

  public clear(): void {
    this.stateItems = [];
    this.id = DEFAULT_ID;
  }

  public getNextId(): number {
    return this.id;
  }
}
