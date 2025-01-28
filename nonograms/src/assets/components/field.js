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
  #currDifficulty = 'easy';
  currFieldElements = [];
  currFieldValue = [];
  currHintElements = [];
  #modal = null;
  #timer = null;
  #isGameStopped = false;

  constructor(fieldSize = 5, cellSize = 1, cellInterval = 10, ...classList) {
    const grid = document.createElement('div');
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
        if (!this.#timer.isTimerOn()) this.#timer.startTimer();
        this.checkInput();
      }

      if (event.button === 2) {
        if (this.#isGameStopped) {
          return;
        }
        cell.markWithCross();
        this.currFieldValue[cell.position] = cell.state;
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
    this.createCells();
    this.changeHints();
    this.#isGameStopped = false;
  }

  changePicture(picture) {
    this.#currImageArr = pictures[this.#currDifficulty][picture];
  }

  changeDifficulty(difficulty) {
    this.#currDifficulty = difficulty;
  }

  getDifficulty() {
    return this.#currDifficulty;
  }

  createField( cellInterval = 10, ...classList) {
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

    if (classList) {
      this.element.classList.add(...classList);
    }

    this.element.style.gridTemplateColumns = `${cellSize[this.#currDifficulty] * 3}vmin repeat(${fieldSize[this.#currDifficulty]}, ${cellSize[this.#currDifficulty]}vmin)`;
    this.element.style.gridTemplateRows = `${cellSize[this.#currDifficulty] * 3}vmin repeat(${fieldSize[this.#currDifficulty]}, ${cellSize[this.#currDifficulty]}vmin)`;
    this.element.style.gap = `${cellInterval}px`;

    this.#fieldSize = fieldSize[this.#currDifficulty] + 1;
    this.#cellSize = cellSize[this.#currDifficulty];

    this.updateState(this.#currDifficulty);
  }

  checkInput() {
    if (this.currFieldValue.join('') === this.#currImageArr.flat().join('')) {
      this.#modal.showWindow(this.#timer);
      this.#isGameStopped = true;
      this.#timer.stopTimer();
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

  clear() {
    while (this.element.childNodes.length > 0) {
      this.element.lastChild.remove();
    }
  }
}