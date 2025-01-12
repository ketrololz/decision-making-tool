import { difficultyButtons, keyboardContainer } from "./difficulty-selector.js";
import { startGameBtn, repeatGameBtn } from "./start-game.js";

const clickSound = new Audio('./sounds/click.wav');
const wrongSound = new Audio('./sounds/wrong.wav');
const correctSound = new Audio('./sounds/correct.wav');
const winSound = new Audio('./sounds/win.wav');

difficultyButtons.forEach((e) => e.addEventListener('mousedown', () => playSound(clickSound)));
startGameBtn.addEventListener('mousedown', () => playSound(clickSound));

repeatGameBtn.addEventListener('mousedown', () => playSound(clickSound));

async function playSound(sound) {
  await sound.play();
}



export { playSound, clickSound, wrongSound, correctSound, winSound }