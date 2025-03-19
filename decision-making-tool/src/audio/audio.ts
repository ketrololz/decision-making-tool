import { AUDIO_PATHS, AUDIO_VOLUME } from '../constants/constants';
import { AudioType } from '../types/audioTypes';

class AudioController {
  private music = new Audio();
  private sound = new Audio();
  constructor(private paths = AUDIO_PATHS) {
    this.music.loop = true;
  }

  public playSound(soundName: keyof typeof AUDIO_PATHS, type: AudioType): void {
    const audio = type === AudioType.music ? this.music : this.sound;
    const currSound = audio.src.substring(audio.src.lastIndexOf('/') + 1);
    const currSoundName = currSound.substring(0, currSound.lastIndexOf('.'));

    audio.pause();
    audio.currentTime = 0;

    if (currSoundName !== soundName) {
      audio.src = this.paths[soundName];
    }

    try {
      audio.addEventListener('canplaythrough', () => {
        audio.play()
      })
    } catch (e) {
      console.warn(e);
    }
  }

  public mute(): void {
    this.music.volume = 0;
    this.sound.volume = 0;
  }

  public unMute(): void {
    this.music.volume = AUDIO_VOLUME;
    this.sound.volume = AUDIO_VOLUME;
  }
}

export const audioController = new AudioController();
