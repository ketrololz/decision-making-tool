export class Timer {
  #element = null;
  #currentTime = 0;
  #interval = 1000;
  time = 0;
  #timer = null;

  constructor() {
    const timer = document.createElement('div');
    timer.classList.add('timer');

    this.#element = timer;
  }

  clear() {
    while (this.#element.childNodes.length > 0) {
      this.#element.lastChild.remove();
    }
  }

  getElem() {
    return this.#element;
  }

  startTimer() {
    this.#timer = setInterval(this.updateTime.bind(this), this.#interval);
  }

  updateTime() {
    const second = 1000;
    const minute = second * 60
    const minutes = Math.trunc(this.time / minute);
    const seconds = Math.trunc((this.time % minute) / second)
    this.time += this.#interval;
    this.#element.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  stopTimer() {
    clearInterval(this.#timer);
  }

  appendNode(parent) {
    parent.append(this.#element);
  }
}