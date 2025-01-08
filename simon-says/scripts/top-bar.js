import { createElem } from './create-element.js';
import { gameFieldContainer } from "./init.js";

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

const rounds = createElem({
  tag: 'p',
  text: '1/5',
  classes: ['rounds'],
})

gameFieldContainer.insertBefore(topBar, gameFieldContainer.firstChild);

topBar.append(attempsContainer);
attempIcons.forEach((e) => attempsContainer.append(e));
topBar.append(rounds);