export class Records {
  #element = null;

  #resultsArr = [];

  #winRoundsCount = 0;

  #lastSavedName = null;

  constructor() {
    const bestResults = document.createElement('div');
    bestResults.classList.add('best-results');

    for (let i = 0; i < 5; i += 1) {
      const result = {
        time: '---',
        difficulty: '---',
        picture: '---'
      };
      this.#resultsArr.push(result);
    }

    this.#element = bestResults;
    this.renderResults();
  }

  clear() {
    while (this.#element.childNodes.length > 0) {
      this.#element.lastChild.remove();
    }
  }

  getElem() {
    return this.#element;
  }

  showWindow() {
    this.#element.classList.toggle('open');
  }

  hideWindow() {
    this.#element.classList.remove('open');
  }

  loadResults() {
    if (localStorage.getItem('ketrololz-results')) {
      this.#resultsArr = (JSON.parse(localStorage.getItem('ketrololz-results')));
    }
  }

  renderResults() {
    this.loadResults();
    const title = document.createElement('h2');
    title.textContent = 'Recent games';
    this.#element.appendChild(title);

    for (let i = 0; i < this.#resultsArr.length; i += 1) {
      const second = 1000;
      const minute = second * 60;
      const minutes = Math.trunc(this.#resultsArr[i].time / minute);
      const seconds = Math.trunc((this.#resultsArr[i].time % minute) / second);

      const resultElem = document.createElement('div');
      resultElem.classList.add('result');

      for (let k = 0; k < 3; k += 1) {
        const param = {
          0: this.#resultsArr[i].picture,
          1: this.#resultsArr[i].difficulty,
          2: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        };

        const textChunk = document.createElement('p');
        textChunk.classList.add('result-text');
        if (this.#resultsArr[i].time === '---') {
          textChunk.textContent = '--:--';
        } else {
          textChunk.textContent = param[k];
        }

        resultElem.appendChild(textChunk);
      }

      this.#element.appendChild(resultElem);
    }
  }

  saveResult(time, difficulty, picture) {
    for (const result of this.#resultsArr.sort((a, b) => b.time - a.time)) {
      this.clear();
      if (result.time === '---') {
        result.time = time;
        result.difficulty = difficulty;
        result.picture = picture || this.#lastSavedName;
        result.queuePosition = this.#winRoundsCount;
        break;
      }
      if (!this.#resultsArr.some((obj) => Object.values(obj).includes('---')) && result.queuePosition === this.#winRoundsCount - 5) {
        result.queuePosition = this.#winRoundsCount;
        result.time = time;

        result.difficulty = difficulty;
        result.picture = picture;
        break;
      }
    }

    this.#winRoundsCount += 1;
    this.#resultsArr.sort((a, b) => a.time - b.time);

    localStorage.setItem('ketrololz-results', JSON.stringify(this.#resultsArr.sort((a, b) => a.time - b.time)));
    localStorage.setItem('ketrololz-win-rounds-count', this.#winRoundsCount);
    this.renderResults();
  }

  setLastName(name) {
    this.#lastSavedName = name;
  }

  setCount(value) {
    this.#winRoundsCount = value;
  }

  appendNode(parent) {
    parent.append(this.#element);
  }
}
