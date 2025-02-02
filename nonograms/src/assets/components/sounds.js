import theme from '../sounds/Gludio.mp3';
import click from '../sounds/click.wav';
import cross from '../sounds/cross.wav';
import paint from '../sounds/paint.wav';
import win from '../sounds/win.wav';

export class Sounds {
  #music = null;

  #sounds = null;

  constructor() {
    this.#music = new Audio();
    this.#sounds = new Audio();

    this.#music.setAttribute('autoplay', true);
    this.#music.loop = true;
  }

  getSoundsObj() {
    return this.#sounds;
  }

  getTracksList() {
    return {
      theme,
      click,
      cross,
      paint,
      win
    };
  }

  setSound(sound) {
    this.#sounds.src = sound;
  }

  setMusic(music) {
    this.#music.src = music;
  }

  getMusicObj() {
    return this.#music;
  }

  playSound(soundName) {
    this.setSound(this.getTracksList()[soundName]);
    this.getSoundsObj().play();
  }
}
