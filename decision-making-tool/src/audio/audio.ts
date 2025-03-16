import { AUDIO_PATHS, AUDIO_VOLUME } from "../constants/constants";
import { AudioType } from "../types/audioTypes";

class AudioController {
  private music = new Audio();
  private sound = new Audio();
    constructor(private paths = AUDIO_PATHS) {
      this.music.loop = true;
    }

  public async playSound(soundName: keyof typeof AUDIO_PATHS, type: AudioType): Promise<void> {
    const audio = type === AudioType.music ? this.music : this.sound;
    // audio.volume = 0.3;
    audio.src = this.paths[soundName];
    audio.currentTime = 0; 

    return new Promise((res) => {
      audio.onended = (): void => res();
      audio.play();
    })
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