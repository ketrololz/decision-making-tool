import { keyboardContainer } from "./difficulty-selector.js";

function generateSequence(diff, quantity) {
  let keys = '';
  const sequence = [];

  switch (diff) {
    case 'easy':
      keys = '1234567890';
      break;
    case 'medium':
      keys = 'qwertyuiopasdfghjklzxcvbnm';
      break;
    case 'hard':
      keys = '1234567890qwertyuiopasdfghjklzxcvbnm';
      break;
    default:
      return;
  }

  const keysArr = keys.split('');

  for (let i = 0; i < quantity; i += 1) {
    const randNum = Math.floor(Math.random() * keysArr.length);
    sequence.push(keysArr[randNum]);
  }

  return sequence;
}

generateSequence(keyboardContainer.dataset.diff, 2)