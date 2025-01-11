import { createElem } from "./create-element.js";
import { changeButton, repeatGameBtn } from "./start-game.js";
import { disableButton, nextRound } from "./start-round.js";

const nextGameButton = createElem({
  tag: 'button',
  text: 'Next',
  classes: ['start-game-btn', 'button'],
})

function endRound(result, input) {
  if (result === 'total-win') {
    changeButton(repeatGameBtn, nextGameButton);
    input.textContent = 'UNSTOPPABLE!'
  }

  if (result === 'win') {
    changeButton(repeatGameBtn, nextGameButton);
    input.textContent = 'YOU WIN!'
  }

  if (result === 'lose') {
    disableButton(repeatGameBtn);
    input.textContent = 'YOU LOSE :('
  }
}

export { endRound, nextGameButton };