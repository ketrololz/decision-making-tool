const audio = document.createElement('Audio')

import theme from '../sounds/Gludio.mp3';

audio.setAttribute('autoplay', true);
audio.setAttribute('src', theme);
audio.loop = true;

document.body.appendChild(audio);
audio.volume = 0;

document.addEventListener('mousedown', () => {
  audio.volume = 0.1;
});

export { audio };