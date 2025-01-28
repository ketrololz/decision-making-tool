export class Timer {
  #element = null;
  #currentTime = 0;
  #interval = 1000;
  time = 0;
  #timer = null;
  #isTimerOn = false;

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
    this.updateTime();
    this.#timer = setInterval(this.updateTime.bind(this), this.#interval);
    this.#isTimerOn = true;
  }

  updateTime() {
    const second = 1000;
    const minute = second * 60
    const minutes = Math.trunc(this.time / minute);
    const seconds = Math.trunc((this.time % minute) / second);
    this.time += this.#interval;
    this.#element.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  stopTimer() {
    clearInterval(this.#timer);
    this.#isTimerOn = false;
  }

  clearTimer() {
    this.time = 0;
    this.#element.textContent = `00:00`;
  }

  currTime() {
    return this.time;
  }

  isTimerOn() {
    return this.#isTimerOn;
  }

  appendNode(parent) {
    parent.append(this.#element);
  }
}