export class Records {
  #element = null;
  #resultsArr = [];

  constructor() {
    const bestResults = document.createElement('div');
    bestResults.classList.add('best-results');
    const title = document.createElement('h2');
    title.textContent = 'Best results'
    bestResults.appendChild(title);

    for (let i = 0; i < 5; i += 1) {
      const result = {
        time: '---',
        difficulty: '---',
        picture: '---'
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
    // localStorage.clear('results')
    this.#element.classList.toggle('open');
  }

  hideWindow() {
    this.#element.classList.remove('open');
  }

  loadResults() {
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


      const resultElem = document.createElement('div');
      resultElem.classList.add('result');

      for (let k = 0; k < 3; k += 1 ) {
        const param = {
          0: this.#resultsArr[i].picture,
          1: this.#resultsArr[i].difficulty,
          2: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        }

        const textChunk = document.createElement('p');
        textChunk.classList.add('result-text');
        if(this.#resultsArr[i].time === '---') {
          textChunk.textContent = '--:--';
        } else {   
          textChunk.textContent = param[k];
        }

        resultElem.appendChild(textChunk);
      }

      // if(this.#resultsArr[i].time === '---') {
      //   resultElem.textContent = `${this.#resultsArr[i].picture} ${this.#resultsArr[i].difficulty} ${'--'}:${'--'}`;
      // } else {
      //   resultElem.textContent = `${this.#resultsArr[i].picture} ${this.#resultsArr[i].difficulty} ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      // }

        this.#element.appendChild(resultElem);
      }
  }

  saveResult(time, difficulty, picture) {
    for (const result of this.#resultsArr.sort((a, b) => b.time - a.time)) {
      this.clear();
      if (result.time === '---') {
        result.time = time;
        result.difficulty = difficulty;
        result.picture = picture;
        break;
      }
      if (!this.#resultsArr.some((obj) => Object.values(obj).includes('---')) && time < result.time) {
        result.time = time;
        result.difficulty = difficulty;
        result.picture = picture;
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