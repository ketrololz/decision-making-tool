import { DEFAULT_ID } from '../constants/constants';
import type { State } from '../types/state';
import { DataType } from '../types/dataType';
import type { WheelItem } from '../types/wheelItem';
import { isWheelItem } from '../utils/itemIsWheelItem';

export default class OptionsState {
  private id = DEFAULT_ID;
  private stateItems: State[] = [];
  private isSoundMute = false;

  constructor() {
    if (localStorage.getItem('ketrololz-state') === null) {
      this.add({ id: 1 });
    }
  }

  public add(item: State): void {
    this.stateItems.push(item);
    this.id += 1;
    this.updateLocalStorage();
  }

  public remove(id: number): void {
    this.stateItems = this.stateItems.filter((item) => item.id !== id);
    if (this.stateItems.length < 1) {
      this.id = DEFAULT_ID;
    }
    this.updateLocalStorage();
  }

  public clear(): void {
    this.stateItems = [];
    this.id = DEFAULT_ID;
    this.updateLocalStorage();
  }

  public getId(): number {
    return this.id;
  }

  public getOptions(): State[] {
    return this.stateItems;
  }

  public isSoundMuteState(): boolean {
    return this.isSoundMute;
  }

  public changeSoundState(isMute: boolean): void {
    this.isSoundMute = isMute;
    this.updateLocalStorage();
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

  public loadState(): void {
    try {
      const stateString: string | null =
        localStorage.getItem('ketrololz-state');
      const lastId: string | null = localStorage.getItem('ketrololz-last-id');
      const soundState = localStorage.getItem('ketrololz-is-sound-mute');
      if (stateString) {
        this.stateItems = JSON.parse(stateString);
      }
      if (lastId) {
        this.id = JSON.parse(lastId);
      }
      if (soundState) {
        this.isSoundMute = JSON.parse(soundState);
      }
    } catch {
      this.stateItems = [];
    }
  }

  public setState(state: State[]): void {
    this.stateItems = state.map((el) => {
      if (el.id.toString().startsWith('#')) {
        el.id = Number(el.id.toString().substring(1));
      }
      if (el.id >= this.id) {
        this.id = el.id + 1;
      }
      if (typeof el.weight === 'string') {
        el.weight = Number(el.weight);
      }
      return el;
    });
    this.updateLocalStorage();
  }

  public getSectorOptions(): WheelItem[] {
    return this.getOptions().filter(isWheelItem);
  }

  private updateLocalStorage(): void {
    localStorage.setItem('ketrololz-state', JSON.stringify(this.stateItems));
    localStorage.setItem('ketrololz-last-id', JSON.stringify(this.id));
    localStorage.setItem(
      'ketrololz-is-sound-mute',
      JSON.stringify(this.isSoundMute),
    );
  }
}

export const optionsState = new OptionsState();
