import { Cell } from "./cell";
import { Hint } from "./hints";
import { Selector } from "./selector";
import pictures from "./../nonograms.json";
import { Modal } from "./modal";
import { Timer } from "./timer";


export class Field {
  element = null;
  #fieldSize = 0;
  #cellSize = 0;
  #currImageArr = pictures.easy.cross;
  #currImageName = 'cross';
  #currDifficulty = 'easy';
  currFieldElements = [];
  currFieldValue = [];
  currFieldCrosses = [];
  currHintElements = [];
  #modal = null;
  #timer = null;
  #isGameStopped = false;
  #resultsWindow = null;
  #difficultySelectorIndex = null;
  #pictureSelectorIndex = null;
  #diffSelector = null;
  #picSelector = null;

  constructor() {
    const grid = document.createElement('div');
    grid.classList.add('game-field')
    this.element = grid;

  }

  appendNode(parent) {
    parent.append(this.element);
  }

  createCells() {
    const cellsCount = this.#fieldSize * this.#fieldSize;
    let position = 0;

    for (let i = 0; i < cellsCount; i += 1) {

      if (i === 0) {
        const emptyCell = new Cell(this.element, this.#cellSize * 3, `empty-cell`);
        if (this.#currDifficulty === 'medium') {
          emptyCell.element.classList.add('medium');
        }
        if (this.#currDifficulty === 'hard') {
          emptyCell.element.classList.add('hard');
        }
      } else if (i < this.#fieldSize || i % this.#fieldSize === 0) {
        const hint = new Hint(this.element, `hint`);
        if (i % 5 === 0) {
          if (this.#currDifficulty === 'easy') {
            i < 6 ? hint.element.classList.add('line', 'vertical') : hint.element.classList.add('line');
          }

          if (this.#currDifficulty === 'medium') {
            i < 11 ? hint.element.classList.add('line', 'vertical', 'medium') : hint.element.classList.add('line', 'medium');
          }

          if (this.#currDifficulty === 'hard') {
            i < 16 ? hint.element.classList.add('line', 'vertical', 'hard') : hint.element.classList.add('line', 'hard');
          }
        };
        this.currHintElements.push((hint));
      } else {
        const cell = new Cell(this.element, this.#cellSize, 'cell');
        cell.position = position;
        this.currFieldElements.push(cell);
        this.currFieldValue.push(cell.state);
        position += 1;
      }
    }
    this.currFieldElements.forEach((cell) => cell.element.addEventListener('mousedown', (event) => {
      if (event.button === 0) {
        if (this.#isGameStopped) {
          return;
        }
        cell.paint();
        this.currFieldValue[cell.position] = cell.state;
        this.currFieldCrosses[cell.position] = 0;
        if (!this.#timer.isTimerOn()) this.#timer.startTimer();
        this.checkInput();
      }

      if (event.button === 2) {
        if (this.#isGameStopped) {
          return;
        }
        cell.markWithCross();
        this.currFieldValue[cell.position] = cell.state;
        this.currFieldCrosses[cell.position] = 2;
        if (!this.#timer.isTimerOn()) this.#timer.startTimer();
        this.checkInput();
      }
    }));
    window.addEventListener('contextmenu', (event) => event.preventDefault(), false);
  }

  changeHints() {
    const hints = this.#currImageArr;
    const verticalHints = [];
    const horizontalHints = [];

    let streak = 0;

    for (let i = 0; i < hints.length; i += 1) {
      let chunk = [];

      for (let j = 0; j < hints.length; j += 1) {
        if (hints[i][j] === 1) {
          streak += 1;
        }

        if (hints[i][j] === 0) {
          if (streak !== 0) {
            chunk.push(streak)
          };
          streak = 0;
        }

        if (j === hints.length - 1) {
          if (streak !== 0) {
            chunk.push(streak)
          };
          streak = 0;
          horizontalHints.push(chunk);
          chunk = [];
        }
      }
    }

    for (let i = 0; i < hints.length; i += 1) {
      let chunk = [];

      for (let j = 0; j < hints.length; j += 1) {
        if (hints[j][i] === 1) {
          streak += 1;
        }

        if (hints[j][i] === 0) {
          if (streak !== 0) {
            chunk.push(streak)
          };
          streak = 0;
        }

        if (j === hints.length - 1) {
          if (streak !== 0) {
            chunk.push(streak)
          };
          streak = 0;
          verticalHints.push(chunk);
          chunk = [];
        }
      }
    }

    for (let i = 0; i < this.currHintElements.length; i += 1) {
      if (i < this.currHintElements.length / 2) {
        verticalHints[i].forEach((hint) => {
          this.createHintNum(hint, i);
        });
        this.currHintElements[i].element.classList.add('vertical');
      } else {
        horizontalHints[i - this.currHintElements.length / 2].forEach((hint) => {
          this.createHintNum(hint, i);
        });
      }
    }
  }

  createHintNum(value, index) {
    const num = document.createElement('span');
    num.textContent = value;
    num.classList.add('hint-value')
    this.currHintElements[index].element.append(num);
  }

  updateState() {
    this.#timer.clearTimer();
    this.#timer.stopTimer();
    this.currFieldElements = [];
    this.currHintElements = [];
    this.currFieldValue = [];
    this.currFieldCrosses = [];
    this.createCells();
    this.changeHints();
    this.#isGameStopped = false;
  }

  changePicture(picture) {
    this.#currImageArr = pictures[this.#currDifficulty][picture];
    this.#currImageName = picture;
  }

  changeDifficulty(difficulty) {
    this.#currDifficulty = difficulty;
  }

  getDifficulty() {
    return this.#currDifficulty;
  }

  getRandomImage() {
    const randomDiffNum = Math.floor(Math.random() * 3)
    const randomPicNum = Math.floor(Math.random() * 5)
    const difficulty = {
      0: 'easy',
      1: 'medium',
      2: 'hard',
    }
    this.changeDifficulty(difficulty[randomDiffNum]);
    const picture = Object.keys(pictures[this.#currDifficulty])[randomPicNum]
    this.changePicture(picture);

    this.#difficultySelectorIndex = randomDiffNum;
    this.#pictureSelectorIndex = randomPicNum;
  }

  createField(resultsWindow, difficultySelector, pictureSelector) {
    const fieldSize = {
      'easy': 5,
      'medium': 10,
      'hard': 15,
    }
    
    const cellSize = {
      'easy': 6,
      'medium': 5,
      'hard': 4,
    }
    
    this.#resultsWindow = resultsWindow;

    this.#diffSelector = difficultySelector;
    this.#picSelector = pictureSelector;

    this.#picSelector.clear();

    for (const picture in pictures[this.#currDifficulty]) {
      this.#picSelector.addOptions(picture);
    }
    
    difficultySelector.element.selectedIndex = this.#difficultySelectorIndex;
    pictureSelector.element.selectedIndex = this.#pictureSelectorIndex;

    this.element.classList.add('game-field');

    this.element.style.gridTemplateColumns = `${cellSize[this.#currDifficulty] * 3}vmin repeat(${fieldSize[this.#currDifficulty]}, ${cellSize[this.#currDifficulty]}vmin)`;
    this.element.style.gridTemplateRows = `${cellSize[this.#currDifficulty] * 3}vmin repeat(${fieldSize[this.#currDifficulty]}, ${cellSize[this.#currDifficulty]}vmin)`;

    this.#fieldSize = fieldSize[this.#currDifficulty] + 1;
    this.#cellSize = cellSize[this.#currDifficulty];

    this.updateState();
  }

  updateSelectors(dif, pic) {
    this.#difficultySelectorIndex = dif.element.selectedIndex;
    this.#pictureSelectorIndex = pic.element.selectedIndex;
  } 

  checkInput() {
    if (this.currFieldValue.join('') === this.#currImageArr.flat().join('')) {
      this.#modal.showWindow(this.#timer);
      this.#isGameStopped = true;
      this.#timer.stopTimer();
      this.#resultsWindow.saveResult(this.#timer.currTime() - 1000, this.#currDifficulty, this.#currImageName);
    }
  }

  createModal(parent) {
    const modal = new Modal();
    modal.appendNode(parent);
    modal.getElem().addEventListener('mousedown', (e) => {if (e.target === modal.getElem()) modal.closeWindow()});
    this.#modal = modal;
  }

  createTimer(parent) {
    const timer = new Timer();
    timer.appendNode(parent);
    timer.getElem().textContent = '00:00';
    this.#timer = timer;
  }

  showSolution() {
    this.#isGameStopped = true;
    this.#timer.stopTimer();
    this.currFieldElements.forEach((e, i) => {
      e.element.classList.remove('painted', 'cross');
      if (this.#currImageArr.flat()[i] === 1) {
        e.element.classList.add('painted');
      }
    })
  }

  resetGame() {
    this.clear();
    this.updateState();
  }

  saveGame() {
    if (!this.#isGameStopped) {
      localStorage.setItem('time', this.#timer.currTime());
      localStorage.setItem('difficulty', this.#currDifficulty);
      localStorage.setItem('picture', JSON.stringify(this.#currImageArr));
      localStorage.setItem('values', JSON.stringify(this.currFieldValue));
      localStorage.setItem('name', JSON.stringify(this.currFielname));
      localStorage.setItem('crosses', JSON.stringify(this.currFieldCrosses));


      localStorage.setItem('diffSelectorIndex', JSON.stringify(this.#difficultySelectorIndex));
      localStorage.setItem('picSelectorIndex', JSON.stringify(this.#pictureSelectorIndex));
    }
  }

  loadGame() {
    this.clear();
    this.#currDifficulty = localStorage.getItem('difficulty');
    this.#currImageArr = JSON.parse(localStorage.getItem('picture'));
    this.#currImageName = localStorage.getItem('name');

    this.#difficultySelectorIndex = JSON.parse(localStorage.getItem('diffSelectorIndex'));
    this.#pictureSelectorIndex = JSON.parse(localStorage.getItem('picSelectorIndex'));

    this.createField(this.#resultsWindow, this.#diffSelector, this.#picSelector);

    this.#timer.setTime(JSON.parse(localStorage.getItem('time')));
    this.currFieldValue = JSON.parse(localStorage.getItem('values'));
    this.currFieldCrosses = JSON.parse(localStorage.getItem('crosses'));


    this.currFieldElements.forEach((e, i) => {
      if (this.currFieldValue[i] === 1) {
        e.element.classList.add('painted');
        e.state = 1;
      }

      if (this.currFieldCrosses[i] === 2) {
        e.element.classList.add('cross');
      }
    })

  }

  clear() {
    while (this.element.childNodes.length > 0) {
      this.element.lastChild.remove();
    }
  }
}