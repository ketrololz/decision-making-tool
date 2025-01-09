import { generateSequence } from "./generate-sequence.js";
import { keyboardContainer } from "./difficulty-selector.js";

let roundNum = 1;

function startRound(roundNum, input) {
  const sequenceLength = 2 * roundNum;
  const sequence = generateSequence(keyboardContainer.dataset.diff, sequenceLength);

  input.textContent = '_'.repeat(sequenceLength);
  
}

function showSequence(sequence) {
  sequence.forEach((e, i) => showKey(e, i + 1, 1000))

  function showKey(key, i, timeout) {
    setTimeout(() => document.getElementById(key).classList.add('highlight'), timeout * i);
    setTimeout(() => document.getElementById(key).classList.remove('highlight'), (timeout * i) + timeout);
  }
}

showSequence([0, 2, 6, 8, 'K', 'H'])
