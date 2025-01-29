export class Records {
  #element = null;
  #resultsArr = [];

  constructor() {
    const bestResults = document.createElement('div');
    bestResults.classList.add('best-results');

    for (let i = 0; i < 5; i += 1) {
      const result = {
        time: '---',
        difficulty: '----',
      }
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
    console.log(localStorage.getItem('results'))
    if (localStorage.getItem('results')) {
      this.#resultsArr = (JSON.parse(localStorage.getItem('results')));
    }
  }

  renderResults() {
    this.loadResults()
    for (let i = 0; i < this.#resultsArr.length; i += 1) {
      const second = 1000;
      const minute = second * 60
      const minutes = Math.trunc(this.#resultsArr[i].time / minute);
      const seconds = Math.trunc((this.#resultsArr[i].time % minute) / second);

      const resultElem = document.createElement('span');
      resultElem.classList.add('result');

      if(this.#resultsArr[i].time === '---') {
        resultElem.textContent = `difficulty: ${this.#resultsArr[i].difficulty} time: ${'--'}:${'--'}`;
      } else {
        resultElem.textContent = `difficulty: ${this.#resultsArr[i].difficulty} time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }

        this.#element.appendChild(resultElem);
      }
  }

  saveResult(time, difficulty) {
    for (const result of this.#resultsArr.sort((a, b) => b.time - a.time)) {
      this.clear();
      if (result.time === '---') {
        result.time = time;
        result.difficulty = difficulty;
        break;
      }
      if (!this.#resultsArr.some((obj) => Object.values(obj).includes('---')) && time < result.time) {
        result.time = time;
        result.difficulty = difficulty;
        break;
      }
    }
    this.#resultsArr.sort((a, b) => a.time - b.time);

    localStorage.setItem('results', JSON.stringify(this.#resultsArr.sort((a, b) => a.time - b.time)));
    this.renderResults();
  }

  clear() {
    while (this.#element.childNodes.length > 0) {
      this.#element.lastChild.remove();
    }
  }

  appendNode(parent) {
    parent.append(this.#element);
  }
}