import { createElem } from "./create-element.js";
import { keyboardContainer } from "./difficulty-selector.js";
import { changeButton, repeatGameBtn } from "./start-game.js";
import { disableButton, nextRound } from "./start-round.js";

const nextGameButton = createElem({
  tag: 'button',
  text: 'Next',
  classes: ['start-game-btn', 'button'],
})

function endRound(result, input) {
  if (result === 'win') {
    disableButton(repeatGameBtn);
    input.textContent = 'YOU WIN!'
    return;
  }

  if (result === 'correct') {
    changeButton(repeatGameBtn, nextGameButton);

    let message = 'GOOD';
    const randNum = Math.floor(Math.random() * 6);

    switch (randNum) {
      case 0:
        message = 'NICE';
        break;
      case 1:
        message = 'GREAT';
        break;
      case 2:
        message = 'FINE';
        break;
      case 3:
        message = 'VERY GOOD';
        break;
      case 4:
        message = 'PERFECT';
        break;
      case 5:
        message = 'WELL DONE';
        break;
      default:
        message = 'GOOD';
    }

    input.textContent = message;
  }

  if (result === 'lose') {
    disableButton(repeatGameBtn);
    input.textContent = 'YOU LOSE :('
  } 

  keyboardContainer.childNodes.forEach((e) => e.classList.remove('keyboard-hover'));
}

export { endRound, nextGameButton };