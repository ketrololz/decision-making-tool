import { createElem } from './create-element.js';

const bodyElem = document.body;

bodyElem.classList.add('background');


// game field

const gameFieldContainer = createElem({
  classes: ['game-field-container'],
});

// difficults

const difficultyContainer = createElem({
  classes: ['difficulty-container'],
});

const difficults = ['Easy', 'Medium', 'Hard'];

const difficultyButtons = difficults.map((e) => createElem({
  tag: 'button',
  text: e,
  classes: ['difficulty-button', 'button'],
}));

bodyElem.append(difficultyContainer, gameFieldContainer);
difficultyButtons.forEach((e) => difficultyContainer.append(e));

// new game

const newGameButton = createElem({
  tag: 'button',
  text: 'New game',
  classes: ['new-game-button', 'button'],
});

difficultyContainer.append(newGameButton);

//top bar

const topBar = createElem({
  tag: 'div',
  classes: ['top-bar']
});

const attempsContainer = createElem({
  tag: 'div',
  classes: ['attemps-container'],
});

function createAttempIcons(count) {
  const icons = [];
  
  for (let i = 0; i < count; i += 1) {
    const attempBox = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const  attempIcon = document.createElementNS(attempBox.namespaceURI, "path");

    const attempBoxOptions = {
      'height': '30px',
      'viewBox': '0 0 34 34',
      'id': `attemp-${i}`,
    }

    for (let option in attempBoxOptions) {
      attempBox.setAttribute(option, attempBoxOptions[option]);
    }

    attempIcon.setAttribute('d', 'M4.27312 1.42448C3.48643 0.637802 2.21092 0.637802 1.42424 1.42448C0.637558 2.21117 0.637558 3.48663 1.42424 4.27332L14.6512 17.5003L1.42448 30.727C0.637802 31.5137 0.637802 32.7892 1.42448 33.5759C2.21117 34.3625 3.48662 34.3625 4.2733 33.5759L17.5 20.3491L30.7266 33.5757C31.5133 34.3623 32.7887 34.3624 33.5754 33.5757C34.3621 32.789 34.3621 31.5135 33.5754 30.7268L20.3489 17.5003L33.5757 4.27351C34.3624 3.48683 34.3624 2.21135 33.5757 1.42467C32.789 0.637985 31.5135 0.637985 30.7268 1.42467L17.5 14.6514L4.27312 1.42448Z');
    attempIcon.setAttribute('fill', '#BBBBCF');

    attempBox.append(attempIcon);

    icons.push(attempBox);
  }

  return icons;
}

const attempIcons = createAttempIcons(2);

gameFieldContainer.append(topBar);

topBar.append(attempsContainer);
attempIcons.forEach((e) => attempsContainer.append(e));

// title

const title = createElem({
  tag: 'h1',
  text: 'SIMON_SAYS',
  classes: ['title'],
});

gameFieldContainer.append(title);

// keyboard

const keyboardContainer = createElem({
  tag: 'div',
  classes: ['keyboard-container'],
})

function createKeyboard(keys) {
  const keyboard = keys.map((e) => {
    return createElem({
      tag: 'button',
      text: e,
      classes: ['button', 'keyboard-btn'],
    });
  })

  return keyboard;
}

const keys = 'qwertyuiopasdfghjklzxcvbnm';
const keyboard = createKeyboard(keys.toUpperCase().split(''));

gameFieldContainer.append(keyboardContainer);

keyboard.forEach((e) => keyboardContainer.append(e));