import { DEFAULT_ID } from '../constants/constants';
import type { State } from '../types/state';
import { DataType } from '../types/dataType';

export default class OptionsState {
  private id = DEFAULT_ID;
  private stateItems: State[] = [];

  public add(item: State): void {
    this.stateItems.push(item);
    this.id += 1;
    this.updateLocalStorage();
  }

  public remove(id: number): void {
    this.stateItems = this.stateItems.filter((item) => item.id !== id);
    this.updateLocalStorage();
  }

  public clear(): void {
    this.stateItems = [];
    this.updateLocalStorage();
    this.id = DEFAULT_ID;
  }

  public getId(): number {
    return this.id;
  }

  public getOptions(): State[] {
    return this.stateItems;
  }

  public updateOptionState = (newState: State, dataType: DataType): void => {
    const currState = this.stateItems.find((state) => state.id === newState.id);
    if (currState) {
      if (dataType === DataType.title) {
        currState.title = newState.title;
      }

      if (dataType === DataType.weight) {
        currState.weight = newState.weight;
      }

      this.updateLocalStorage();
    }
  };

  public setState(stateString: string | null): void {
    if (stateString) {
      const state: State[] = JSON.parse(stateString);
      this.stateItems = state;
      const objectsId = state.map((elem) => elem.id);
      if (objectsId.length > 0) {
        this.id = Math.max(...objectsId) + 1;
      }
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem('ketrololz-state', JSON.stringify(this.stateItems));
  }
}

export const optionsState = new OptionsState();
