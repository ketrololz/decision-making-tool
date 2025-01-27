import { Cell } from "./cell";
import { Hint } from "./hints";
import { Selector } from "./selector";

export class Field {
  element = null;
  #fieldSize = 0;
  #cellSize = 0;
  #currImageArr = [];
  #currDifficulty = 'easy';
  currFieldElements = [];
  currFieldValue = [];
  currHintElements = [];

  constructor(fieldSize = 5, cellSize = 1, cellInterval = 10, ...classList) {
    const grid = document.createElement('div');
    // if (classList) {
    //   grid.classList.add(...classList);
    // }

    // grid.style.gridTemplateColumns = `${cellSize * 3}vmin repeat(${fieldSize}, ${cellSize}vmin)`;
    // grid.style.gridTemplateRows = `${cellSize * 3}vmin repeat(${fieldSize}, ${cellSize}vmin)`;
    // grid.style.gap = `${cellInterval}px`;

    // this.#fieldSize = fieldSize + 1;
    // this.#cellSize = cellSize;
    this.element = grid;
  }

  appendNode(parent) {
    parent.append(this.element);
  }

  createCells(difficulty) {
    const cellsCount = this.#fieldSize * this.#fieldSize;
    let position = 0;

    for (let i = 0; i < cellsCount; i += 1) {

      if (i === 0) {
        const emptyCell = new Cell(this.element, this.#cellSize, `empty-cell`);
      } else if (i < this.#fieldSize || i % this.#fieldSize === 0) {
        const hint = new Hint(this.element, `hint`);
        if (i % 5 === 0) { 
          if (difficulty === 'easy') {
            i < 6 ? hint.element.classList.add('line', 'vertical') : hint.element.classList.add('line');
          }

          if (difficulty === 'medium') {
            i < 11 ? hint.element.classList.add('line', 'vertical', 'medium') : hint.element.classList.add('line', 'medium');
          }

          if (difficulty === 'hard') {
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
        cell.paint();
        this.currFieldValue[cell.position] = cell.state;
      }

      if (event.button === 2) {
        cell.markWithCross();
        this.currFieldValue[cell.position] = cell.state;
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

  updateState(difficulty) {
    this.#currImageArr = this.pictures.cross;
    this.createCells(difficulty);
    this.changeHints();
  }

  pictures = {
    cross: [[1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1]],
    bigCross: [[1,0,0,0,0,0,0,0,0,1],[0,1,0,0,0,0,0,0,1,0],[0,0,1,0,0,0,0,1,0,0],[0,0,0,1,0,0,1,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,0,1,1,0,0,0,0],[0,0,0,1,0,0,1,0,0,0],[0,0,1,0,0,0,0,1,0,0],[0,1,0,0,0,0,0,0,1,0],[1,0,0,0,0,0,0,0,0,1]]
  }

  choosePicture(pic) {
    this.#currImageArr = this.pictures.pic;
  }

  changeDifficulty(difficulty) {
    this.#currDifficulty = difficulty;
  }

  createField(difficulty = this.#currDifficulty, cellSize = 1, cellInterval = 10, ...classList) {
    const fieldSize = {
      'easy': 5,
      'medium': 10,
      'hard': 15,
    }
    
    if (classList) {
      this.element.classList.add(...classList);
    }

    this.element.style.gridTemplateColumns = `${cellSize * 3}vmin repeat(${fieldSize[difficulty]}, ${cellSize}vmin)`;
    this.element.style.gridTemplateRows = `${cellSize * 3}vmin repeat(${fieldSize[difficulty]}, ${cellSize}vmin)`;
    this.element.style.gap = `${cellInterval}px`;

    this.#fieldSize = fieldSize[difficulty] + 1;
    this.#cellSize = cellSize;

    this.updateState(difficulty);
  }

  checkInput() {
    console.log('t', this)
  }

  clear() {
    while (this.element.childNodes.length > 0) {
      this.element.lastChild.remove()
    }
  }
}